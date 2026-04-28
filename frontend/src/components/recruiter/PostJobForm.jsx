import React, { useState } from 'react';

const PostJobForm = ({ setActiveSubPage }) => {
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full Time', salary: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
    // Logic to save job would go here
    setActiveSubPage('posted'); // Redirect to list after posting
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="card-jg p-8">
        <h2 className="text-2xl font-black text-[#081828] mb-8">Post a New Vacancy</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Job Title</label>
            <input 
              type="text" required placeholder="e.g. Senior Java Developer"
              className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3] transition"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Salary Range</label>
            <input 
              type="text" placeholder="e.g. $60k - $80k"
              className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3]"
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Job Type</label>
            <select className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3] font-bold text-slate-700">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Location</label>
            <input 
              type="text" placeholder="e.g. Mumbai, Surat, or Remote"
              className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3]"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-500">Job Description</label>
            <textarea 
              rows="5" placeholder="Outline responsibilities and requirements..."
              className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3]"
            ></textarea>
          </div>
          <div className="md:col-span-2 pt-4">
            <button type="submit" className="btn-jg w-full md:w-auto px-12 py-4">Publish Job Posting</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;