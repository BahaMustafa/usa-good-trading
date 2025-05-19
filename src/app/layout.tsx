// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rlwfspw6av");
            `,
          }}
        />
      </body>
    </html>
  );
}
