export type ProductCategory = 'LEGGINGS' | 'TOPS' | 'JACKET' | 'PANTS & SHORTS' | 'DRESS & SKIRT' | 'SKIRT PLUS SIZE' | 'SKIRT ONE SIZE' | 'DRESS' | 'ROMPER & BODYSUIT' | 'SALE';

export interface PriceRange {
  min: number;
  max: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  priceRange: PriceRange;
  sizes: string[];
  colors: string[];
  category: ProductCategory;
  isSold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string; // Add at least one property to avoid empty interface error
}