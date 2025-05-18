import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  // Ensure the user is authenticated
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const { postId, content } = await req.json()

  // Validate postId
  const postIdNum = parseInt(postId)
  if (isNaN(postIdNum)) {
    return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 })
  }

  // Convert userId from string to number (if necessary)
  const userIdNum = parseInt(session.user.id as string)
  if (isNaN(userIdNum)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
  }

  // Create the comment
  const comment = await prisma.comment.create({
    data: {
      postId: postIdNum,
      userId: userIdNum,
      content,
    },
  })

  return NextResponse.json(comment)
}

