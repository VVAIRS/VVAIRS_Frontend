import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import JobsList from "../components/dashboard/JobsList";
import JobDescription from "../components/dashboard/JobDescription";
import ResumeUploader from "../components/dashboard/ResumeUploader";
import Modal from "../components/ui/Modal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jdText, setJdText] = useState("");
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [loadingJd, setLoadingJd] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/LoginPage");
  };

  const handleJobSelect = async (job) => {
    setSelectedJob(job);
    // Optimistically set JD if available in the list object
    if (job.jd_text) {
      setJdText(job.jd_text);
    } else {
      setJdText(""); // Clear while loading
    }

    // Fetch full job details to get JD if missing or to ensure freshness
    try {
      setLoadingJd(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/jobs/${job.id}/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.jd_text) {
        setJdText(response.data.jd_text);
      } else if (response.data && response.data.description) {
        setJdText(response.data.description);
      }
    } catch (err) {
      console.error("Failed to fetch job details:", err);
    } finally {
      setLoadingJd(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased overflow-x-hidden">
      <Navbar isLoggedIn={true} onLogout={handleLogout} />

      {/* Main Container - Full Width */}
      <main className="w-full h-[calc(100vh-4rem)] flex pt-16 relative">

        {/* SIDEBAR: Jobs List (Left) - Collapsible */}
        <aside
          className={`${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'} bg-white border-r border-gray-200 h-full overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out relative`}
        >
          <div className="w-80 h-full">
            <JobsList onSelectJob={handleJobSelect} />
          </div>
        </aside>

        {/* Toggle Button (Floating or attached) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-20 left-4 z-10 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-600 transition-all"
          style={{ left: isSidebarOpen ? '20.5rem' : '1rem' }}
        >
          {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </button>

        {/* MAIN CONTENT AREA (Right) - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 transition-all duration-300">
          <div className="flex gap-6 h-full">

            {/* COLUMN 1: Main Work Area (Middle) - Grows to fill space */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">

              {/* 1. Top Row: Square Widgets (JD & Uploader) */}
              <div className="grid grid-cols-3 gap-6">
                <div className="aspect-square w-full">
                  <JobDescription variant="widget" jdText={jdText} onExpand={() => setIsJdModalOpen(true)} />
                </div>
                <div className="aspect-square w-full">
                  <ResumeUploader />
                </div>
                <div className="aspect-square w-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
                  Stats/Other Widgets Placeholder
                </div>
              </div>

              {/* 2. Placeholder: Tabs (Cards, Table, Flagged) */}
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center text-gray-400 text-sm font-medium">
                Tabs Placeholder
              </div>

              {/* 3. User Table - Takes remaining vertical space */}
              <div className="flex-1 min-h-[500px] bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 font-medium">
                User Table (Real Data Here)
              </div>
            </div>

            {/* COLUMN 2: Stats & Charts (Right) - Fixed Width */}
            <div className="w-80 flex-shrink-0 flex flex-col gap-6">

              {/* 1. Placeholder: Top Stats (Total, Completed, Credits) */}
              <div className="h-24 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
                Top Stats Placeholder
              </div>

              {/* 2. Placeholder: Pie Chart (Resume Score) */}
              <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
                Pie Chart Placeholder
              </div>

              {/* 3. Placeholder: Bar Chart (Score Distribution) */}
              <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
                Bar Chart Placeholder
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* JD Modal */}
      <Modal
        isOpen={isJdModalOpen}
        onClose={() => setIsJdModalOpen(false)}
        title="Job Description"
      >
        <div className="h-[60vh]">
          <JobDescription variant="full" jdText={jdText} onJdChange={setJdText} />
        </div>
      </Modal>

    </div>
  );
};

export default DashboardPage;
