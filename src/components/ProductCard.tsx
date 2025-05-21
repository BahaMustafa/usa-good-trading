'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const WHATSAPP_GROUP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ||
  'https://chat.whatsapp.com/EaX8DUbNYDeLDfwqUdggtF';

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] ?? '/fallback-product.jpg';
  const priceText =
    product.priceRange.min === 0
      ? 'Contact for price'
      : `$${product.priceRange.min}${
          product.priceRange.max > product.priceRange.min
            ? ` - $${product.priceRange.max}`
            : ''
        }`;

  return (
    // outer gradient + clip
    <div className="group overflow-hidden p-1 rounded-lg bg-gradient-to-r from-blue-400 to-teal-400 hover:from-purple-500 hover:to-pink-500 transition-colors duration-700">
      {/* inner glassy card */}
      <div className="flex flex-col h-full bg-white bg-opacity-70 backdrop-blur-md rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2">
        <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
          {/* padding outside the clipped image */}
          <div className="p-2">
            {/* clipped container */}
            <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${product.name} – ${product.category}`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />

              {/* badges */}
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm z-10">
                {product.category}
              </span>
              {product.isSold && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                  Sold
                </span>
              )}

              {/* overlay on hover */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">
                  View Details
                </span>
              </div>
            </div>
          </div>

          {/* product info */}
          <div className="flex-1 flex flex-col p-4 gap-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
              {product.name}
            </h3>
            <div className="text-blue-700 font-bold text-lg">{priceText}</div>
            {/* sizes & colors… */}
          </div>
        </Link>

        {/* WhatsApp CTA */}
        <div className="p-4 pt-0">
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Request info about ${product.name} on WhatsApp`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            {/* svg icon */}
            Request Info
          </a>
        </div>
      </div>
    </div>
  );
}
