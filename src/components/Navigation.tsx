'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/products', label: 'Products', icon: ShoppingBagIcon },
    { href: '/about', label: 'About Us', icon: InformationCircleIcon },
    { href: '/contact', label: 'Contact', icon: PhoneIcon, primary: true },
  ];
  const isActive = (href: string) => pathname === href;

  return (
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
          <a
            href="https://chat.whatsapp.com/EaX8DUbNYDeLDfwqUdggtF"
            target="_blank"
            className="px-5 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Join WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-[var(--primary-color)] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-2xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="text-lg font-semibold">
                  <span className="text-[var(--primary-color)]">USA</span>
                  <span className="text-[var(--accent-color)]">GOOD</span>
                  <span className="text-[var(--text-color)]">TRADING</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <nav className="space-y-4">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive(link.href)
                          ? 'bg-gray-100 text-[var(--primary-color)]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3 text-gray-500" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <a
                href="https://chat.whatsapp.com/EaX8DUbNYDeLDfwqUdggtF"
                target="_blank"
                className="mt-6 flex items-center justify-center w-full bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
                Join WhatsApp
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
