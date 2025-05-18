'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Testimonial } from '@/types/testimonial';

interface TestimonialFormProps {
  testimonialId?: string;
  initialData?: Partial<Testimonial>;
  onCancel?: () => void;
}

export default function TestimonialForm({ testimonialId, initialData, onCancel }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    message: initialData?.message || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const testimonialData = {
        ...formData,
        createdAt: testimonialId ? undefined : new Date(),
        updatedAt: new Date(),
      };

      if (testimonialId) {
        await setDoc(doc(db, 'testimonials', testimonialId), testimonialData, { merge: true });
      } else {
        const newDocRef = doc(collection(db, 'testimonials'));
        await setDoc(newDocRef, testimonialData);
      }

      if (onCancel) {
        onCancel();
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          required
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel || (() => router.back())}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : testimonialId ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </div>
    </form>
  );
}