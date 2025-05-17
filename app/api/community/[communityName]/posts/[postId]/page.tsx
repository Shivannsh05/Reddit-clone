import { PrismaClient } from '@prisma/client';
import dynamic from 'next/dynamic';

const prisma = new PrismaClient();

// Dynamically import the client-side comment form to prevent hydration issues
const CommentForm = dynamic(() => import('@/components/CommentForm'), { ssr: false });

export default async function PostDetailPage({ params }: { params: { postId: string; communityName: string } }) {
  const postId = parseInt(params.postId, 10);

  // Fetch the post details
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { user: true },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  // Fetch the comments
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-2">{post.content}</p>
      <p className="text-sm text-gray-600 mb-6">Posted by: {post.user.name}</p>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Add a Comment</h2>
        {/* Protected Comment Form – rendered only for logged-in users via client logic */}
        <CommentForm postId={post.id} />

      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-t py-3">
              <p className="text-sm text-gray-600 font-medium">{comment.user.name}</p>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}






