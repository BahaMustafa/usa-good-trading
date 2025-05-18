// src/components/TestimonialForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore'; // Removed unused getDoc import
import { db } from '@/lib/firebase';
import { Testimonial, TestimonialFormData } from '@/types/testimonial';

interface TestimonialFormProps {
  testimonialId?: string;
  initialData?: Testimonial;
  onCancel: () => void;
}

export default function TestimonialForm({
  testimonialId,
  initialData,
  onCancel,
}: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    message: '',
  });

  // Pre-fill for edit
  useEffect(() => {
    if (testimonialId && initialData) {
      setFormData({
        name: initialData.name,
        message: initialData.message,
      });
    }
  }, [testimonialId, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        updatedAt: new Date(),
        createdAt: initialData ? initialData.createdAt : new Date(),
      };

      if (testimonialId) {
        await setDoc(doc(db, 'testimonials', testimonialId), dataToSave);
      } else {
        const newRef = doc(collection(db, 'testimonials'));
        await setDoc(newRef, dataToSave);
      }

      onCancel(); // close modal & parent will refresh list
    } catch (err) {
      console.error('Error saving testimonial:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Testimonial
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Testimonial'}
        </button>
      </div>
    </form>
  );
}
