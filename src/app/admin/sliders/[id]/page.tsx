'use client';

import { useParams } from 'next/navigation';
import SliderForm from '@/components/SliderForm';

export default function EditSliderPage() {
  const params = useParams();
  const sliderId = params.id as string;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Slider Image</h1>
        <SliderForm sliderId={sliderId} />
      </div>
    </div>
  );
}