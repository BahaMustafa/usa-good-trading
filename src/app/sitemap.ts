// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.wholesalessuppliers.com/';

    // 1) Static routes
    const staticRoutes = [
        '',
        '/products',
        '/about',
        '/contact',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        // Use const assertion for changeFrequency
        changeFrequency: path === '' ? 'daily' as const : 'weekly' as const,
        priority: path === '' ? 1.0 : 0.8,
    }));

    // 2) Dynamic product routes
    const snap = await getDocs(collection(db, 'products'));
    const productRoutes = snap.docs.map((doc) => ({
        url: `${baseUrl}/product/${doc.id}`,
        lastModified:
            (doc.data().updatedAt as { toDate: () => Date })?.toDate?.() ||
            new Date(),
        // Use const assertion for changeFrequency
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
}