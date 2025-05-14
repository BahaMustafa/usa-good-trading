'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-30 bg-white shadow border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            {/* Logo placeholder */}
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">U</div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-medium text-blue-600 tracking-tight">USA Good Trading</span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-800 no-underline ${
                isActive('/') ? 'text-blue-700 font-semibold' : 'text-gray-500'
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-800 no-underline ${
                isActive('/products') ? 'text-blue-700 font-semibold' : 'text-gray-500'
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-800 no-underline ${
                isActive('/about') ? 'text-blue-700 font-semibold' : 'text-gray-500'
              }`}
            >
              About Us
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-800 ${
                isActive('/') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-800 ${
                isActive('/products') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-800 ${
                isActive('/about') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}