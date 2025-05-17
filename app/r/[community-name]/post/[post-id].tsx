'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Post = {
  title: string;
  content: string;
  votes: number;
};

export default function PostDetailPage() {
  const router = useRouter();
  const { communityName, postId } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!communityName || !postId) return;

    const fetchPost = async () => {
      const data: Post = {
        title: `Post ${postId} in ${communityName}`,
        content: `This is the detailed content for post ${postId} in ${communityName}.`,
        votes: 5, // Starting votes for this post
      };

      setPost(data);
    };

    fetchPost();
  }, [communityName, postId]);

  const handleVote = async (voteType: 'up' | 'down') => {
    if (!post) return;

    try {
      const response = await fetch(`/api/vote/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ voteType }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const updatedVotes = data.updatedVotes;

        // Update the votes in the frontend state
        setPost((prevPost) => (prevPost ? { ...prevPost, votes: updatedVotes } : null));
      } else {
        console.error('Failed to update vote');
      }
    } catch (error) {
      console.error('Error during vote request:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{post.content}</p>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleVote('up')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Upvote
        </button>
        <button
          onClick={() => handleVote('down')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Downvote
        </button>
      </div>

      <p className="mt-4">Total Votes: {post.votes}</p>
    </div>
  );
}
