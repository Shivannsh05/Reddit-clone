'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

// Define the type for the uploaded file response
type UploadFileResponse = {
  url: string;
  name: string;
};

export default function CreatePostPage({ params }: { params: { communityName: string } }) {
  const router = useRouter();
  const { communityName } = params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${communityName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      if (!response.ok) throw new Error('Failed to create post');
      router.push(`/r/${communityName}`);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Post in {communityName}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}

        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows={5}
        />

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
            if (res && res.length > 0) {
              setImageUrl(res[0].url);
              alert('Image uploaded!');
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />

        {imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Image uploaded:</p>
            <img src={imageUrl} alt="Uploaded" className="max-w-xs mt-1 border rounded" />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

