'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

// Define a type for the community
type Community = {
  name: string;
  description: string;
};

export default function CommunitiesList() {
  // Specify the type of the communities state
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    // Replace this with your API call to fetch communities
    const fetchCommunities = async () => {
      // For now, mock the data
      const data: Community[] = [
        { name: "tech", description: "All things tech" },
        { name: "sports", description: "Sports discussions" },
        { name: "music", description: "Music lovers" },
      ];

      setCommunities(data);
    };

    fetchCommunities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">All Communities</h1>
      <ul className="list-disc">
        {communities.length > 0 ? (
          communities.map((community) => (
            <li key={community.name} className="mb-4">
              <Link
                href={`/r/${community.name}`}
                className="text-blue-500 hover:underline"
              >
                {community.name}
              </Link>
              <p className="text-sm text-gray-500">{community.description}</p>
            </li>
          ))
        ) : (
          <p>No communities found.</p>
        )}
      </ul>
    </div>
  );
}
