// app/api/vote/[postId]/route.ts
import { NextResponse } from 'next/server';

type VoteRequest = {
  voteType: 'up' | 'down';
};

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const { voteType }: VoteRequest = await request.json();

  // Simulate database update (replace with actual DB logic)
  let updatedVotes = 0; // Default vote count

  if (voteType === 'up') {
    updatedVotes = 1; // Simulate adding a vote
  } else if (voteType === 'down') {
    updatedVotes = -1; // Simulate subtracting a vote
  }

  // In a real app, update the database and return the new vote count
  return NextResponse.json({ postId, updatedVotes });
}
