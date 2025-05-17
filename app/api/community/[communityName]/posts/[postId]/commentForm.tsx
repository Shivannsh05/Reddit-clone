'use client';

import { useState, useEffect } from 'react';

export default function CommentForm({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for auth token
    const token = localStorage.getItem('auth-token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const res = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!res.ok) throw new Error('Failed to post comment');

      setComment('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  if (isAuthenticated === null) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center text-gray-700 p-4 border rounded-md bg-gray-100">
        <p>You must be logged in to comment.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="my-4 space-y-2">
      {error && <div className="text-red-500">{error}</div>}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write your comment..."
        rows={4}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Post Comment
      </button>
    </form>
  );
}
