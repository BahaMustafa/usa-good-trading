import Script from 'next/script';
import { siteConfig } from '@/lib/metadata';

interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    sku: string;
    price: number;
    imageUrl: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  };
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: [
      `${siteConfig.url}${product.imageUrl}`,
    ],
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/products/${product.sku}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: `https://schema.org/${product.availability}`,
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
  };

  return (
    <Script
      id="product-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
  );
}