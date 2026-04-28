import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobBrowse = ({ setView, setSelectedJob }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Unified Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(""); // For Sidebar clicks
  const [selectedTypes, setSelectedTypes] = useState([]); // For Checkboxes

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/');
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 2. Multi-Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
    const matchesCategory = activeCategory === "" || job.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.job_type);

    return matchesSearch && matchesLocation && matchesCategory && matchesType;
  });

  // Toggle for Job Type Checkboxes
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen py-16 animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        
        {/* MEGA SEARCH BAR */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="bg-white border border-blue-50 p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 w-full border-r border-blue-50">
              <span className="text-[#2042e3]">🔍</span>
              <input 
                type="text" 
                placeholder="Job title or company..." 
                className="w-full bg-transparent outline-none text-sm py-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 w-full">
              <span className="text-[#2042e3]">📍</span>
              <input 
                type="text" 
                placeholder="Location..." 
                className="w-full bg-transparent outline-none text-sm py-3"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button className="btn-jg px-10 py-4 rounded-xl">Search</button>
          </div>
          {/* Reset Filters Chip */}
          {(activeCategory || searchQuery || locationQuery || selectedTypes.length > 0) && (
            <button 
              onClick={() => {setActiveCategory(""); setSearchQuery(""); setLocationQuery(""); setSelectedTypes([]);}}
              className="mt-4 text-xs font-bold text-[#2042e3] hover:underline"
            >
              ✕ Clear All Filters
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-10">
          
          {/* SIDEBAR FILTERS */}
          <div className="hidden lg:block space-y-6">
            
            {/* Job Type (Checkbox Logic) */}
            <div className="card-jg p-6 border border-blue-50">
              <h3 className="font-bold text-[#081828] mb-4 text-[10px] uppercase tracking-widest">Job Type</h3>
              <div className="space-y-3 text-slate-600 text-sm font-medium">
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="accent-[#2042e3] w-4 h-4" 
                    /> 
                    <span className={selectedTypes.includes(type) ? "text-[#2042e3]" : ""}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Popular Categories (Click Logic) */}
            <div className="card-jg p-6 border border-blue-50">
              <h3 className="font-bold text-[#081828] mb-4 text-[10px] uppercase tracking-widest text-[#2042e3]">Popular Categories</h3>
              <div className="space-y-3 text-slate-500 text-sm">
                {['IT jobs', 'Sales jobs', 'Marketing jobs', 'Data Science jobs'].map(cat => (
                  <p 
                    key={cat} 
                    onClick={() => setActiveCategory(cat === activeCategory ? "" : cat)}
                    className={`cursor-pointer transition-all font-medium hover:translate-x-1 ${activeCategory === cat ? "text-[#2042e3] font-bold pl-2 border-l-2 border-[#2042e3]" : ""}`}
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>

            {/* Jobs by Location */}
            <div className="card-jg p-6 border border-blue-50">
              <h3 className="font-bold text-[#081828] mb-4 text-[10px] uppercase tracking-widest">Jobs by Location</h3>
              <div className="space-y-3 text-slate-500 text-sm">
                {['Mumbai', 'Bangalore', 'Delhi', 'Remote'].map(loc => (
                  <p 
                    key={loc} 
                    onClick={() => setLocationQuery(loc === locationQuery ? "" : loc)} 
                    className={`cursor-pointer transition-all font-medium flex items-center gap-2 ${locationQuery === loc ? "text-[#2042e3] font-bold" : ""}`}
                  >
                    <span>📍</span> {loc}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* JOBS LIST */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-end mb-8 border-b border-blue-50 pb-6">
              <h2 className="text-3xl font-black text-[#081828]">Results ({filteredJobs.length})</h2>
            </div>

            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <div key={job.id} className="card-jg p-8 flex flex-col md:flex-row justify-between items-center group hover:border-[#2042e3]/30">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#2042e3] font-black group-hover:bg-[#2042e3] group-hover:text-white transition-all">
                    {job.company_name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-[#2042e3]">{job.title}</h3>
                    <p className="text-slate-500 font-semibold text-sm">{job.company_name} • {job.location}</p>
                    <div className="mt-2 flex gap-2">
                      <span className="text-[10px] font-bold text-slate-400 border px-2 py-0.5 rounded">{job.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="bg-blue-50 text-[#2042e3] px-4 py-1 rounded-full text-[10px] font-black uppercase">{job.job_type}</span>
                  <button onClick={() => { setSelectedJob(job); setView('job-details'); }} className="btn-jg px-6 py-2 text-xs">View Details</button>
                </div>
              </div>
            )) : (
              <div className="py-20 text-center text-slate-300 italic">No matching jobs found...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBrowse;