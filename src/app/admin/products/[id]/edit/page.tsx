'use client';

import ProductForm from '@/components/ProductForm';

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm productId={params.id} />
        </div>
      </div>
    </div>
  );
} 