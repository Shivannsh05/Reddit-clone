import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy") || "date";

  try {
    const posts = await db.post.findMany({
      orderBy: sortBy === "votes" 
        ? { votes: { _count: "desc" } }  // Correct aggregate count orderBy syntax
        : { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

