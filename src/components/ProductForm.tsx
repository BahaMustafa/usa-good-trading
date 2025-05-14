'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, ProductCategory } from '@/types/product';
import Image from 'next/image';

interface ProductFormProps {
  productId?: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Men' as ProductCategory,
    priceRange: {
      min: 0,
      max: 0,
    },
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    isSold: false,
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', productId!);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const productData = docSnap.data() as Product;
        setFormData({
          name: productData.name,
          description: productData.description,
          category: productData.category,
          priceRange: productData.priceRange,
          sizes: productData.sizes,
          colors: productData.colors,
          images: productData.images,
          isSold: productData.isSold,
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        console.log('Uploading to:', `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`);
        console.log('Upload preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        console.log('File:', file);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        console.log('Cloudinary response:', data);
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          console.error('Cloudinary upload failed:', data);
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let productData = {
        ...formData,
        createdAt: productId ? undefined : new Date(),
        updatedAt: new Date(),
      };
      // Remove undefined fields at the top level
      Object.keys(productData).forEach(
        (key) => (productData as any)[key] === undefined && delete (productData as any)[key]
      );
      // Remove undefined from arrays
      if (Array.isArray(productData.images)) {
        productData.images = productData.images.filter((img: string | undefined) => img !== undefined);
      }
      if (Array.isArray(productData.sizes)) {
        productData.sizes = productData.sizes.filter((s: string | undefined) => s !== undefined);
      }
      if (Array.isArray(productData.colors)) {
        productData.colors = productData.colors.filter((c: string | undefined) => c !== undefined);
      }
      // Remove undefined from nested priceRange object
      if (productData.priceRange) {
        Object.keys(productData.priceRange).forEach(
          (key) => (productData.priceRange as any)[key] === undefined && delete (productData.priceRange as any)[key]
        );
      }

      if (productId) {
        await setDoc(doc(db, 'products', productId), productData);
      } else {
        const newDocRef = doc(collection(db, 'products'));
        await setDoc(newDocRef, productData);
      }

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ProductCategory }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            required
            min="0"
            value={formData.priceRange.min}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              priceRange: { ...prev.priceRange, min: Number(e.target.value) },
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            required
            min="0"
            value={formData.priceRange.max}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              priceRange: { ...prev.priceRange, max: Number(e.target.value) },
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sizes (comma-separated)</label>
        <input
          type="text"
          required
          value={formData.sizes.join(', ')}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            sizes: e.target.value.split(',').map(size => size.trim()),
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Colors (comma-separated)</label>
        <input
          type="text"
          required
          value={formData.colors.join(', ')}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            colors: e.target.value.split(',').map(color => color.trim()),
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload images</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {formData.images.map((image, index) =>
        image ? (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : null
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isSold"
          checked={formData.isSold}
          onChange={(e) => setFormData(prev => ({ ...prev, isSold: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isSold" className="ml-2 block text-sm text-gray-900">
          Mark as sold
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : uploading ? 'Uploading...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
} 