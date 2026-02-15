'use client';

import { Link } from 'waku';

export function AboutContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">About This Template</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Modern admin template with cutting-edge technologies
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tech Stack</h2>
        <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <strong className="text-gray-900 dark:text-white">Waku</strong> - Minimal React framework with RSC
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Tailwind CSS</strong> - Utility-first CSS framework
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Prisma</strong> - Type-safe database ORM
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">NextAuth</strong> - Authentication solution
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Link to="/" className="text-purple-600 underline hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
          ← Return home
        </Link>
      </div>
    </div>
  );
}
