import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // For parsing searchParams

interface Post {
  id: string;
  title: string;
  content: string;
  votes: number;
  createdAt: string;
}

const mockPosts: { [key: string]: Post[] } = {
  samarth: [
    {
      id: '1',
      title: 'Welcome to Samarth community!',
      content: 'This is the first post.',
      votes: 10,
      createdAt: '2024-05-10T10:00:00Z',
    },
    {
      id: '2',
      title: 'Second post',
      content: 'Glad you are here!',
      votes: 3,
      createdAt: '2024-05-11T09:00:00Z',
    },
  ],
};

export async function GET(
  req: NextRequest,
  { params }: { params: { communityName: string } }
) {
  const { communityName } = params;
  const sortBy = req.nextUrl.searchParams.get('sortBy'); // Get the sorting parameter from the URL

  let posts = mockPosts[communityName] || []; // Get the posts for the specified community

  // Sorting logic based on 'sortBy' query parameter
  if (sortBy === 'votes') {
    posts = posts.sort((a, b) => b.votes - a.votes); // Sort by votes descending
  } else if (sortBy === 'date') {
    posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by date descending
  }

  // Return the sorted posts as a JSON response
  return NextResponse.json(posts);
}


