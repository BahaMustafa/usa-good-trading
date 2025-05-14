import ContactForm from '@/components/ContactForm';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">About USA Good Trading</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Founded over 14 years ago, USA Good Trading has established itself as a trusted name in the wholesale clothing industry. 
            What began as a small family business has grown into a reliable supplier for retailers across the United States.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Our commitment to quality, competitive pricing, and exceptional customer service has allowed us to build lasting relationships 
            with our clients and expand our product offerings year after year.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At USA Good Trading, our mission is to provide high-quality wholesale clothing at competitive prices while maintaining 
            the highest standards of customer service. We believe in building long-term relationships with our clients based on trust, 
            reliability, and mutual success.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is the minimum order quantity?</h3>
              <p className="text-gray-700">Please contact us for specific details about the products you&apos;re interested in.</p>
              </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-700">Yes, we ship to select international destinations. Shipping costs and delivery times vary by location.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-700">We accept major credit cards, wire transfers, and PayPal for wholesale orders.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Can I request samples before placing a bulk order?</h3>
              <p className="text-gray-700">Yes, we offer sample orders for qualified businesses. Sample costs may apply and will be credited toward your first bulk order.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
          We&apos;re always happy to hear from potential clients and answer any questions you might have about our products or services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (909) 687-6383
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@usagoodtrading.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}