'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp business number
    window.open('https://wa.me/19096876383?text=Hello%2C%20I%27m%20interested%20in%20your%20wholesale%20clothing%20products.', '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 3.8C16.53 3.8 20.2 7.47 20.2 12C20.2 16.53 16.53 20.2 12 20.2C10.34 20.2 8.81 19.71 7.54 18.86L4.8 19.6L5.54 16.93C4.7 15.66 4.2 14.12 4.2 12.46C4.2 7.93 7.87 3.8 12 3.8M8.5 7.8C8.3 7.8 8 7.9 7.7 8.2C7.4 8.5 6.8 9.1 6.8 10.1C6.8 11.1 7.5 12.1 7.6 12.3C7.7 12.5 9.1 14.8 11.3 15.7C13.1 16.5 13.5 16.4 14 16.3C14.5 16.2 15.3 15.7 15.5 15.1C15.7 14.5 15.7 14 15.6 13.9C15.5 13.8 15.3 13.7 15 13.6C14.7 13.5 13.7 13 13.4 12.9C13.1 12.8 12.9 12.7 12.7 13C12.5 13.3 12.1 13.8 11.9 14C11.7 14.2 11.5 14.2 11.2 14.1C10.9 14 10.2 13.8 9.4 13.1C8.7 12.5 8.3 11.8 8.1 11.5C7.9 11.2 8.1 11 8.2 10.9C8.3 10.8 8.5 10.6 8.6 10.5C8.7 10.4 8.8 10.2 8.9 10.1C9 10 9 9.8 8.9 9.7C8.8 9.6 8.4 8.5 8.2 7.9C8 7.3 7.8 7.4 7.6 7.4C7.4 7.4 7.2 7.4 7 7.4C6.8 7.4 6.5 7.5 6.2 7.8C5.9 8.1 5.3 8.6 5.3 9.6C5.3 10.6 6 11.6 6.1 11.8C6.2 12 8.3 15.3 11.6 16.5C12.3 16.8 12.9 17 13.3 17.1C14 17.3 14.6 17.3 15.1 17.2C15.7 17.1 16.5 16.6 16.7 15.9C16.9 15.2 16.9 14.6 16.8 14.5C16.7 14.4 16.5 14.3 16.2 14.2C15.9 14.1 14.9 13.6 14.6 13.5C14.3 13.4 14.1 13.3 13.9 13.6C13.7 13.9 13.3 14.4 13.1 14.6C12.9 14.8 12.7 14.8 12.4 14.7C12.1 14.6 11.4 14.4 10.6 13.7C9.9 13.1 9.5 12.4 9.3 12.1C9.1 11.8 9.3 11.6 9.4 11.5C9.5 11.4 9.7 11.2 9.8 11.1C9.9 11 10 10.8 10.1 10.7C10.2 10.6 10.2 10.4 10.1 10.3C10 10.2 9.8 9.8 9.6 9.5C9.4 9.2 9.2 8.9 9 8.7C8.8 8.5 8.6 8.3 8.5 8.2C8.4 8.1 8.3 7.9 8.2 7.9L8.5 7.8" />
      </svg>
    </button>
  );
}