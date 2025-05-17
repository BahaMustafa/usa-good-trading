'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SliderImage, SliderImageFormData } from '@/types/slider';
import Image from 'next/image';

interface SliderFormProps {
  sliderId?: string;
}

export default function SliderForm({ sliderId }: SliderFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<SliderImageFormData>({
    imageUrl: '',
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    order: 0,
  });

  useEffect(() => {
    if (sliderId) {
      const fetchSliderImage = async () => {
        try {
          const docRef = doc(db, 'sliderImages', sliderId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const sliderData = docSnap.data() as SliderImage;
            setFormData({
              imageUrl: sliderData.imageUrl,
              title: sliderData.title || '',
              subtitle: sliderData.subtitle || '',
              buttonText: sliderData.buttonText || '',
              buttonLink: sliderData.buttonLink || '',
              order: sliderData.order,
            });
          }
        } catch (error) {
          console.error('Error fetching slider image:', error);
        }
      };
      fetchSliderImage();
    }
  }, [sliderId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0]; // Only upload one image for slider
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.secure_url,
        }));
      } else {
        console.error('Cloudinary upload failed:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sliderData = {
        ...formData,
        createdAt: sliderId ? undefined : new Date(),
        updatedAt: new Date(),
      };

      // Remove undefined fields
      Object.keys(sliderData).forEach(
        (key) => (sliderData as Record<string, unknown>)[key] === undefined && delete (sliderData as Record<string, unknown>)[key]
      );

      if (sliderId) {
        await setDoc(doc(db, 'sliderImages', sliderId), sliderData);
      } else {
        const newDocRef = doc(collection(db, 'sliderImages'));
        await setDoc(newDocRef, sliderData);
      }

      router.push('/admin/sliders');
    } catch (error) {
      console.error('Error saving slider image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {sliderId ? 'Edit Slider Image' : 'Add New Slider Image'}
        </h2>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slider Image
          </label>
          <div className="mt-1 flex flex-col items-center">
            {formData.imageUrl ? (
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={formData.imageUrl}
                  alt="Slider preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                <span className="text-gray-500">No image selected</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-4">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Button Text */}
        <div className="mb-4">
          <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
            Button Text
          </label>
          <input
            type="text"
            id="buttonText"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Button Link */}
        <div className="mb-4">
          <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-1">
            Button Link
          </label>
          <input
            type="text"
            id="buttonLink"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="/products"
          />
        </div>

        {/* Order */}
        <div className="mb-4">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">Lower numbers will be displayed first</p>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/sliders')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.imageUrl}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Slider Image'}
          </button>
        </div>
      </div>
    </form>
  );
}