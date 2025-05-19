// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { postId, content } = await req.json()
  console.log(`New comment on post ${postId}: ${content} from token: ${token}`)

  return NextResponse.json({ message: "Comment added successfully" })
}




