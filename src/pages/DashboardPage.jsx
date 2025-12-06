import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import JobsList from "../components/dashboard/JobsList";
import JobDescription from "../components/dashboard/JobDescription";
import ResumeUploader from "../components/dashboard/ResumeUploader";
import Modal from "../components/ui/Modal";
import CandidatesDisplay from "../components/dashboard/CandidatesDisplay";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jdText, setJdText] = useState("");
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [loadingJd, setLoadingJd] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Draft Job State
  const [draftJob, setDraftJob] = useState(null); // null = View Mode, object = Draft Mode

  // Tab State
  const [activeTab, setActiveTab] = useState('cards'); // 'cards' or 'table'

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/LoginPage");
  };

  const handleJobSelect = async (job) => {
    setDraftJob(null); // Exit draft mode
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

  const handleNewJobClick = () => {
    setDraftJob({
      title: "",
      jd_text: "",
      files: []
    });
    setSelectedJob(null);
    setJdText("");
  };

  const handleDraftUpdate = (field, value) => {
    setDraftJob(prev => ({
      ...prev,
      [field]: value
    }));
    // Sync local states for UI
    if (field === 'jd_text') setJdText(value);
  };

  const handleCreateJob = async () => {
    if (!draftJob || !draftJob.title || draftJob.files.length < 10) return;

    try {
      const formData = new FormData();
      formData.append('title', draftJob.title);
      formData.append('jd_text', draftJob.jd_text);
      draftJob.files.forEach(file => {
        formData.append('files', file);
      });

      const token = localStorage.getItem('token');

      // Debug: Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post(`${API_BASE_URL}/api/jobs/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Success: Clear draft and refresh list (handled by JobsList triggering select)
      setDraftJob(null);
      // Ideally trigger a refresh in JobsList here, but for now we rely on user interaction or auto-refresh
      // We can force a refresh by passing a trigger prop to JobsList if needed
      window.location.reload(); // Simple refresh for now to show new job
    } catch (err) {
      console.error("Failed to create job:", err);
      if (err.response) {
        console.error("Backend Error Data:", err.response.data);
        console.error("Backend Status:", err.response.status);
        alert(`Failed to create job: ${JSON.stringify(err.response.data)}`);
      } else {
        alert("Failed to create job. Please try again.");
      }
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
            <JobsList
              onSelectJob={handleJobSelect}
              onNewJobClick={handleNewJobClick}
              draftJob={draftJob}
              onDraftTitleChange={(val) => handleDraftUpdate('title', val)}
            />
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

        {/* MAIN CONTENT AREA (Right) - Scrollable Page */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-4 h-full">

            {/* COLUMN 1: Main Work Area (Middle) - Grows to fill space */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">

              {/* 1. Top Row: Square Widgets (JD & Uploader) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                <div className="h-64 w-full">
                  <JobDescription
                    variant="widget"
                    jdText={draftJob ? draftJob.jd_text : jdText}
                    onExpand={() => setIsJdModalOpen(true)}
                    isEditable={!!draftJob}
                  />
                </div>
                <div className="h-64 w-full">
                  <ResumeUploader
                    files={draftJob ? draftJob.files : []}
                    onFilesChange={(files) => handleDraftUpdate('files', files)}
                    onSubmit={handleCreateJob}
                    isEditable={!!draftJob}
                  />
                </div>
                <div className="h-64 w-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium">
                  Stats/Other Widgets Placeholder
                </div>
              </div>

              {/* 3. Tabs & Content Area - Fills remaining space */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Tab Headers (Browser Style) */}
                <div className="flex items-end px-2 gap-1 border-b border-gray-100 overflow-x-auto shrink-0">
                  <button
                    onClick={() => setActiveTab('cards')}
                    className={`px-8 py-3 rounded-t-xl text-sm font-medium transition-all relative -mb-px border-t border-l border-r whitespace-nowrap
                            ${activeTab === 'cards'
                        ? 'bg-white border-gray-100 border-b-white text-indigo-600 z-10'
                        : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}
                  >
                    Cards
                  </button>
                  <button
                    onClick={() => setActiveTab('table')}
                    className={`px-8 py-3 rounded-t-xl text-sm font-medium transition-all relative -mb-px border-t border-l border-r whitespace-nowrap
                            ${activeTab === 'table'
                        ? 'bg-white border-gray-100 border-b-white text-indigo-600 z-10'
                        : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}
                  >
                    Table
                  </button>
                </div>

                {/* Tab Content Container - Fixed Height & Internal Scroll */}
                <div className="w-full shrink-0 bg-white rounded-b-2xl rounded-tr-2xl shadow-sm border border-gray-100 border-t-0 p-4 relative z-0 flex flex-col h-[1200px] overflow-hidden">
                  {activeTab === 'cards' ? (
                    <CandidatesDisplay jobId={selectedJob ? selectedJob.id : null} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <p>Table View Coming Soon</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 2: Stats & Charts (Right) - Fixed Width on Desktop, Full on Mobile */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">

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
          <JobDescription
            variant="full"
            jdText={draftJob ? draftJob.jd_text : jdText}
            onSave={(val) => {
              handleDraftUpdate('jd_text', val);
              setIsJdModalOpen(false);
            }}
            isEditable={!!draftJob}
          />
        </div>
      </Modal>

    </div>
  );
};

export default DashboardPage;
