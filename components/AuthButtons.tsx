"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button
        disabled
        className="px-4 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed text-sm font-medium"
      >
        Loading...
      </button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
          Signed in as {session.user?.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-1.5 rounded-md border border-blue-600 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
    >
      Sign In
    </button>
  );
}




