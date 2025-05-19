// src/app/product/[id]/metadata.ts
import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateProductMetadata } from '@/lib/metadata';
import { Product } from '@/types/product';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch product data
  const productDoc = await getDoc(doc(db, 'products', params.id));
  
  if (!productDoc.exists()) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
  
  // Convert Firestore document to Product type
  const productData = productDoc.data();
  const product: Product = {
    id: productDoc.id,
    ...productData,
    createdAt: productData.createdAt?.toDate(),
    updatedAt: productData.updatedAt?.toDate(),
  } as Product;
  
  // Generate metadata using the helper function
  return generateProductMetadata(product);
}