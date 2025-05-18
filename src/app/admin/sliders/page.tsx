'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SliderImage } from '@/types/slider';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminSliders() {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const fetchSliderImages = async () => {
    try {
      setLoading(true);
      const slidersRef = collection(db, 'sliderImages');
      const q = query(slidersRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate(),
        updatedAt: d.data().updatedAt?.toDate(),
      })) as SliderImage[];
      setSliderImages(data);
    } catch (err) {
      console.error('Error fetching slider images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sliderId: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this slider image?'
      )
    )
      return;
    try {
      await deleteDoc(doc(db, 'sliderImages', sliderId));
      fetchSliderImages();
    } catch (err) {
      console.error('Error deleting slider image:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Hero Slider</h1>
          <Link
            href="/admin/sliders/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Slider Image
          </Link>
        </div>

        {sliderImages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">
              No slider images found. Add your first slider image to
              enhance your homepage.
            </p>
            <Link
              href="/admin/sliders/new"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Slider Image
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Image', 'Title', 'Order', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sliderImages.map((slider) => (
                  <tr key={slider.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-16 w-24 relative">
                        <Image
                          src={slider.imageUrl}
                          alt={slider.title || 'Slider image'}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {slider.title || 'No title'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {slider.subtitle || 'No subtitle'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {slider.order}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/sliders/${slider.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(slider.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            Tips for Hero Slider Images
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Use high-quality images with a 16:9 aspect ratio for best
              results
            </li>
            <li>Recommended image size: 1920x1080 pixels</li>
            <li>
              Keep text on images minimal and ensure good contrast for
              readability
            </li>
            <li>
              Set the display order to control the sequence of slider images
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
