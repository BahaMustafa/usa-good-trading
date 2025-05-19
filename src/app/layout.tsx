// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import AppTransition from '@/components/AppTransition';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'USA Good Trading – Wholesale Clothing',
  description: 'Fresh drops from LA\'s Fashion District. Fast sourcing. No middlemen.',
  keywords: 'wholesale clothing, leggings, tops, jackets, dresses, fashion, USA, wholesale supplier',
  authors: [{ name: 'USA Good Trading' }],
  creator: 'USA Good Trading',
  publisher: 'USA Good Trading',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://wholesalesuppliers.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'USA Good Trading – Wholesale Clothing',
    description: 'Fresh drops from LA\'s Fashion District. Fast sourcing. No middlemen.',
    url: 'https://wholesalesuppliers.com',
    siteName: 'USA Good Trading',
    images: [
      {
        url: 'https://wholesalesuppliers.com/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'USA Good Trading - Wholesale Clothing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA Good Trading – Wholesale Clothing',
    description: 'Fresh drops from LA\'s Fashion District. Fast sourcing. No middlemen.',
    images: ['https://wholesalesuppliers.com/og-preview.jpg'],
    creator: '@usagoodtrading',
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
