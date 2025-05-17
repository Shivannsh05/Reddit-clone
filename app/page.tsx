import Image from "next/image";
import AuthButtons from "@/components/AuthButtons";
import Link from "next/link";

// Fetch feed
async function fetchFeed(sortBy: string = "date") {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feed?sortBy=${sortBy}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch feed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// FeedList component
function FeedList({ posts }: { posts: any[] }) {
  if (!posts.length) {
    return (
      <div className="mt-10 text-center text-gray-500 text-sm">
        <svg
          className="mx-auto h-6 w-6 text-gray-400" // smaller, balanced circle icon
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-2">No posts available. Be the first to post!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-2xl space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 dark:border-gray-700 p-4 rounded-md shadow-sm bg-white dark:bg-gray-900"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
          <div className="text-sm text-gray-500 flex justify-between mt-2">
            <span>Votes: {post.votes}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Home page
export default async function Home(props: { searchParams?: { sortBy?: string } }) {
  const searchParams = props.searchParams || {};
  const sortBy = searchParams.sortBy || "date";
  const posts = await fetchFeed(sortBy);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-8 row-start-2 px-4 sm:px-6">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        {/* Create Community Button */}
        <Link
          href="/r/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-max"
        >
          Create Community
        </Link>

        {/* Feed Section (Trending / Recent Posts) */}
        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4">Trending / Recent Posts</h2>

          {/* Polished Sort Buttons */}
          <div className="mb-4 space-x-2 flex flex-wrap gap-2">
            {["date", "votes"].map((type) => (
              <Link
                key={type}
                href={`/?sortBy=${type}`}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
              >
                Sort by {type.charAt(0).toUpperCase() + type.slice(1)}
              </Link>
            ))}
          </div>

          <FeedList posts={posts} />
        </div>

        <div className="mt-8">
          <AuthButtons />
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
















