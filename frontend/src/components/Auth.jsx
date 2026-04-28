import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = ({ setUser, setView, mode }) => {
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');
  const [role, setRole] = useState('seeker'); // Default to seeker
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSignUp(mode === 'signup');
    setError(""); 
  }, [mode]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isSignUp 
      ? 'http://localhost:8000/api/register/' 
      : 'http://localhost:8000/api/login/';

    // Matches your Django User model fields
    const payload = isSignUp 
      ? { email, password, role, full_name: fullName }
      : { email, password };

    try {
      const response = await axios.post(endpoint, payload);

      // --- 1. PERSISTENCE ---
      // Save real backend data to LocalStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('user_role', response.data.role);
      localStorage.setItem('username', response.data.username);

      // --- 2. UPDATE APP STATE ---
      // This sends the REAL user object to App.jsx
      setUser({
        username: response.data.username,
        role: response.data.role
      });
      
      // --- 3. DYNAMIC NAVIGATION ---
      // Recruiter -> Dashboard | Seeker -> Job Browse
      if (response.data.role === 'recruiter') {
        setView('dashboard');
      } else {
        setView('browse');
      }

    } catch (err) {
      if (err.response) {
        // Handle "Account already exists" or "Incorrect password"
        const backendError = err.response.data.error || "Authentication failed.";
        setError(backendError);
      } else {
        setError("NEXUS Server unreachable. Please verify Docker is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-jg shadow-2xl border border-blue-50">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#081828] mb-2 tracking-tight">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            {isSignUp ? 'Start your professional journey.' : 'Access your Nexus dashboard.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 text-xs font-bold uppercase tracking-widest animate-in fade-in zoom-in-95">
            ⚠️ {error}
            {error.includes("already exists") && (
               <span 
                className="block mt-2 text-[#2042e3] cursor-pointer underline"
                onClick={() => setIsSignUp(false)}
               >
                 Try Signing In instead?
               </span>
            )}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all" 
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Email</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all" 
            />
          </div>
          
          {isSignUp && (
            <div className="py-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block text-center">I am joining as a...</label>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setRole('recruiter')} 
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${role === 'recruiter' ? 'bg-[#2042e3] text-white shadow-lg shadow-blue-100 border-[#2042e3]' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
                >
                  Recruiter
                </button>
                <button 
                  type="button" 
                  onClick={() => setRole('seeker')} 
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${role === 'seeker' ? 'bg-[#2042e3] text-white shadow-lg shadow-blue-100 border-[#2042e3]' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
                >
                  Job Seeker
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`btn-jg w-full py-4 mt-4 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isSignUp ? 'Register Account' : 'Sign In to Nexus'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-sm text-slate-500 font-medium">
            {isSignUp ? "Already a member?" : "New to Nexus?"}{' '}
            <span 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }} 
              className="text-[#2042e3] font-bold cursor-pointer hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;