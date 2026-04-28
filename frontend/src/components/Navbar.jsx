import React, { useState, useRef } from 'react';

const Navbar = ({ setView, user, setUser }) => {
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowJobsDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowJobsDropdown(false);
    }, 200);
  };

  const handleDashboardClick = () => {
    if (user) {
      setView('dashboard');
    } else {
      setView('login', { mode: 'signup' });
    }
  };

  const categories = [
    { title: "Popular categories", items: ["IT jobs", "Sales jobs", "Marketing jobs", "Data Science jobs", "HR jobs", "Engineering jobs"] },
    { title: "Jobs in demand", items: ["Fresher jobs", "MNC jobs", "Remote jobs", "Work from home jobs", "Walk-in jobs", "Part-time jobs"] },
    { title: "Jobs by location", items: ["Jobs in Delhi", "Jobs in Mumbai", "Jobs in Bangalore", "Jobs in Hyderabad", "Jobs in Chennai", "Jobs in Pune"] }
  ];

  return (
    <nav className="bg-white border-b border-blue-50 sticky top-0 z-[100] py-4 shadow-sm">
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-black text-[#081828] cursor-pointer tracking-tight" onClick={() => setView('home')}>
            NEX<span className="text-[#2042e3]">US</span>
          </h1>
          
          <ul className="hidden lg:flex gap-8 font-semibold text-slate-600 text-sm h-full items-center">
            
            {/* 1. Dashboard */}
            <li 
              className={`cursor-pointer transition-colors ${user ? 'text-[#2042e3]' : 'hover:text-[#2042e3]'}`}
              onClick={handleDashboardClick}
            >
              Dashboard
            </li>

            {/* 2. Find Jobs (NON-CLICKABLE TRIGGER) */}
            {(!user || user.role === 'employer') ? (
              <li 
                className="relative py-2 flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Removed setView('browse') from here - It only opens the menu now */}
                <div className={`flex items-center gap-1 transition-colors cursor-default ${showJobsDropdown ? 'text-[#2042e3]' : ''}`}>
                  Find Jobs
                  <span className={`text-[10px] transition-transform duration-300 ${showJobsDropdown ? 'rotate-180' : ''}`}>▼</span>
                </div>

                {showJobsDropdown && (
                  <>
                    <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
                    <div 
                      className="absolute top-[35px] left-0 w-[750px] bg-white shadow-2xl rounded-3xl border border-blue-50 p-10 grid grid-cols-3 gap-10 animate-in fade-in zoom-in-95 duration-200 z-[110]"
                      onMouseEnter={handleMouseEnter}
                    >
                      {categories.map((cat, idx) => (
                        <div key={idx} className={`${idx !== 2 ? 'border-r border-blue-50' : ''} pr-6`}>
                          <h4 className="text-[#081828] font-black text-base mb-6 tracking-tight">{cat.title}</h4>
                          <ul className="space-y-4">
                            {cat.items.map((item, i) => (
                              <li 
                                key={i} 
                                className="text-slate-500 hover:text-[#2042e3] text-sm font-medium transition-all cursor-pointer hover:translate-x-1"
                                onClick={() => { 
                                  setView('browse'); 
                                  setShowJobsDropdown(false); 
                                }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </li>
            ) : (
                <li className="hover:text-[#2042e3] cursor-pointer transition-colors" onClick={() => setView('browse-resumes')}>Browse Talent</li>
            )}

            {/* 3. About Us */}
            <li className="hover:text-[#2042e3] cursor-pointer transition-colors" onClick={() => setView('about')}>About Us</li>
            
            {/* 4. Contact */}
            <li className="hover:text-[#2042e3] cursor-pointer transition-colors" onClick={() => setView('contact')}>Contact</li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <button 
                onClick={() => { setUser(null); setView('home'); }} 
                className="text-red-500 font-bold text-sm hover:text-red-700 transition-colors"
            >
                Logout
            </button>
          ) : (
            <>
              <button onClick={() => setView('login', { mode: 'signin' })} className="text-[#081828] font-bold text-sm px-4 hover:text-[#2042e3] transition-colors">Sign In</button>
              <button onClick={() => setView('login', { mode: 'signup' })} className="btn-jg px-6 py-2 text-sm">Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;