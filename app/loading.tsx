// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 dark:text-gray-300">
      <svg
        className="animate-spin h-8 w-8 mb-4 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <p>Loading feed...</p>
    </div>
  );
}
