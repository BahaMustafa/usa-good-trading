import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products | USA Good Trading',
  description: 'Browse our premium wholesale clothing collection including leggings, tops, jackets, dresses and more.',
  openGraph: {
    title: 'Our Products | USA Good Trading',
    description: 'Browse our premium wholesale clothing collection including leggings, tops, jackets, dresses and more.',
    url: 'https://www.wholesalessuppliers.com/products',
    images: [
      {
        url: 'https://www.wholesalessuppliers.com/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'USA Good Trading Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Products | USA Good Trading',
    description: 'Browse our premium wholesale clothing collection including leggings, tops, jackets, dresses and more.',
    images: ['https://www.wholesalessuppliers.com/og-products.jpg'],
  },
};