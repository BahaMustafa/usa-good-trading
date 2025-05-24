'use client';

import { useState, useEffect } from 'react';

export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior - hide when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <a
      href="https://wa.me/19096876383"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      aria-label="Contact us on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-7 h-7"
      >
        <path 
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        />
        <path 
          d="M13.359 20.898c-2.024.09-4.027-.43-5.767-1.495l-.414-.249-4.292 1.125 1.146-4.183-.274-.436a10.856 10.856 0 01-1.654-5.795c.002-6.015 4.894-10.907 10.909-10.907 2.915.001 5.658 1.136 7.71 3.193 2.053 2.056 3.183 4.797 3.18 7.71-.003 6.015-4.895 10.91-10.91 10.91l-.017-.001-.017.001z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <span className="ml-2 font-medium hidden md:inline">Chat with us</span>
    </a>
  );
}