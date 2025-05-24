// src/components/Testimonials.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Testimonial } from '@/types/testimonial';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const ref = collection(db, 'testimonials');
        const q = query(ref, orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Testimonial[];
        setTestimonials(data);
      } catch (err) {
        console.error('Error loading testimonials:', err);
      }
    })();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-secondary-900">What Our Customers Say</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="card h-full flex flex-col p-6 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="flex-1">
                <p className="text-secondary-700 mb-4 italic">&ldquo;{t.message}&rdquo;</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-primary-700">— {t.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
