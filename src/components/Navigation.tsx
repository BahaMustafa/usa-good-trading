'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navigation bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center">
              <div className="h-12 w-auto flex items-center justify-center">
                <span className="font-montserrat text-2xl font-bold tracking-tighter">
                  <span className="text-blue-700">USA</span>
                  <span className="text-red-600">GOOD</span>
                  <span className="text-gray-800">TRADING</span>
                </span>
              </div>
              <div className="ml-2 text-xs text-gray-500 hidden sm:block">
                <span>EST. 2009</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive('/') 
                ? 'text-blue-700 font-semibold border-b-2 border-blue-700' 
                : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive('/products') 
                ? 'text-blue-700 font-semibold border-b-2 border-blue-700' 
                : 'text-gray-700 hover:text-blue-600'}`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive('/about') 
                ? 'text-blue-700 font-semibold border-b-2 border-blue-700' 
                : 'text-gray-700 hover:text-blue-600'}`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="ml-3 px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg border-t border-gray-100">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/products') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}