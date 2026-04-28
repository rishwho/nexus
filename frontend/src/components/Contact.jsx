import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* 1. HERO BANNER */}
      <section className="bg-[#2042e3] text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl font-black mb-1 leading-tight tracking-tight">Contact Us</h1>
            <div className="w-16 h-1 bg-white mb-6"></div>
            <p className="opacity-90 text-sm leading-relaxed mb-10 text-slate-100 max-w-lg">
              Business plan draws on a wide range of knowledge from different business disciplines. Business draws on a wide range of different business.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Left Side: Contact Form (Sizing Fixed) */}
          <div className="md:col-span-2 space-y-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="contact-input-jg" 
                  required 
                />
              </div>

              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="Your Subject" 
                  className="contact-input-jg" 
                />
              </div>

              <div className="w-full">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="contact-input-jg" 
                  required 
                />
              </div>

              <div className="w-full">
                <input 
                  type="tel" 
                  placeholder="Your Phone" 
                  className="contact-input-jg" 
                />
              </div>

              <div className="md:col-span-2 w-full">
                <textarea 
                  placeholder="Your Message" 
                  rows="6" 
                  className="contact-input-jg h-auto py-5 resize-none" 
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-2">
                <button type="submit" className="btn-jg px-12 py-4 shadow-lg shadow-blue-100">
                  Submit Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Contact Information */}
          <aside className="space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-[#081828]">Contact Information</h2>
              <p className="text-slate-500 text-sm">Business consulting excepteur sint occaecat cupidatat consulting non proident.</p>
            </div>
            
            <div className="space-y-6 text-slate-700 font-medium">
              <div className="flex gap-5 items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2042e3]">📞</div>
                <p className="text-sm">+522 672-452-1120</p>
              </div>
              <div className="flex gap-5 items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2042e3]">✉️</div>
                <p className="text-sm">example@yourwebsite.com</p>
              </div>
              <div className="flex gap-5 items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2042e3]">📍</div>
                <p className="text-sm">KA-62/1, New York.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;