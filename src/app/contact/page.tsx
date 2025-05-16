import React from 'react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us - USA Good Trading',
  description: 'Get in touch with USA Good Trading for wholesale clothing inquiries',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our wholesale clothing products? We&apos;re here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
            <ContactForm />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Address</h3>
                <p className="mt-1 text-gray-600">123 Fashion District, Los Angeles, CA 90015</p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">(909) 687-6383</p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">contact@usagoodtrading.com</p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Business Hours</h3>
                <p className="mt-1 text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM PST</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM PST</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}