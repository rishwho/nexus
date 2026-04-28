import React from 'react';

const EmployerHome = ({ user, setView }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#2042e3] rounded-jg-lg p-10 text-white relative overflow-hidden shadow-jg-hero">
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2">Welcome back, {user?.name || 'Job Seeker'}!</h1>
          <p className="opacity-90 max-w-md">You have 3 upcoming interviews this week. Keep up the great work!</p>
          <button 
            onClick={() => setView('browse')}
            className="mt-6 bg-white text-[#2042e3] px-8 py-3 rounded-jg font-bold text-sm hover:bg-blue-50 transition"
          >
            Explore New Jobs
          </button>
        </div>
        <div className="absolute right-10 -bottom-5 text-[150px] opacity-10 font-black italic select-none">
          NEXUS
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Applied Jobs', count: '12', color: 'text-blue-600' },
          { label: 'Interviews', count: '03', color: 'text-green-600' },
          { label: 'Saved', count: '08', color: 'text-purple-600' }
        ].map((stat, i) => (
          <div key={i} className="card-jg text-center">
            <p className="text-slate-400 font-bold text-xs uppercase mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerHome;