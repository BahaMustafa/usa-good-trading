// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import AppTransition from '@/components/AppTransition';
import Footer from '@/components/Footer';
import { defaultMetadata } from '@/lib/metadata';

export const metadata = defaultMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <AppTransition>{children}</AppTransition>
        <Footer />
      </body>
    </html>
  );
}
