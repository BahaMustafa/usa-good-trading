// src/lib/metadata.ts
import { Metadata } from 'next';
import { Product } from '@/types/product';

// Base URL for the website
export const siteConfig = {
  name: 'USA Good Trading',
  description: 'Fresh drops from LA\'s Fashion District. Quality wholesale clothing with fast sourcing and no middlemen.',
  url: 'https://www.wholesalessuppliers.com',
  ogImage: 'https://www.wholesalessuppliers.com/og-preview.jpg',
  links: {
    twitter: 'https://twitter.com/usagoodtrading',
    instagram: 'https://instagram.com/usagoodtrading',
  },
};

// Default metadata for the website
export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} – Wholesale Clothing`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'wholesale clothing',
    'leggings',
    'tops',
    'jackets',
    'dresses',
    'fashion',
    'USA',
    'wholesale supplier',
    'LA fashion district',
    'clothing wholesale',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: {
      default: `${siteConfig.name} – Wholesale Clothing`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Wholesale Clothing`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: `${siteConfig.name} – Wholesale Clothing`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@usagoodtrading',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // viewport configuration removed
};

// Generate metadata for product pages
export function generateProductMetadata(product: Product): Metadata {
  const title = product.name;
  const description = product.description.length > 160 
    ? `${product.description.substring(0, 157)}...` 
    : product.description;
  
  return {
    title,
    description,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/product/${product.id}`,
      type: 'website',
      images: product.images.map(image => ({
        url: image,
        width: 800,
        height: 600,
        alt: product.name,
      })),
    },
    twitter: {
      title,
      description,
      images: product.images[0],
    },
  };
}

// Generate structured data for product pages (JSON-LD)
export function generateProductJsonLd(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.isSold 
        ? 'https://schema.org/SoldOut' 
        : 'https://schema.org/InStock',
      priceCurrency: 'USD',
      lowPrice: product.priceRange.min || undefined,
      highPrice: product.priceRange.max || undefined,
      offerCount: product.sizes?.length || 1,
    },
    brand: {
      '@type': 'Brand',
      name: 'USA Good Trading',
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}