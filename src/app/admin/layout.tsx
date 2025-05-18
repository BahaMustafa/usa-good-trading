// src/app/admin/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navigation from '@/components/Navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== '/admin') {
        router.push('/admin');
      }
    });
    return () => unsubscribe();
  }, [router, pathname]);

  return (
    <>
      {/* your regular site nav */}
      <Navigation />

      {/* push everything below the 4rem‐tall nav */}
      <main className="pt-16 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
