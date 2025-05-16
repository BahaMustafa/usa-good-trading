import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AnalyticsProvider from '../components/AnalyticsProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'USA Good Trading - Wholesale Clothing Supplier',
  description: 'USA Good Trading - A trusted wholesale clothing supplier since 2009, specializing in premium quality apparel for retailers and businesses.',
  keywords: 'wholesale clothing, bulk apparel, fashion wholesale, USA Good Trading, clothing supplier',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <AnalyticsProvider>
            <Navigation />
            <div className="min-h-screen pt-20">
              {children}
            </div>
            <Footer />
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}