'use client';

import { useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function Testimonials() {
  // Sample testimonials data - in a real app, this would come from a database
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Robert Smith',
      role: 'Fashion Retailer',
      content: 'USA Good Trading has been our go-to supplier for 5 years. Their quality and reliability are unmatched in the industry.',
      avatar: 'R',
    },
    {
      id: '2',
      name: 'Jennifer Lee',
      role: 'Boutique Owner',
      content: 'The variety of products and competitive pricing keep me coming back. Their team is always responsive and helpful.',
      avatar: 'J',
    },
    {
      id: '3',
      name: 'Michael Johnson',
      role: 'Online Store Manager',
      content: 'Working with USA Good Trading has helped us scale our business significantly. Their wholesale prices allow for excellent margins.',
      avatar: 'M',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      role: 'Department Store Buyer',
      content: 'The quality control is impressive. We rarely have issues with the products we source from USA Good Trading.',
      avatar: 'S',
    },
    {
      id: '5',
      name: 'David Chen',
      role: 'Clothing Distributor',
      content: 'Fast shipping and excellent communication. They understand the wholesale business better than most suppliers I\'ve worked with.',
      avatar: 'D',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3);

  const nextTestimonials = () => {
    setActiveIndex((prev) => 
      prev + 3 >= testimonials.length ? 0 : prev + 3
    );
  };

  const prevTestimonials = () => {
    setActiveIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3
    );
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
        
        {testimonials.length > 3 && (
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonials}
              className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonials}
              className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}