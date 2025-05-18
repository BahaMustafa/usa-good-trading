'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Testimonial } from '@/types/testimonial';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = collection(db, 'testimonials');
        const q = query(testimonialsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        const testimonialsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Testimonial[];
        
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
  
  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        {testimonials.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg">New launch — early customers will be featured here soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">\"{
testimonial.message}\"</p>
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
          </>
        )}
      </div>
    </section>
  );
}