'use client';

import { useState } from 'react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    
    try {
      // Simulate API call - in a real app, you would connect this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // console.log('Newsletter subscription:', email); // Removed for production cleanliness
      setStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-blue-600 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100">Stay updated with our latest products and wholesale deals</p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'success' && (
          <div className="mt-4 text-center text-sm bg-blue-500 text-white p-2 rounded-lg max-w-md mx-auto">
            Thank you for subscribing! You&apos;ll receive our updates soon.
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 text-center text-sm bg-red-500 text-white p-2 rounded-lg max-w-md mx-auto">
            There was an error subscribing. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}