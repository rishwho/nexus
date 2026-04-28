import React, { useState } from 'react';
import EmployerHome from './employer/EmployerHome';
import EmployerProfile from './employer/EmployerProfile';
import MyApplications from './employer/MyApplications';

const icons = {
  home: "🏠",
  profile: "👤",
  applied: "📑",
  logout: "🚪"
};

const EmployerDashboard = ({ setUser, user, setView }) => {
  const [activeSubPage, setActiveSubPage] = useState('home');

  const menuItems = [
    { id: 'home', name: 'Dashboard Home', icon: icons.home },
    { id: 'applied', name: 'Applied Jobs', icon: icons.applied },
    { id: 'profile', name: 'My Profile', icon: icons.profile }, // Changed to "My Profile" for job seeker
  ];

  return (
    <div className="flex min-h-[90vh] bg-white -mt-4 border-t border-blue-50">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white p-6 flex flex-col border-r border-blue-50">
        <div className="text-xs font-black text-[#2042e3] tracking-widest mb-10 px-3">
          EMPLOYER HUB
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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Logged in as</p>
            <p className="text-xs font-bold text-slate-700 truncate">{user?.email || "seeker@nexus.com"}</p>
          </div>
          <button 
            onClick={() => {
              setUser(null);
              setView('home'); // Send user back to home on logout
            }} 
            className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 font-bold hover:text-red-600 transition text-sm"
          >
            <span>{icons.logout}</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 bg-white">
        <header className="mb-10 pb-6 border-b border-blue-50 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-[#081828] tracking-tight capitalize">
              {activeSubPage === 'home' ? 'Overview' : activeSubPage.replace('-', ' ')}
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">Manage your applications and profile status.</p>
          </div>
          <div className="text-right">
             <span className="bg-blue-50 text-[#2042e3] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Active Session
             </span>
          </div>
        </header>

        <div className="sub-page-container animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeSubPage === 'home' && <EmployerHome user={user} setView={setView} />}
          {activeSubPage === 'applied' && <MyApplications />}
          {activeSubPage === 'profile' && <EmployerProfile />}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;