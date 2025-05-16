'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          } as Product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const whatsappMessage = `Hi, I'm interested in the ${product.name} — is it available?`;
  const whatsappUrl = `https://wa.me/19096876383?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
        >
          ← Go Back
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover rounded-xl shadow-md"
                />
                {product.isSold && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg text-sm">Sold</span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                      selectedImage === index ? 'ring-2 ring-blue-600 border-blue-400' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{product.category}</span>
                {product.isSold && (
                  <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">Sold</span>
                )}
              </div>
              <p className="text-2xl text-blue-600 font-semibold mb-2">
                ${product.priceRange.min} - ${product.priceRange.max}
              </p>
              <div className="border-t border-gray-200 my-4"></div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
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
              <div className="border-t border-gray-200 my-4"></div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Colors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="inline-block w-6 h-6 rounded-full border border-gray-300 shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mt-6 shadow-md text-lg"
                aria-label={`Request info about ${product.name} on WhatsApp`}
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.7 14.2c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2 0 1.2.8 2.4 1.1 2.7.3.3 2.2 3.4 5.3 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z"/></svg>
                  Request Info via WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}