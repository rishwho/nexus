import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDetails = ({ job, setView }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userRole, setUserRole] = useState(null);

  // Get user role from local storage or a decoded token on mount
  useEffect(() => {
    const role = localStorage.getItem('user_role'); // Assuming you save role on login
    setUserRole(role);
  }, []);

  if (!job) return <div className="p-20 text-center font-bold text-slate-400">No Job Selected</div>;

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('access_token');
    
    // 1. Check Login
    if (!token) {
      setMessage({ type: "error", text: "Please login to apply." });
      return;
    }

    // 2. Check Role (Frontend Guard)
    if (userRole === 'recruiter') {
      setMessage({ type: "error", text: "Recruiters cannot apply for jobs." });
      return;
    }

    if (!resume) {
      setMessage({ type: "error", text: "Please upload a PDF resume." });
      return;
    }

    setApplying(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('cover_letter', coverLetter);

    try {
       await axios.post(
        `http://localhost:8000/api/jobs/${job.id}/apply/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      setMessage({ type: "success", text: "Application sent successfully!" });
      setApplying(false);
      // Optional: setView('browse') after a delay
    } catch (error) {
      setApplying(false);
      
      // Improved Error Reporting
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const serverError = error.response.data.error || error.response.data.detail || "Server Error";
        setMessage({ type: "error", text: serverError });
      } else {
        setMessage({ type: "error", text: "Cannot connect to Nexus Server. Check your Docker." });
      }
    }
  };

  return (
    <div className="bg-white py-16 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-2 space-y-8">
          <button 
            onClick={() => setView('browse')} 
            className="group text-[#2042e3] font-bold flex items-center gap-2 transition-all"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Search
          </button>

          <div className="card-jg p-10 border border-blue-50 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-black text-[#081828] mb-2 tracking-tight">{job.title}</h1>
                <p className="text-[#2042e3] font-bold text-xl">{job.company_name}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="bg-blue-50 text-[#2042e3] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  {job.job_type}
                </span>
                <p className="text-[10px] font-bold text-slate-300 uppercase">ID: #{job.id}</p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">Job Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                  {job.description}
                </p>
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                  {job.posted_by_name?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Hiring Manager</p>
                  <p className="text-sm font-bold text-[#081828]">{job.posted_by_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Application Sidebar */}
        <div className="space-y-6">
          <div className="card-jg bg-[#081828] p-8 text-white">
            <h3 className="font-bold text-lg mb-4">Quick Facts</h3>
            <div className="space-y-3 opacity-80 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Location</span>
                <span className="font-bold">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Posted On</span>
                <span className="font-bold">{new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* APPLICATION FORM */}
          <div className="card-jg p-8 border border-blue-100 shadow-xl shadow-blue-50">
            <h3 className="font-black text-xl mb-6 text-[#081828] tracking-tight">Apply Now</h3>
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl text-xs font-bold ${
                message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {message.type === 'error' ? '⚠️ ' : '✅ '} {message.text}
              </div>
            )}

            {userRole === 'recruiter' ? (
              <div className="bg-amber-50 p-4 rounded-xl text-amber-700 text-xs font-medium leading-relaxed">
                You are logged in as a <strong>Recruiter</strong>. Please log in with a Seeker account to apply for jobs.
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-2">Resume (PDF Only)</label>
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#2042e3] file:text-white cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-2">Short Pitch</label>
                  <textarea 
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell the recruiter why you're a good fit..."
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-blue-200 outline-none text-sm min-h-[100px] transition-all"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={applying}
                  className={`btn-jg w-full py-4 shadow-lg shadow-blue-200 uppercase tracking-widest text-[10px] font-black ${
                    applying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  {applying ? "Sending..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;