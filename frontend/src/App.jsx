import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import About from './components/About';
import Contact from './components/Contact'; 
import JobBrowse from './components/JobBrowse';
import JobDetails from './components/JobDetails';
import BrowseResumes from './components/BrowseResumes'; 
import RecruiterDashboard from './components/RecruiterDashboard';
import SeekerDashboard from './components/EmployerDashboard'; // Renamed for clarity
import Footer from './components/Footer';

function App() {
  // 1. START CLEAN: No dummy data in the initial state
  const [view, setView] = useState('home'); 
  const [user, setUser] = useState(null); 
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]); 
  const [authMode, setAuthMode] = useState('signin'); 

  // 2. PERSISTENCE: Check for a real session on page load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('user_role');
    const username = localStorage.getItem('username');

    if (token && role && username) {
      // Re-set the real user from your database
      setUser({ username, role });
    }
  }, []);

  // 3. LOGOUT: Clear the "ghosts"
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setView('home');
    console.log("NEXUS Session Cleared.");
  };

  // Central Navigation Helper
  const navigate = (newView, data = null) => {
    if (newView === 'login' && data?.mode) {
      setAuthMode(data.mode);
    }
    
    if (newView === 'job-details' && data) {
      setSelectedJob(data);
    }

    setView(newView);
    window.scrollTo(0, 0); 
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#2042e3] selection:text-white flex flex-col font-sans">
      {/* Global Navigation - Pass handleLogout here if needed */}
      <Navbar setView={navigate} user={user} setUser={handleLogout} />

      <main className="grow">
        {/* --- Public Views --- */}
        {view === 'home' && <Home setView={navigate} setJobs={setJobs} />}
        {view === 'about' && <About />}
        {view === 'contact' && <Contact />}
        
        {/* Pass setUser to Auth so it can save the REAL user on login */}
        {view === 'login' && (
          <Auth setUser={setUser} setView={navigate} mode={authMode} />
        )}

        {/* --- Shared/Job Content --- */}
        {view === 'browse' && (
          <JobBrowse 
            setView={navigate} 
            setSelectedJob={setSelectedJob} 
            jobs={jobs} 
          />
        )}

        {view === 'job-details' && (
          <JobDetails 
            job={selectedJob} 
            setView={navigate} 
          />
        )}

        {/* --- Recruiter Specific --- */}
        {view === 'browse-resumes' && <BrowseResumes setView={navigate} />}

        {/* --- Protected Dashboard Views (Role-Based) --- */}
        {view === 'dashboard' && user?.role === 'recruiter' && (
          <RecruiterDashboard user={user} setView={navigate} />
        )}

        {view === 'dashboard' && user?.role === 'seeker' && (
          <SeekerDashboard user={user} setView={navigate} />
        )}
      </main>

      <Footer setView={navigate} />
    </div>
  );
}

export default App;