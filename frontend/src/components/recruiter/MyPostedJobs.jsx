import React from 'react';

const MyPostedJobs = () => {
  const myJobs = [
    { id: 1, title: "Python Developer", date: "Oct 10, 2026", applicants: 24, status: "Active" },
    { id: 2, title: "React Specialist", date: "Oct 09, 2026", applicants: 15, status: "Active" },
    { id: 3, title: "Graphic Designer", date: "Oct 01, 2026", applicants: 8, status: "Closed" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black text-[#081828]">Your Active Listings</h2>
        <span className="text-sm font-bold text-[#2042e3] bg-blue-50 px-4 py-1 rounded-full italic">
          Total: {myJobs.length} Jobs
        </span>
      </div>

      <div className="grid gap-4">
        {myJobs.map(job => (
          <div key={job.id} className="card-jg flex flex-col md:flex-row justify-between items-center group">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-[#081828] group-hover:text-[#2042e3] transition">{job.title}</h3>
              <p className="text-slate-400 text-sm font-medium">Posted on {job.date}</p>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-center px-6 border-r border-blue-50">
                <p className="text-xl font-black text-[#081828]">{job.applicants}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Applicants</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-[#2042e3] transition">✏️</button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPostedJobs;