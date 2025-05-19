'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface PageProps {
  params: {
    communityName: string;
  };
}

export default function PostListPage({ params }: PageProps) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const { communityName } = params;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/community/${communityName}/route?sortBy=${sortBy}`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [communityName, sortBy]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Posts in {communityName}</h1>

      {/* Sort Controls */}
      <div className="mb-4">
        <button
          onClick={() => router.push(`?sortBy=date`)}
          className="px-4 py-2 mr-2 border rounded-md text-blue-500 hover:bg-blue-100"
        >
          Sort by Date
        </button>
        <button
          onClick={() => router.push(`?sortBy=votes`)}
          className="px-4 py-2 border rounded-md text-blue-500 hover:bg-blue-100"
        >
          Sort by Votes
        </button>
      </div>

      {/* Post list */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post: any) => (
          <div key={post.id} className="border-b py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500">Votes: {post.votes}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}


