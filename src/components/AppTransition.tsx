// src/components/AppTransition.tsx
'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AppTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Disable animations for product pages to prevent double animations
  const isProductPage = pathname.startsWith('/product/');
  
  if (isProductPage) {
    return <main className="pt-16 flex-1">{children}</main>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="pt-16 flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
