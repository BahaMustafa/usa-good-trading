import { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Wholesale Women\'s Clothing USA: The Ultimate Guide',
  description: 'Discover how to source wholesale women\'s clothing in the USA. Learn about top suppliers, pricing strategies, and expert tips for starting your fashion business.',
  alternates: {
    canonical: '/blog/wholesale-womens-clothing-usa-guide',
  },
  openGraph: {
    title: 'Wholesale Women\'s Clothing USA: The Ultimate Guide',
    description: 'Discover how to source wholesale women\'s clothing in the USA. Learn about top suppliers, pricing strategies, and expert tips for starting your fashion business.',
    url: `${siteConfig.url}/blog/wholesale-womens-clothing-usa-guide`,
    type: 'article',
    publishedTime: '2024-03-15',
    authors: ['USA Good Trading Team'],
    images: [
      {
        url: `${siteConfig.url}/og-wholesale-guide.jpg`,
        width: 1200,
        height: 630,
        alt: 'Wholesale Women\'s Clothing USA Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Women\'s Clothing USA: The Ultimate Guide',
    description: 'Discover how to source wholesale women\'s clothing in the USA. Learn about top suppliers, pricing strategies, and expert tips for starting your fashion business.',
    images: [`${siteConfig.url}/og-wholesale-guide.jpg`],
  },
};

// Article JSON-LD
export const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wholesale Women\'s Clothing USA: The Ultimate Guide',
  description: 'Discover how to source wholesale women\'s clothing in the USA. Learn about top suppliers, pricing strategies, and expert tips for starting your fashion business.',
  image: `${siteConfig.url}/og-wholesale-guide.jpg`,
  datePublished: '2024-03-15',
  dateModified: '2024-03-15',
  author: {
    '@type': 'Organization',
    name: 'USA Good Trading Team',
    url: siteConfig.url
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/blog/wholesale-womens-clothing-usa-guide`
  }
};

// FAQ JSON-LD
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the minimum investment needed to start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Initial investments can vary, but you can start with as little as $1,000-$5,000 for a small collection of trending items.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I determine pricing for my retail customers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard retail markup is 2.0-2.5x wholesale cost. Consider your target market, competition, and operating expenses when setting prices.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the current trends in wholesale women\'s clothing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Current trends include sustainable fashion, athleisure, inclusive sizing, and versatile wardrobe pieces that can transition from work to casual wear.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I ensure product quality when ordering wholesale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Request samples before bulk orders, check supplier references, and establish clear quality standards in your purchase agreements.'
      }
    }
  ]
};

// Breadcrumb JSON-LD
export const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.url
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteConfig.url}/blog`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Wholesale Women\'s Clothing USA Guide',
      item: `${siteConfig.url}/blog/wholesale-womens-clothing-usa-guide`
    }
  ]
};