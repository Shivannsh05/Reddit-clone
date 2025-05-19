import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: Record<string, string> }) {
  const { communityName, postId } = params;
  const { type } = await request.json();

  if (!['upvote', 'downvote'].includes(type)) {
    return NextResponse.json({ message: 'Invalid vote type' }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Ensure userId is a number (or parse if string)
    const userId = typeof session.user.id === 'string' ? parseInt(session.user.id, 10) : session.user.id;
    const postIdInt = parseInt(postId, 10);

    if (isNaN(postIdInt)) {
      return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postIdInt },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const upvotes = await prisma.vote.count({
      where: { postId: postIdInt, voteType: 'UPVOTE' },
    });

    const downvotes = await prisma.vote.count({
      where: { postId: postIdInt, voteType: 'DOWNVOTE' },
    });

    const totalVotes = upvotes - downvotes;

    const existingVote = await prisma.vote.findFirst({
      where: { postId: postIdInt, userId: userId },
    });

    if (existingVote) {
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { voteType: type === 'upvote' ? 'UPVOTE' : 'DOWNVOTE' },
      });
    } else {
      await prisma.vote.create({
        data: {
          postId: postIdInt,
          userId: userId,
          voteType: type === 'upvote' ? 'UPVOTE' : 'DOWNVOTE',
        },
      });
    }

    return NextResponse.json({ totalVotes });
  } catch (error) {
    console.error('Error updating vote:', error);
    return NextResponse.json({ message: 'Error updating vote' }, { status: 500 });
  }
}



