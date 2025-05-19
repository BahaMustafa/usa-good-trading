// src/app/metadata.ts
import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/lib/metadata';

// Home page specific metadata
export function generateMetadata(): Metadata {
  return {
    ...defaultMetadata,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      url: siteConfig.url,
    },
  };
}

// Generate JSON-LD for the home page
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/products?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};