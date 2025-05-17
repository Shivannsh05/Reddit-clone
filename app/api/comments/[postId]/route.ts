import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { content } = await req.json();

  // TODO: Save the comment to your DB instead of logging
  console.log(`New comment on post ${params.postId}: ${content} from token: ${token}`);

  return NextResponse.json({ message: 'Comment added successfully' });
}
