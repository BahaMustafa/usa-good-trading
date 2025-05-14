'use client';

import React from 'react';
import ProductForm from '@/components/ProductForm';

export default function EditProductPage({ params }: { params: { id: string } }) {
  // Unwrap params with React.use()
  const resolvedParams = React.use(params);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm productId={resolvedParams.id} />
    </div>
  );
}