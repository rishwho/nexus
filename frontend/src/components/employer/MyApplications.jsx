import React from 'react';

const MyApplications = () => {
  const applications = [
    { id: 1, role: "Frontend Developer", company: "TechSurat", date: "Oct 10, 2026", status: "Interview" },
    { id: 2, role: "UI Designer", company: "CreativeGrid", date: "Oct 08, 2026", status: "Pending" },
    { id: 3, role: "NodeJS Intern", company: "BackendPro", date: "Oct 05, 2026", status: "Rejected" },
  ];

  const getStatusStyle = (status) => {
    if (status === 'Interview') return 'bg-green-100 text-green-600';
    if (status === 'Rejected') return 'bg-red-100 text-red-600';
    return 'bg-blue-100 text-[#2042e3]';
  };

  return (
    <div className="card-jg">
      <h2 className="text-2xl font-black text-[#081828] mb-6">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-blue-50 text-slate-400 text-sm">
              <th className="pb-4 font-bold">Job Role</th>
              <th className="pb-4 font-bold">Company</th>
              <th className="pb-4 font-bold">Date Applied</th>
              <th className="pb-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {applications.map((app) => (
              <tr key={app.id} className="group hover:bg-blue-50/30 transition">
                <td className="py-5 font-bold text-[#081828]">{app.role}</td>
                <td className="py-5 text-slate-600">{app.company}</td>
                <td className="py-5 text-slate-400 text-sm">{app.date}</td>
                <td className="py-5">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;