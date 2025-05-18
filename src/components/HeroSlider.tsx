// src/components/HeroSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SliderImage } from '@/types/slider';

const slideVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function HeroSlider() {
  const [slides, setSlides] = useState<SliderImage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch slides from Firestore
  useEffect(() => {
    (async () => {
      try {
        const ref = collection(db, 'sliderImages');
        const q = query(ref, orderBy('order', 'asc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as SliderImage[];
        setSlides(data);
      } catch (err) {
        console.error('Error loading slides:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Auto-rotate every 3s
  useEffect(() => {
    if (slides.length < 2) return;
    const iv = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(iv);
  }, [slides]);

  const goPrev = () =>
    setIndex(i => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () =>
    setIndex(i => (i === slides.length - 1 ? 0 : i + 1));

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  if (loading || slides.length === 0) {
    return <DefaultHero />;
  }

  const slide = slides[index];

  return (
    <section
      {...handlers}
      className="relative h-[80vh] overflow-hidden"
    >
      <AnimatePresence initial={false} custom={index}>
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title || 'Slide'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            {slide.title && (
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
            )}
            {slide.subtitle && (
              <p className="text-xl md:text-2xl text-white max-w-2xl mb-6 drop-shadow">
                {slide.subtitle}
              </p>
            )}
            {slide.buttonText && slide.buttonLink && (
              <div className="flex gap-4">
                <Link
                  href={slide.buttonLink}
                  className="btn btn-primary px-8 py-3 rounded-full"
                >
                  {slide.buttonText}
                </Link>
                <Link
                  href="/about"
                  className="btn btn-secondary px-8 py-3 rounded-full"
                >
                  Our Story
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}

// Fallback if no slides
function DefaultHero() {
  return (
    <section className="relative h-[80vh] bg-gradient-to-r from-blue-700 via-white to-red-600 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-10" />
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 drop-shadow-md">
          Premium Wholesale Clothing
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
          USA Good Trading – Your trusted wholesale clothing supplier since 2009
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
