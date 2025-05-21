'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, ProductCategory } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    (async () => {
      const ref = collection(db, 'products');
      const snap = await getDocs(ref);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Product[];
      setProducts(data);
      setFilteredProducts(data);
    })();
  }, []);

  useEffect(() => {
    let f = products;
    if (selectedCategory !== 'All') {
      f = f.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      f = f.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    f = f.filter(p =>
      p.priceRange.min >= priceRange[0] &&
      p.priceRange.max <= priceRange[1]
    );
    setFilteredProducts(f);
  }, [products, selectedCategory, searchQuery, priceRange]);

  const categories: (ProductCategory | 'All')[] = [
    'All', 'LEGGINGS', 'TOPS', 'JACKET', 'PANTS & SHORTS',
    'DRESS & SKIRT', 'SKIRT PLUS SIZE', 'SKIRT ONE SIZE',
    'DRESS', 'ROMPER & BODYSUIT', 'SALE'
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="w-full md:w-64">
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCategory(e.target.value as ProductCategory | 'All')
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (USD)</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span>to</span>
                <input
                  type="number"
                  min="0"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map(p => (
            <motion.div key={p.id} variants={itemVariants} className="h-full">
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
