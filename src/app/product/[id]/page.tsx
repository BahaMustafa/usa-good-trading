'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/metadata';
import type { Product } from '@/types/product';

export default function ProductPage() {
  const router = useRouter();
  // remove the generic here and cast instead
  const params = useParams() as { id?: string };
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'products', id));
        if (snap.exists()) {
          const data = snap.data();
          setProduct({
            id: snap.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          } as Product);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-t-blue-600 border-gray-200 rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl">Product not found</p>
      </div>
    );
  }

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.name, url: `/product/${product.id}` },
  ]);

  const priceText =
    product.priceRange.min === 0
      ? 'Contact for price'
      : `$${product.priceRange.min}${
          product.priceRange.max > product.priceRange.min
            ? ` – $${product.priceRange.max}`
            : ''
        }`;

  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ||
    'https://chat.whatsapp.com/EaX8DUbNYDeLDfwqUdggtF';

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      {/* JSON-LD for SEO */}
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
        >
          ← Go Back
        </button>

        {/* Gradient border + clipped card */}
        <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-400 to-teal-400 hover:from-purple-500 hover:to-pink-500 transition-colors duration-700 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Gallery */}
              <div className="p-4 space-y-4">
                {/* Main image */}
                <div className="p-2">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={product.images[selectedImage] || '/fallback-product.jpg'}
                      alt={`${product.name} – ${product.category}`}
                      fill
                      className="object-contain"
                      priority
                    />
                    {product.isSold && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-1 rounded-full font-semibold">
                          Sold
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, idx) => (
                    <div key={idx} className="p-1">
                      <button
                        onClick={() => setSelectedImage(idx)}
                        className={`
                          relative w-full aspect-square overflow-hidden rounded-lg
                          transition-all duration-300
                          ${
                            idx === selectedImage
                              ? 'ring-2 ring-blue-600'
                              : 'border border-gray-200 hover:border-blue-300'
                          }
                        `}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="p-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold flex-1">{product.name}</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                  {product.isSold && (
                    <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">
                      Sold
                    </span>
                  )}
                </div>

                <p className="text-2xl text-blue-600 font-semibold">{priceText}</p>
                <hr className="border-gray-200" />

                <div>
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h2 className="text-lg font-semibold mb-2">Available Sizes</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h2 className="text-lg font-semibold mb-2">Colors</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-colors duration-300 shadow-md"
                  aria-label={`Request info about ${product.name} on WhatsApp`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.7 14.2c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2 0 1.2.8 2.4 1.1 2.7.3.3 2.2 3.4 5.3 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z"/>
                    </svg>
                    Request Info via WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
