// components/Navigation.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const isActive = (href: string) => pathname === href;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const links = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/products', label: 'Products', icon: ShoppingBagIcon },
    { href: '/about', label: 'About Us', icon: InformationCircleIcon },
    { href: '/contact', label: 'Contact Us', icon: PhoneIcon, primary: true },
  ];

  return (
    <>
      {/* Top Navbar - Now sticky */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-2'
            : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-montserrat text-2xl font-bold tracking-tighter">
              <span className="text-[var(--primary-color)]">USA</span>
              <span className="text-[var(--accent-color)]">GOOD</span>
              <span className="text-[var(--text-color)]">TRADING</span>
            </span>
          </Link>

          {/* Search Bar (Expandable) */}
          <div className={`absolute left-0 right-0 top-0 bottom-0 bg-white z-10 flex items-center px-4 transition-all duration-300 ${showSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <form onSubmit={handleSearch} className="w-full flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 py-3 px-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-gray-700"
              />
              <button type="submit" className="p-3 text-blue-600">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button 
                type="button" 
                onClick={() => setShowSearch(false)}
                className="p-3 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[var(--primary-color)] font-semibold border-b-2 border-[var(--primary-color)]'
                    : 'text-gray-700 hover:text-[var(--primary-color)]'
                } ${
                  link.primary
                    ? 'bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--secondary-color)]'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            
            <a
              href="https://wa.me/19096876383"
              target="_blank"
              className="ml-2 px-5 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Join WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="p-2 rounded-md text-gray-600 hover:text-[var(--primary-color)] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className={`h-16 ${scrolled ? 'md:h-14' : 'md:h-20'} transition-all duration-300`}></div>

      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto z-40'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Simplified Mobile Menu */}
      <aside
        ref={drawerRef}
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0 z-50' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-gray-800">
              <span className="text-[var(--primary-color)]">USA</span>
              <span className="text-[var(--accent-color)]">GOOD</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Items - Simplified */}
          <nav role="menu" className="flex-1 overflow-y-auto py-4 px-2">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg text-center transition-colors duration-200 hover:bg-gray-100 ${
                      isActive(link.href)
                        ? 'bg-blue-50 text-[var(--primary-color)]'
                        : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-1" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Search in Mobile Menu */}
            <div className="px-3 mb-4">
              <form onSubmit={handleSearch} className="flex border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 py-2 px-3 outline-none text-gray-700 text-sm"
                />
                <button type="submit" className="px-3 bg-blue-50 text-blue-600">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          </nav>

          {/* Footer CTA */}
          <div className="px-4 py-4 border-t border-gray-200 mt-auto">
            <a
              href="https://wa.me/19096876383"
              target="_blank"
              className="flex items-center justify-center w-full bg-green-500 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
              Join WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
