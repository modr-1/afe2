import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <main className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Welcome to the Fitness App
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Start by logging in to your account.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go to Login
        </Link>
      </main>
    </div>
  );
}