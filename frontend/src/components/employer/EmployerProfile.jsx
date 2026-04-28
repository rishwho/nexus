import React from 'react';

const EmployerProfile = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="card-jg">
        <h2 className="text-2xl font-black text-[#081828] mb-6">Profile Settings</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Full Name</label>
            <input type="text" placeholder="Ronni" className="w-full p-3 bg-blue-50/50 rounded-jg outline-none focus:ring-2 focus:ring-[#2042e3]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500">Professional Title</label>
            <input type="text" placeholder="Full Stack Developer" className="w-full p-3 bg-blue-50/50 rounded-jg outline-none focus:ring-2 focus:ring-[#2042e3]" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-500">Bio</label>
            <textarea rows="4" className="w-full p-3 bg-blue-50/50 rounded-jg outline-none focus:ring-2 focus:ring-[#2042e3]"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-jg w-full md:w-auto">Update Profile</button>
          </div>
        </form>
      </div>

      <div className="card-jg border-dashed border-2 border-blue-200 bg-blue-50/20 text-center py-10">
        <p className="text-[#2042e3] font-bold mb-2">Upload New Resume</p>
        <p className="text-slate-400 text-sm">PDF or DOCX (Max 5MB)</p>
        <input type="file" className="hidden" id="resume-upload" />
        <label htmlFor="resume-upload" className="mt-4 inline-block btn-jg cursor-pointer">Choose File</label>
      </div>
    </div>
  );
};

export default EmployerProfile;