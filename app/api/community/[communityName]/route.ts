import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { communityName: string } }) {
  const { communityName } = params

  const posts = await prisma.post.findMany({
    where: {
      community: {
        name: communityName,
      },
    },
    orderBy: {
      createdAt: 'desc', // Sort posts by newest
    },
    include: {
      user: true,
      votes: true,
    },
  })

  return NextResponse.json(posts)
}
