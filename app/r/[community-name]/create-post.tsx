'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreatePostForm() {
  const router = useRouter();
  const { communityName } = router.query; // Get the community name from the URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePostSubmit = () => {
    // Handle post creation (you can replace this with an actual API call later)
    alert(`Creating post in ${communityName}: \nTitle: ${title}\nContent: ${content}`);

    // Reset the form
    setTitle('');
    setContent('');

    // Optionally, navigate back to the community page after creating the post
    router.push(`/r/${communityName}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Post in {communityName}</h1>
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Post Title"
          className="border p-2 rounded w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          className="border p-2 rounded w-full mb-4"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          onClick={handlePostSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
