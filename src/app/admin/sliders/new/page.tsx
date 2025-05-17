'use client';

import SliderForm from '@/components/SliderForm';

export default function NewSliderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Add New Slider Image</h1>
        <SliderForm />
      </div>
    </div>
  );
}