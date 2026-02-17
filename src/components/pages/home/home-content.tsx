'use client';

import { Link } from 'waku';

export function HomeContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Built with Waku, Tailwind CSS, Prisma & NextAuth
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Admin dashboard built with Waku and Tailwind CSS.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Getting Started</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Use the sidebar to navigate between sections.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Theme</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Dark mode support with Tailwind CSS.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-900 dark:text-white">
          Visit the{' '}
          <Link to="/about" className="text-purple-600 underline hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
            about page
          </Link>{' '}
          to learn more.
        </p>
      </div>
    </div>
  );
}
