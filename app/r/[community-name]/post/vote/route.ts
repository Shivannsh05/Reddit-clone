import { NextRequest, NextResponse } from "next/server"

// ✅ Correct second parameter typing
export async function POST(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const { postId } = context.params

  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { content } = await req.json()

  console.log(`New comment on post ${postId}: ${content} from token: ${token}`)

  return NextResponse.json({ message: "Comment added successfully" })
}

