import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#2042e3] font-bold tracking-widest uppercase text-sm">About Nexus</span>
            <h2 className="text-4xl font-black text-[#081828] mt-4 mb-6">Bridging the gap between Recruiters and Employers</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Nexus is a state-of-the-art job portal designed to simplify the recruitment process. Built with a focus on speed, performance, and user experience.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="card-jg">
                <h4 className="text-2xl font-bold text-[#2042e3]">500+</h4>
                <p className="text-slate-500 font-medium">Daily Jobs</p>
              </div>
              <div className="card-jg">
                <h4 className="text-2xl font-bold text-[#2042e3]">12k+</h4>
                <p className="text-slate-500 font-medium">Active Users</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 h-96 rounded-jg-lg flex items-center justify-center">
             <span className="text-[#2042e3] text-8xl font-black opacity-20 italic">NEXUS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;