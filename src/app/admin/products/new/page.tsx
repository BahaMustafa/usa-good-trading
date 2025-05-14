'use client';

import ProductForm from '@/components/ProductForm';

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm />
        </div>
      </div>
    </div>
  );
} 