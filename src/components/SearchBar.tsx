// src/components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
  redirectToResults?: boolean;
}

export default function SearchBar({
  placeholder = 'Search products...',
  className = '',
  onSearch,
  initialValue = '',
  redirectToResults = false,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    onSearch?.(trimmed);
    if (redirectToResults) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <motion.svg
        initial={false}
        animate={focused ? { color: '#3b82f6' } : { color: '#9ca3af' }}
        transition={{ duration: 0.2 }}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-2.5 h-5 w-5 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </motion.svg>

      <motion.input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none"
        transition={{ duration: 0.2 }}
        whileFocus={{ scale: 1.02, boxShadow: '0 0 0 4px rgba(59,130,246,0.2)' }}
      />

      <motion.button
        type="submit"
        className="absolute right-2 top-2 p-1 rounded-full text-gray-400"
        whileHover={{ scale: 1.2, color: '#3b82f6' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>
    </form>
  );
}
