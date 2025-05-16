'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          where('isSold', '==', false),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Product[];
        
        setFeaturedProducts(productsData);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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

      {/* About Section */}
      <section className="section bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About USA Good Trading</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2009 in Los Angeles, California, USA Good Trading has grown into a trusted name in the wholesale clothing industry. 
                We specialize in providing premium quality apparel for retailers and businesses at competitive wholesale prices.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our commitment to quality, reliability, and exceptional customer service has allowed us to build lasting relationships 
                with our clients for over a decade.
              </p>
              <Link 
                href="/about" 
                className="btn btn-primary inline-block px-6 py-3 rounded-md"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-medium">Premium Quality:</span> Carefully sourced materials and strict quality control</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-medium">Competitive Pricing:</span> Wholesale rates that maximize your profit margins</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-medium">Diverse Selection:</span> Wide range of styles, sizes, and categories</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><span className="font-medium">Reliable Service:</span> Fast shipping and responsive customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Find What You&apos;re Looking For</h2>
          <SearchBar 
            placeholder="Search for wholesale clothing products..."
            className="max-w-2xl mx-auto"
            redirectToResults={true}
          />
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="section bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our selection of premium wholesale clothing items, carefully curated for quality and style
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured products available at the moment.</p>
          )}
          
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We source only the highest quality clothing items to ensure customer satisfaction.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">Our wholesale prices are designed to maximize your profit margins.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Exceptional Service</h3>
              <p className="text-gray-600">Our dedicated team provides personalized support for all your wholesale needs.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Newsletter Section */}
      <NewsletterSubscription />
    </main>
  );
}