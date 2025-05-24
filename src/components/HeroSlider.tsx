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

  // fetch slides
  useEffect(() => {
    (async () => {
      try {
        const ref = collection(db, 'sliderImages');
        const q = query(ref, orderBy('order', 'asc'));
        const snap = await getDocs(q);
        setSlides(
          snap.docs.map(d => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate(),
          })) as SliderImage[]
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // auto-rotate
  useEffect(() => {
    if (slides.length < 2) return;
    const iv = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(iv);
  }, [slides]);

  const goPrev = () => setIndex(i => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () => setIndex(i => (i + 1) % slides.length);

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
      className="relative h-[50vh] md:h-[40vh] overflow-hidden"
    >
      <AnimatePresence initial={false} custom={index}>
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title ?? 'Slide'}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/25" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-20 mix-blend-overlay" />

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {slide.title && (
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {slide.title}
              </h1>
            )}
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white mb-5 drop-shadow">
                {slide.subtitle}
              </p>
            )}
            {slide.buttonText && slide.buttonLink && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={slide.buttonLink}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-transparent"
                >
                  {slide.buttonText}
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-white hover:border-gray-200"
                >
                  Our Story
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}

function DefaultHero() {
  return (
    <section className="relative h-[50vh] md:h-[40vh] bg-gradient-to-r from-blue-700 via-white to-red-600 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-25 mix-blend-overlay" />
      <div className="relative h-full flex flex-col items-center justify-center text-white px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 drop-shadow-md">
          Premium Wholesale Clothing
        </h1>
        <p className="text-lg md:text-xl text-center mb-6 max-w-2xl">
          USA Good Trading – Your trusted wholesale clothing supplier since 2009
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-transparent"
          >
            Browse Products
          </Link>
          <Link
            href="/about"
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-white hover:border-gray-200"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
