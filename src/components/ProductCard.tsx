import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = `Hi, I'm interested in the ${product.name} — is it available?`;
  const whatsappUrl = `https://wa.me/19096876383?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col cursor-pointer group">
        <div className="relative w-full aspect-square bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
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
        className="block m-4 mt-0 bg-green-500 text-white text-center py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Request Info
      </a>
    </div>
  );
} 