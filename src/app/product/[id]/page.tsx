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

  // WhatsApp URL
  const whatsappUrl =
    `https://wa.me/19096876383?text=I'm interested in ${encodeURIComponent(product.name)}`;

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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          sizes="(max-width: 768px) 60px, 80px"
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
                  aria-label={`Request info about ${product.name} on WhatsApp`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Request Info via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
