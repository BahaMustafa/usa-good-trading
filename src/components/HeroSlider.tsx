'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SliderImage } from '@/types/slider';

export default function HeroSlider() {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const sliderRef = collection(db, 'sliderImages');
        const q = query(sliderRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          // If no slider images found, use default hero section
          setLoading(false);
          return;
        }
        
        const imagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as SliderImage[];
        
        setSliderImages(imagesData);
      } catch (error) {
        console.error('Error fetching slider images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    // Auto-rotate slides every 5 seconds if there are multiple slides
    if (sliderImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // If no slider images or still loading, show default hero section
  if (loading || sliderImages.length === 0) {
    return (
      <section className="relative h-[85vh] bg-gradient-to-r from-blue-700 via-white to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-10" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 drop-shadow-md">
            Premium Wholesale Clothing
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
            USA Good Trading - Your trusted wholesale clothing supplier since 2009
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/products"
              className="btn btn-primary px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Browse Products
            </Link>
            <Link
              href="/about"
              className="btn btn-secondary px-8 py-3 rounded-full font-semibold text-lg shadow-sm hover:shadow"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentSlide = sliderImages[currentIndex];

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Slider image */}
      <div className="absolute inset-0">
        <Image 
          src={currentSlide.imageUrl} 
          alt={currentSlide.title || 'Slider image'} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Slider content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 max-w-6xl mx-auto">
        {currentSlide.title && (
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 drop-shadow-md">
            {currentSlide.title}
          </h1>
        )}
        {currentSlide.subtitle && (
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
            {currentSlide.subtitle}
          </p>
        )}
        {currentSlide.buttonText && currentSlide.buttonLink && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href={currentSlide.buttonLink}
              className="btn btn-primary px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {currentSlide.buttonText}
            </Link>
            <Link
              href="/about"
              className="btn btn-secondary px-8 py-3 rounded-full font-semibold text-lg shadow-sm hover:shadow"
            >
              Our Story
            </Link>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {sliderImages.length > 1 && (
        <>
          <button 
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}