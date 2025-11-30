import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">

          {/* COLUMN 1: Jobs List (Left) - approx 25% */}
          <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-sm h-full overflow-hidden">
            <JobsList onSelectJob={handleJobSelect} />
          </div>

          {/* COLUMN 2: Main Work Area (Middle) - approx 40% */}
          <div className="col-span-12 lg:col-span-5 h-full flex flex-col gap-6">

            {/* 1. Top Row: JD Widget & Resume Uploader (Side-by-Side) */}
            <div className="h-1/2 grid grid-cols-2 gap-4">
              <JobDescription variant="widget" jdText={jdText} onExpand={() => setIsJdModalOpen(true)} />
              <ResumeUploader />
            </div>

            {/* 2. Placeholder: Tabs (Cards, Table, Flagged) */}
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center text-gray-400 text-sm font-medium">
              Tabs Placeholder
            </div>

            {/* 3. Placeholder: User Table */}
            <div className="flex-1 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
              User Table Placeholder
            </div>
          </div>

          {/* COLUMN 3: Stats & Charts (Right) - approx 35% */}
          <div className="col-span-12 lg:col-span-4 h-full flex flex-col gap-6">

            {/* 1. Placeholder: Top Stats (Total, Completed, Credits) */}
            <div className="h-24 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
              Top Stats Placeholder
            </div>

            {/* 2. Placeholder: Pie Chart (Resume Score) */}
            <div className="h-64 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
              Pie Chart Placeholder
            </div>

            {/* 3. Placeholder: Bar Chart (Score Distribution) */}
            <div className="h-48 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
              Bar Chart Placeholder
            </div>

            {/* 4. Placeholder: Line Chart (Resumes Over Time) */}
            <div className="flex-1 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
              Line Chart Placeholder
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
