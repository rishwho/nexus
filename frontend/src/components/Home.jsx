import React from 'react';
import JobSearch from './JobSearch';

const Home = ({ setView }) => {
  return (
    <div className="bg-white">
      <section className="pt-24 pb-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#081828] mb-6 leading-tight">
            Find Your Career <br /> 
            <span className="text-[#2042e3]">To Make a Better Life</span>
          </h1>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto">
            Connecting top talent with global recruiters. Search through thousands of listings instantly.
          </p>

          {/* If JobSearch also needs setView, you can pass it there too */}
          <JobSearch setView={setView} />

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="text-slate-400">Popular:</span>
            {['Development', 'Design', 'Banking', 'Android'].map((tag) => (
              <span 
                key={tag} 
                // Now 'setView' is being read/used here:
                onClick={() => setView('home')} 
                className="text-slate-600 hover:text-[#2042e3] cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;