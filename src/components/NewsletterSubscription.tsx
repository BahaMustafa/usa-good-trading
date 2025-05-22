// src/components/NewsletterSubscription.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus('submitting');
    try {
      // write to Firestore
      await addDoc(collection(db, 'subscribers'), {
        email: trimmed,
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error saving subscriber:', err);
      setStatus('error');
    }
  };

  return (
    <motion.section
      className="bg-blue-600 text-white py-12 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="text-blue-100">
          Stay updated with our latest products and wholesale deals.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 transition-colors"
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm bg-blue-500 text-white p-2 rounded-lg max-w-md mx-auto"
          >
            🎉 Thanks for subscribing!
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm bg-red-500 text-white p-2 rounded-lg max-w-md mx-auto"
          >
            Oops! Something went wrong. Please try again.
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
