'use client';

import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About USA Good Trading</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>
        
        {/* Updated Our Story block */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Story</h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            For over 20 years, our team has hand-picked top-quality wholesale apparel and delivered it straight to your door.
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>🔹 20+ years of sourcing premium clothing</li>
            <li>🔹 10,000+ orders shipped nationwide</li>
            <li>🔹 Trusted partnerships with leading manufacturers</li>
          </ul>

          <p className="text-gray-700 mb-4 leading-relaxed">
            We specialize in fast, reliable shipping of women’s and men’s essentials—t-shirts, jackets, dresses, joggers, and more. Every piece is selected for quality, durability, and on-trend style.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Whether you run a boutique or an online store, we’re here to help you grow.{' '}
            <Link href="/new-arrivals" className="text-blue-600 underline">
              Browse our latest collection
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-blue-600 underline">
              request a custom quote
            </Link>{' '}
            today.
          </p>
        </div>
        {/* End Our Story block */}

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At USA Good Trading, our mission is to provide high-quality wholesale clothing at competitive prices while maintaining 
            the highest standards of customer service. We believe in building long-term relationships with our clients based on trust, 
            reliability, and mutual success.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is the minimum order quantity?</h3>
              <p className="text-gray-700">Please contact us for specific details about the products you&apos;re interested in.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-700">Yes, we ship to select international destinations. Shipping costs and delivery times vary by location.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-700">We accept major credit cards, wire transfers, and PayPal for wholesale orders.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Can I request samples before placing a bulk order?</h3>
              <p className="text-gray-700">Yes, we offer sample orders for qualified businesses. Sample costs may apply and will be credited toward your first bulk order.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We&apos;re always happy to hear from potential clients and answer any questions you might have about our products or services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (909) 687-6383
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@usagoodtrading.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
