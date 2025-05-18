import { NextRequest, NextResponse } from "next/server";

// Correct typing for App Router route handlers
export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  console.log(`New comment on post ${postId}: ${content} from token: ${token}`);

  return NextResponse.json({ message: "Comment added successfully" });
}




