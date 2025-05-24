// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-secondary-50 p-8">
      <h1 className="text-4xl font-bold mb-4 text-secondary-900">404 — Page Not Found</h1>
      <p className="mb-6 text-secondary-700">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link
        href="/"
        className="btn btn-primary px-6 py-3 rounded-md"
      >
        Go back home
      </Link>
    </main>
  );
}
