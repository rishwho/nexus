import React, { useState } from 'react';

const JobSearch = ({ setJobs, setView }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // 1. In the future, you will fetch data from Django here.
    // 2. For now, we call setJobs to satisfy ESLint and simulate a search.
    if (setJobs) {
      setJobs([]); // Passing an empty array or dummy data
    }
    
    // 3. Navigate to the browse page
    if (setView) setView('browse');
    
    console.log("Searching for:", keyword, location);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-3 rounded-jg shadow-jg-hero flex flex-col md:flex-row items-center gap-2 border border-blue-50">
      <div className="flex-1 flex items-center px-4 w-full border-r border-blue-50">
        <span className="text-[#2042e3] mr-3 font-bold">What</span>
        <input 
          type="text" 
          placeholder="Job titles, keywords..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full py-4 outline-none text-[#081828] font-medium placeholder:text-slate-300"
        />
      </div>
      
      <div className="flex-1 flex items-center px-4 w-full">
        <span className="text-[#2042e3] mr-3 font-bold">Where</span>
        <input 
          type="text" 
          placeholder="Location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full py-4 outline-none text-[#081828] font-medium placeholder:text-slate-300"
        />
      </div>

      <button 
        onClick={handleSearch}
        className="btn-jg w-full md:w-auto h-full py-4 px-12"
      >
        Search
      </button>
    </div>
  );
};

export default JobSearch;