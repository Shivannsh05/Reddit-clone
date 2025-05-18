import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';  // Use getServerSession for Edge compatibility
import { authOptions } from "@/lib/auth";  // Import your NextAuth options
import prisma from '@/lib/prisma';  // Adjust the import to match your actual setup

export async function POST(request: Request, { params }: { params: { communityName: string; postId: string } }) {
  const { communityName, postId } = params;
  const { type } = await request.json(); // Get the vote type from the body of the request

  // Validate the vote type
  if (!['upvote', 'downvote'].includes(type)) {
    return NextResponse.json({ message: 'Invalid vote type' }, { status: 400 });
  }

  try {
    // Get the session from NextAuth.js (Edge-compatible version)
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Convert postId and session.user.id to the correct types
    const userId = typeof session.user.id === 'string' ? parseInt(session.user.id, 10) : session.user.id; // Ensure userId is a number
    const postIdInt = parseInt(postId, 10); // Convert postId to a number

    if (isNaN(postIdInt)) {
      return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 });
    }

    // Fetch the post based on postId
    const post = await prisma.post.findUnique({
      where: {
        id: postIdInt,
      },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Count upvotes and downvotes for the post
    const upvotes = await prisma.vote.count({
      where: {
        postId: postIdInt,
        voteType: 'UPVOTE',
      },
    });

    const downvotes = await prisma.vote.count({
      where: {
        postId: postIdInt,
        voteType: 'DOWNVOTE',
      },
    });

    const totalVotes = upvotes - downvotes;

    // Check if the user has already voted
    const existingVote = await prisma.vote.findFirst({
      where: {
        postId: postIdInt,
        userId: userId,
      },
    });

    if (existingVote) {
      // If the user has already voted, update their vote
      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          voteType: type === 'upvote' ? 'UPVOTE' : 'DOWNVOTE',
        },
      });
    } else {
      // If the user hasn't voted, create a new vote record
      await prisma.vote.create({
        data: {
          postId: postIdInt,
          userId: userId,
          voteType: type === 'upvote' ? 'UPVOTE' : 'DOWNVOTE',
        },
      });
    }

    // Return the updated vote count
    return NextResponse.json({ totalVotes });
  } catch (error) {
    console.error('Error updating vote:', error);
    return NextResponse.json({ message: 'Error updating vote' }, { status: 500 });
  }
}


