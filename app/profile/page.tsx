'use client'

import { useEffect, useState } from 'react'

export default function EditProfile() {
  const [name, setName] = useState('')
  const [initialName, setInitialName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch the current user's name
    const fetchProfile = async () => {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      setName(session.user.name || '')
      setInitialName(session.user.name || '')
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/user/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    if (res.ok) {
      setMessage('Profile updated successfully.')
      setInitialName(name)
    } else {
      setMessage('Failed to update profile.')
    }
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={name === initialName}
        >
          Save Changes
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </form>
    </div>
  )
}

