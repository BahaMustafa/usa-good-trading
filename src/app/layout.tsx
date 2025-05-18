// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import AppTransition from '@/components/AppTransition';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'USA Good Trading',
  description: 'Premium wholesale clothing supplier since 2009',
  openGraph: {
    title: 'USA Good Trading',
    description: 'Premium wholesale clothing supplier since 2009',
    url: 'https://www.your-domain.com',
    siteName: 'USA Good Trading',
    images: [
      {
        url: 'https://www.your-domain.com/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'USA Good Trading logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA Good Trading',
    description: 'Premium wholesale clothing supplier since 2009',
    images: ['https://www.your-domain.com/og-default.jpg'],
  },
};

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
