import React from 'react';

const Footer = ({ setView }) => {
  return (
    <footer className="bg-white border-t border-blue-50 pt-16 animate-in fade-in duration-700">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* TOP SECTION: APP DOWNLOAD BANNER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-black text-[#081828] mb-3 leading-tight">Download Our Best Apps</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the best job portal on the go. Access your dashboard and apply to jobs instantly with our mobile applications.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn-jg flex items-center gap-3 px-8 py-4">
              <span className="text-xl">🍎</span> App Store
            </button>
            <button className="btn-jg flex items-center gap-3 px-8 py-4">
              <span className="text-xl">▶️</span> Google Play
            </button>
          </div>
        </div>

        <hr className="border-blue-50 mb-16" />

        {/* MIDDLE SECTION: BRAND & NEWSLETTER ONLY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-[#081828] tracking-tight cursor-pointer" onClick={() => setView('home')}>
              NEX<span className="text-[#2042e3]">US</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting top talent with the world's most innovative companies. Start building your future today with NEXUS.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-[#081828] font-bold">Address: <span className="font-medium text-slate-500">555 Wall Street, USA, NY</span></p>
              <p className="text-[#081828] font-bold">Email: <span className="font-medium text-slate-500">example@nexus.com</span></p>
              <p className="text-[#081828] font-bold">Call: <span className="font-medium text-slate-500">555-555-1234</span></p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3">
               {['in', 'p'].map(social => (
                 <div key={social} className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold hover:bg-[#2042e3] hover:text-white transition-all cursor-pointer uppercase shadow-sm">
                   {social}
                 </div>
               ))}
            </div>
          </div>

          {/* Column 2: Newsletter (Aligned to the Right) */}
          <div className="space-y-6 lg:ml-auto w-full max-w-md">
            <h4 className="font-black text-[#081828] uppercase tracking-wider text-xs">Join Our Newsletter</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe to get the latest jobs posted, career advice, and industry updates directly in your inbox.
            </p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-15 px-5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#2042e3] transition-all text-sm font-medium"
              />
              <button className="btn-jg w-full py-4 shadow-lg shadow-blue-100">
                Subscribe Now!
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-blue-50 py-8 flex justify-between items-center">
          <p className="text-slate-400 text-xs font-medium">© 2026 <span className="text-[#2042e3] font-bold">NEXUS</span>. All Rights Reserved.</p>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="w-10 h-10 bg-[#2042e3] text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;