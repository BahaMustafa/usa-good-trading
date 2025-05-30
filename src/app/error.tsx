// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong.</h1>
      <p className="text-secondary-700 mb-8">{error.message}</p>
      <button
        onClick={reset}
        className="btn btn-primary px-6 py-3 rounded-md"
      >
        Try again
      </button>
    </main>
  );
}
