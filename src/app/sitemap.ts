// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.wholesalessuppliers.com';

  // 1) Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/products',
    '/about',
    '/contact',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  // 2) Dynamic product routes
  let productRoutes: MetadataRoute.Sitemap = [];
  
  try {
    if (db) {
      const productsCollection = collection(db, 'products');
      const snap = await getDocs(productsCollection);
      
      productRoutes = snap.docs.map((doc) => {
        const data = doc.data();
        const updatedAt = (data.updatedAt as { toDate?: () => Date })?.toDate?.() ?? new Date();

        return {
          url: `${baseUrl}/product/${doc.id}`,
          lastModified: updatedAt,
          changeFrequency: 'daily',
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    // Continue with static routes if Firebase fails
  }

  return [...staticRoutes, ...productRoutes];
}