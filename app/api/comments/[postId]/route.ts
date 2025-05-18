import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string> } // 👈 FIXED HERE
) {
  const postId = params.postId

  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { content } = await req.json()
  console.log(`New comment on post ${postId}: ${content} from token: ${token}`)

  return NextResponse.json({ message: "Comment added successfully" })
}




