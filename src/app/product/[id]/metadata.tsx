import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateProductMetadata, generateProductJsonLd, generateFaqJsonLd, generateReviewJsonLd, generateBreadcrumbJsonLd } from '@/lib/metadata';
import type { Product } from '@/types/product';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (!snap.exists()) return null;
    
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Product;
  } catch (err) {
    console.error('Error fetching product:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const metadata = generateProductMetadata(product);
  const jsonLd = [
    generateProductJsonLd(product),
    generateFaqJsonLd(),
    generateReviewJsonLd(product),
    generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: product.name, url: `/product/${product.id}` },
    ]),
  ];

  return {
    ...metadata,
    other: {
      ...metadata.other,
      'script:ld+json': jsonLd,
    },
  };
} 