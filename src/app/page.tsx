import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-red-600 via-white to-blue-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            USA Good Trading
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8">
            Trusted Wholesale Clothing Supplier for 14+ Years
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            View Products
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            With over 14 years of experience in the wholesale clothing industry, 
            USA Good Trading has built a reputation for quality, reliability, and 
            exceptional customer service. We specialize in providing premium 
            clothing at competitive wholesale prices.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured products will be dynamically loaded here */}
          </div>
        </div>
      </section>
    </main>
  );
} 