// src/components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Removed unused variable 'addressQuery'

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand + Social */}
        <div>
          <h2 className="font-montserrat text-2xl font-bold tracking-tight mb-2">
            <span className="text-blue-400">USA</span>
            <span className="text-red-400">GOOD</span>
            <span className="text-white">TRADING</span>
          </h2>
          <p className="text-sm text-gray-500 mb-4">EST. 2009</p>
          <p className="text-gray-400 text-sm">
            A trusted wholesale clothing supplier since 2009.
          </p>
          <div className="mt-4 flex space-x-4">
            {/* Facebook */}
            <a
              href="https://facebook.com/YourPage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 320 512" fill="currentColor">
                <path d="M279.14 288l14.22-92.66h-88.91V117.32c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.14 44.38-121.14 124.72v70.62H22.89V288h81.33v224h100.2V288z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/YourPage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor">
                <path d="M224.1 141c-63.6 0-115 51.4-115 115s51.4 115 115 115 115-51.4 115-115-51.4-115-115-115zm0 190c-41.4 0-75-33.6-75-75s33.6-75 75-75 75 33.6 75 75-33.6 75-75 75zm146.4-194.7c0 14.9-12.1 27-27 27s-27-12.1-27-27 12.1-27 27-27 27 12.1 27 27zm76.1 27.2c-1.7-35.7-9.9-67.3-36.3-93.7s-58-34.6-93.7-36.3C285.1 32 224 32 224 32s-61.1 0-93.5 1.7c-35.7 1.7-67.3 9.9-93.7 36.3s-34.6 58-36.3 93.7C32 158.9 32 220 32 220s0 61.1 1.7 93.5c1.7 35.7 9.9 67.3 36.3 93.7s58 34.6 93.7 36.3c32.4 1.7 93.5 1.7 93.5 1.7s61.1 0 93.5-1.7c35.7-1.7 67.3-9.9 93.7-36.3s34.6-58 36.3-93.7c1.7-32.4 1.7-93.5 1.7-93.5s0-61.1-1.7-93.5zM398.8 338c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com/YourPage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
                <path d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447 .974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498 .974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-103.001v-1.299c14.182 7.888 30.355 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.543-2.599-15.419-2.599-23.295 0-56.785 46.132-102.917 102.917-102.917 29.644 0 56.432 12.67 75.176 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.888 24.622-24.622 45.324-46.456 58.665 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
              </svg>
            </a>
          </div>
        </div>

      
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-xs text-gray-500">&copy; {currentYear} USA Good Trading. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="text-xs hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms"  className="text-xs hover:text-white transition">Terms of Service</Link>
          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs flex items-center hover:text-white transition"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
