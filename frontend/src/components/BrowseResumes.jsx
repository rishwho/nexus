// Fixed: Removed the unused { useState } to clear the ESLint error
import React from 'react';

const BrowseResumes = ({ setView }) => {
  const candidates = [
    { 
      id: 1, 
      name: "Ronni", 
      role: "Full Stack Developer", 
      location: "Surat, India", 
      exp: "2 Years", 
      skills: ["React", "Django", "PostgreSQL"],
      imgLetter: "R"
    },
    { 
      id: 2, 
      name: "Anjali Sharma", 
      role: "UI/UX Designer", 
      location: "Mumbai, India", 
      exp: "3 Years", 
      skills: ["Figma", "Tailwind", "Adobe XD"],
      imgLetter: "A"
    },
    { 
      id: 3, 
      name: "Sahil Varma", 
      role: "Backend Engineer", 
      location: "Remote", 
      exp: "5 Years", 
      skills: ["Python", "FastAPI", "Docker"],
      imgLetter: "S"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16 animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 border-b border-blue-50 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#081828] tracking-tight">Browse Talent</h1>
            <p className="text-slate-400 font-medium mt-2">Connect with Surat's most skilled professionals.</p>
          </div>
          <div className="bg-blue-50 px-6 py-2 rounded-full">
            <span className="text-[#2042e3] font-bold text-sm">{candidates.length} Candidates Found</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* Left Sidebar: Filters */}
          <div className="hidden lg:block space-y-8">
            <div className="card-jg p-6">
              <h3 className="font-bold text-[#081828] mb-4 text-sm uppercase tracking-widest">Experience Level</h3>
              <div className="space-y-3 text-slate-600 text-sm">
                {['Fresher', '1-3 Years', '3-5 Years', '5+ Years'].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer hover:text-[#2042e3] transition">
                    <input type="checkbox" className="accent-[#2042e3] w-4 h-4" /> {level}
                  </label>
                ))}
              </div>
            </div>

            <div className="card-jg p-6">
              <h3 className="font-bold text-[#081828] mb-4 text-sm uppercase tracking-widest">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'React', 'Java', 'UI Design', 'SQL'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-50 text-[#2042e3] rounded-md text-[10px] font-black cursor-pointer hover:bg-[#2042e3] hover:text-white transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content: Talent Cards */}
          <div className="lg:col-span-3 space-y-6">
            {candidates.map((person) => (
              <div key={person.id} className="card-jg p-8 flex flex-col md:flex-row justify-between items-center group hover:border-[#2042e3]/30 transition-all">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2042e3] font-black text-2xl border-2 border-white shadow-sm group-hover:bg-[#2042e3] group-hover:text-white transition-colors duration-300">
                    {person.imgLetter}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#081828] group-hover:text-[#2042e3] transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-[#2042e3] font-bold text-sm mb-1">{person.role}</p>
                    <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
                      📍 {person.location} • 💼 {person.exp} Experience
                    </p>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 flex flex-col items-end gap-4 w-full md:w-auto">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {person.skills.map(skill => (
                      <span key={skill} className="bg-slate-50 text-slate-500 border border-slate-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setView('dashboard')} 
                    className="btn-jg px-8 py-2 text-xs"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseResumes;