'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, ProductCategory } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import SearchBar from '@/components/SearchBar';
import HeroSlider from '@/components/HeroSlider';
import HomeLayout from './page-layout';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          where('isSold', '==', false),
          limit(8)
        );
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Product[];
        
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);
  
  const categories: (ProductCategory | 'All')[] = ['All', 'LEGGINGS', 'TOPS', 'JACKET', 'PANTS & SHORTS', 'DRESS & SKIRT', 'SKIRT PLUS SIZE', 'SKIRT ONE SIZE', 'DRESS', 'ROMPER & BODYSUIT', 'SALE'];

  return (
    <HomeLayout>
    <main className="min-h-screen">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Floating WhatsApp Button - Replaces the full-width section */}
      <FloatingWhatsAppButton />

      {/* New Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Products</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our latest wholesale clothing items, carefully selected for quality and style
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-xs">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'All')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-sm font-medium"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Products Grid - Changed from 4 to 3 columns on large screens */}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products available in this category at the moment.</p>
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

      {/* Search Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Find What You&apos;re Looking For</h2>
          <SearchBar 
            placeholder="Search for wholesale clothing products..."
            className="max-w-2xl mx-auto"
            redirectToResults={true}
          />
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
                We&apos;re a small LA-based team with 20+ years of experience buying from the Fashion District. Every piece you see here is hand-picked and available for fast shipping.
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
            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-secondary-700"><span className="font-medium">Premium Quality:</span> Carefully sourced materials and strict quality control</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-secondary-700"><span className="font-medium">Competitive Pricing:</span> Wholesale rates that maximize your profit margins</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-secondary-700"><span className="font-medium">Diverse Selection:</span> Wide range of styles, sizes, and categories</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-secondary-700"><span className="font-medium">Reliable Service:</span> Fast shipping and responsive customer support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-secondary-700"><span className="font-medium">Exceptional Service:</span> Our dedicated team provides personalized support for all your wholesale needs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Newsletter Section */}
      <NewsletterSubscription />
    </main>
    </HomeLayout>
  );
}