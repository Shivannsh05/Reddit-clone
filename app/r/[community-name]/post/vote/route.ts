import { NextResponse } from 'next/server';

type VoteRequest = {
  postId: string;
  voteType: 'upvote' | 'downvote';
};

let mockDB: Record<string, number> = {}; // Mock DB for now

export async function POST(req: Request) {
  const body: VoteRequest = await req.json();
  const { postId, voteType } = body;

  // Simulate DB vote update
  const currentVotes = mockDB[postId] ?? 0;
  const updatedVotes = voteType === 'upvote' ? currentVotes + 1 : currentVotes - 1;

  mockDB[postId] = updatedVotes;

  return NextResponse.json({ success: true, votes: updatedVotes });
}
