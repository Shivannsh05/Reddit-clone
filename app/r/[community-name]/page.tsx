'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Community {
  name: string;
  description: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  votes: number;
}

export default function CommunityPage() {
  const params = useParams();
  const communityName = params?.['community-name'] as string | undefined;
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch community data
  useEffect(() => {
    if (!communityName) return;

    const fetchCommunity = async () => {
      try {
        const res = await fetch(`/api/community/${communityName}`);
        if (!res.ok) throw new Error('Failed to fetch community');
        const data = await res.json();
        setCommunity(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommunity();
  }, [communityName]);

  // Fetch posts data
  useEffect(() => {
    if (!communityName) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/community/${communityName}/posts`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [communityName]);

  const handleVote = async (postId: string, type: 'upvote' | 'downvote') => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        // Update the post votes locally
        const newVotes = type === 'upvote' ? post.votes + 1 : post.votes - 1;
        return { ...post, votes: newVotes };
      }
      return post;
    });
    setPosts(newPosts);

    // Update the votes in the database (backend)
    await fetch(`/api/community/${communityName}/posts/${postId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ type }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  if (!communityName) return <div>Invalid community name.</div>;
  if (!community) return <div>Loading community...</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">r/{communityName}</h1>
        <p className="text-gray-700">{community.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.id} className="p-4 border rounded shadow">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleVote(post.id, 'upvote')}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Upvote
                  </button>
                  <button
                    onClick={() => handleVote(post.id, 'downvote')}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Downvote
                  </button>
                  <p className="text-sm text-gray-500">Votes: {post.votes}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


