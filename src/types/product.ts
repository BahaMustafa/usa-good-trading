export type ProductCategory = 'Men' | 'Women' | 'Kids' | 'Unisex';

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
  // Add at least one property or extend without empty object
}