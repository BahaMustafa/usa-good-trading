'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

// Changed from group URL to direct phone number
const WHATSAPP_PHONE = '19096876383';

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] ?? '/fallback-product.jpg';
  const priceText =
    product.priceRange.min === 0
      ? 'Contact for price'
      : `$${product.priceRange.min}${product.priceRange.max > product.priceRange.min ? ` - $${product.priceRange.max}` : ''}`;

  return (
    <div className="card h-full flex flex-col transition-all duration-300 hover:translate-y-[-4px]">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
        {/* Image container */}
        <div className="relative w-full h-64 bg-secondary-50 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={`${product.name} – ${product.category}`}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          {/* Sold badge */}
          {product.isSold && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-block bg-accent-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Sold
              </span>
            </div>
          )}

          {/* View details overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium">
              View Details
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col p-4 gap-2">
          <h3 className="text-lg font-semibold text-secondary-800 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="text-primary-600 font-bold text-lg">{priceText}</div>
          
          {/* Size and color indicators could go here */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span key={size} className="text-xs px-2 py-0.5 bg-secondary-100 text-secondary-600 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-secondary-100 text-secondary-600 rounded">+{product.sizes.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* WhatsApp CTA */}
      <div className="p-4 pt-0 mt-auto">
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=I'm interested in ${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Request info about ${product.name} on WhatsApp`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md font-medium bg-accent-500 hover:bg-accent-600 text-white transition-colors duration-300 shadow-sm hover:shadow-md"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          Request Info
        </a>
      </div>
    </div>
  );
}
