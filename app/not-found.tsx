"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-8xl font-bold text-primary-700 md:text-9xl">
                404
              </h1>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Page Not Found
            </h2>

            <p className="mb-10 text-lg text-gray-500 dark:text-gray-400">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved or doesn't exist.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary-700 px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
              >
                Go Home
              </Link>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-transparent px-8 py-3 text-base font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800/50"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
