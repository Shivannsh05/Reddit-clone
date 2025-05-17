'use client';

import { useState } from 'react';

export default function CreateCommunityPage() {
  const [name, setName] = useState('');

  const handleCreate = () => {
    alert(`Creating community: ${name}`);
    // Later, replace this with actual logic to create a community
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Community</h1>

      <input
        type="text"
        placeholder="Community name"
        className="border p-2 rounded w-full max-w-md mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
}
