import React from 'react';

const RecruiterProfile = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="card-jg">
        <h2 className="text-2xl font-black text-[#081828] mb-6">Company Settings</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Company Name</label>
            <input type="text" placeholder="Nexus Tech Solutions" className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Website URL</label>
            <input type="text" placeholder="https://nexus.com" className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3]" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-500">Company Description</label>
            <textarea rows="4" placeholder="Briefly describe your company culture and mission..." className="w-full p-4 bg-blue-50/30 rounded-jg border border-blue-50 outline-none focus:ring-2 focus:ring-[#2042e3]"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-jg w-full md:w-auto px-10">Save Company Profile</button>
          </div>
        </form>
      </div>

      <div className="card-jg flex items-center justify-between border-dashed border-2 border-blue-100">
        <div>
          <h4 className="font-bold text-[#081828]">Company Logo</h4>
          <p className="text-xs text-slate-400">PNG or SVG (Square recommended)</p>
        </div>
        <button className="text-[#2042e3] font-bold text-sm border-2 border-[#2042e3] px-6 py-2 rounded-jg hover:bg-blue-50 transition">
          Upload Logo
        </button>
      </div>
    </div>
  );
};

export default RecruiterProfile;