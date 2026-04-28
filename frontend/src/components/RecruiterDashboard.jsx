import React, { useState } from 'react';
// Updated paths to look inside the 'recruiter' folder
import PostJobForm from './recruiter/PostJobForm';
import MyPostedJobs from './recruiter/MyPostedJobs';
import RecruiterProfile from './recruiter/RecruiterProfile';

const RecruiterDashboard = ({ setUser, user, setView }) => {
  const [activeSubPage, setActiveSubPage] = useState('posted');

  const menuItems = [
    { id: 'posted', name: 'My Posted Jobs', icon: "💼" },
    { id: 'post', name: 'Post New Job', icon: "➕" },
    { id: 'profile', name: 'Company Profile', icon: "🏢" },
  ];

  return (
    <div className="flex min-h-[90vh] bg-white border-t border-blue-50">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white p-6 flex flex-col border-r border-blue-50">
        <div className="text-xs font-black text-[#2042e3] tracking-widest mb-10 px-3 uppercase">
          Recruitment Hub
        </div>
        
        <nav className="space-y-2 grow">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSubPage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition text-sm ${
                activeSubPage === item.id 
                ? 'bg-[#2042e3] text-white shadow-lg shadow-blue-100' 
                : 'text-slate-500 hover:bg-blue-50 hover:text-[#2042e3]'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-blue-50">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Admin Panel</p>
            <p className="text-xs font-bold text-slate-700 truncate">{user?.email || "admin@nexus.com"}</p>
          </div>
          <button 
            onClick={() => {
              setUser(null);
              setView('home');
            }} 
            className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 font-bold hover:text-red-600 transition text-sm"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 bg-white overflow-y-auto">
        <header className="mb-10 pb-6 border-b border-blue-50 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-[#081828] tracking-tight">
              {activeSubPage === 'posted' && 'Active Vacancies'}
              {activeSubPage === 'post' && 'Create Job Post'}
              {activeSubPage === 'profile' && 'Company Settings'}
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Manage your recruitment workflow and company branding.
            </p>
          </div>
          <div className="hidden sm:block">
             <span className="bg-blue-50 text-[#2042e3] px-4 py-2 rounded-jg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                Recruiter Mode
             </span>
          </div>
        </header>

        {/* Content Container */}
        <div className="sub-page-container animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeSubPage === 'posted' && <MyPostedJobs />}
          {activeSubPage === 'post' && <PostJobForm setActiveSubPage={setActiveSubPage} />}
          {activeSubPage === 'profile' && <RecruiterProfile />}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;