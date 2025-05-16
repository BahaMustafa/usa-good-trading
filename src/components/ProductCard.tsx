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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:border-blue-200 transition-all duration-200">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col cursor-pointer group">
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:opacity-90 transition-opacity"
          />
          {product.isSold && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Sold</span>
          )}
        </div>
        <div className="flex-1 flex flex-col p-4 gap-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <div className="text-blue-600 font-bold text-base">
            ${product.priceRange.min} - ${product.priceRange.max}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
            {product.sizes.map(size => (
              <span key={size} className="bg-gray-100 px-2 py-1 rounded">{size}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {product.colors.map(color => (
              <span key={color} className="inline-block w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color }} title={color}></span>
            ))}
          </div>
        </div>
      </Link>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Request info about ${product.name} on WhatsApp`}
        className="block m-4 mt-0 bg-green-500 text-white text-center py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-md"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.7 14.2c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2 0 1.2.8 2.4 1.1 2.7.3.3 2.2 3.4 5.3 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z"/></svg>
        Request Info
      </a>
    </div>
  );
}