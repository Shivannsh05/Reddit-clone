'use client'

import { useState } from 'react'

export default function CommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/comments/${postId}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ postId, content }),
    })

    setLoading(false)
    setContent('')
    // Optionally refresh comments or show success message
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your comment..."
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
}
