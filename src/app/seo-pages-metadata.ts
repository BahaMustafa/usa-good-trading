// src/app/seo-pages-metadata.ts
import { Metadata } from 'next';
import { defaultMetadata, siteConfig, generateBreadcrumbJsonLd } from '@/lib/metadata';

// Products page metadata
export const productsMetadata: Metadata = {
  title: 'Wholesale Clothing Products',
  description: 'Browse our extensive collection of wholesale clothing items including leggings, tops, jackets, dresses and more at competitive prices.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Wholesale Clothing Products',
    description: 'Browse our extensive collection of wholesale clothing items including leggings, tops, jackets, dresses and more at competitive prices.',
    url: `${siteConfig.url}/products`,
  },
};

// Products page JSON-LD
export const productsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Wholesale Clothing Products',
  description: 'Browse our extensive collection of wholesale clothing items including leggings, tops, jackets, dresses and more at competitive prices.',
  url: `${siteConfig.url}/products`,
  isPartOf: {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

// Products page breadcrumb JSON-LD
export const productsBreadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
]);

// About page metadata
export const aboutMetadata: Metadata = {
  title: 'About Us',
  description: 'Learn about USA Good Trading, your trusted wholesale clothing supplier with over 20 years of experience in LA\'s Fashion District.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'About USA Good Trading',
    description: 'Learn about USA Good Trading, your trusted wholesale clothing supplier with over 20 years of experience in LA\'s Fashion District.',
    url: `${siteConfig.url}/about`,
  },
};

// About page JSON-LD
export const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About USA Good Trading',
  description: 'Learn about USA Good Trading, your trusted wholesale clothing supplier with over 20 years of experience in LA\'s Fashion District.',
  url: `${siteConfig.url}/about`,
  isPartOf: {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

// About page breadcrumb JSON-LD
export const aboutBreadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about' },
]);

// Contact page metadata
export const contactMetadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with USA Good Trading for wholesale clothing inquiries, orders, and customer support.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Contact USA Good Trading',
    description: 'Get in touch with USA Good Trading for wholesale clothing inquiries, orders, and customer support.',
    url: `${siteConfig.url}/contact`,
  },
};

// Contact page JSON-LD
export const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact USA Good Trading',
  description: 'Get in touch with USA Good Trading for wholesale clothing inquiries, orders, and customer support.',
  url: `${siteConfig.url}/contact`,
  isPartOf: {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

// Contact page breadcrumb JSON-LD
export const contactBreadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: 'Home', url: '/' },
  { name: 'Contact Us', url: '/contact' },
]);

// Organization JSON-LD for all pages
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.instagram,
  ],
};