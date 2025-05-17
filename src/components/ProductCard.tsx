'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = `Hi, I'm interested in the ${product.name} — is it available?`;
  const whatsappUrl = `https://wa.me/19096876383?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col cursor-pointer">
        {/* Product Image with Category Tag */}
        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          {product.isSold && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">Sold</span>
          )}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
              {product.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium">View Details</span>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex-1 flex flex-col p-4 gap-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
          
          {/* Price Range */}
          <div className="text-blue-700 font-bold text-lg mt-1">
            ${product.priceRange.min}{product.priceRange.max > product.priceRange.min && ` - $${product.priceRange.max}`}
          </div>
          
          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-2">
              <div className="text-xs font-medium text-gray-500 mb-1">Sizes</div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map(size => (
                  <span key={size} className="bg-gray-100 px-2 py-0.5 rounded-md text-xs font-medium text-gray-700">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2">
              <div className="text-xs font-medium text-gray-500 mb-1">Colors</div>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map(color => (
                  <span 
                    key={color} 
                    className="inline-block w-6 h-6 rounded-full border border-gray-200 shadow-sm" 
                    style={{ backgroundColor: color }} 
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>
      
      {/* Request Info Button */}
      <div className="p-4 pt-0">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Request info about ${product.name} on WhatsApp`}
          className="block w-full bg-green-500 text-white text-center py-2.5 rounded-md font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.7 14.2c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2 0 1.2.8 2.4 1.1 2.7.3.3 2.2 3.4 5.3 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z"/>
          </svg>
          Request Info
        </a>
      </div>
    </div>
  );
}