import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import JobsList from "../components/dashboard/JobsList";
import JobDescription from "../components/dashboard/JobDescription";
import ResumeUploader from "../components/dashboard/ResumeUploader";
import Modal from "../components/ui/Modal";
import CandidatesDisplay from "../components/dashboard/CandidatesDisplay";
import CandidateTable from "../components/dashboard/CandidateTable";
import StatusPieChart from "../components/dashboard/StatusPieChart";

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

  // Upload Pipeline State
  const [uploadState, setUploadState] = useState({
    stage: 'idle', // 'idle' | 'processing' | 'completed'
    progress: { current: 0, total: 0 }
  });

  // Smart Polling: Track loaded candidates to know when to stop
  const [loadedCandidateCount, setLoadedCandidateCount] = useState(0);

  // Real-Time Data Refresh Trigger
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  // SMART POLLING: Check for completion
  React.useEffect(() => {
    let interval;
    const isActive = uploadState.stage === 'processing' || uploadState.stage === 'uploading' || uploadState.stage === 'completed';

    if (isActive) {
      // Check if we have all the data we expect
      if (uploadState.progress.total > 0 && loadedCandidateCount >= uploadState.progress.total) {
        console.log(`[DEBUG] Smart Polling: All ${loadedCandidateCount}/${uploadState.progress.total} candidates loaded. Stopping.`);
        setUploadState(prev => ({ ...prev, stage: 'idle' }));
        return;
      }

      interval = setInterval(() => {
        console.log(`[DEBUG] Polling: Refreshing data... (${loadedCandidateCount}/${uploadState.progress.total})`);
        setDataRefreshTrigger(prev => prev + 1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [uploadState.stage, loadedCandidateCount, uploadState.progress.total]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/LoginPage");
  };

  // --- CANDIDATES STATE (Lifted Up) ---
  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  // Fetch Candidates when job selected or refresh triggered
  React.useEffect(() => {
    if (selectedJob?.id) {
      fetchCandidates(selectedJob.id, candidates.length === 0);
      // Fetch fresh job details (including token counts) on every refresh
      fetchJobDetails(selectedJob.id, false);
    } else {
      setCandidates([]);
    }
  }, [selectedJob?.id, dataRefreshTrigger]);

  const fetchCandidates = async (jobId, showLoader = false) => {
    if (showLoader) setLoadingCandidates(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/jobs/${jobId}/candidates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCandidates(response.data);
      setLoadedCandidateCount(response.data.length);
    } catch (err) {
      console.error("Failed to fetch candidates:", err);
    } finally {
      if (showLoader) setLoadingCandidates(false);
    }
  };

  const fetchJobDetails = async (jobId, updateLoading = false) => {
    if (updateLoading) setLoadingJd(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/jobs/${jobId}/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(`[DEBUG] fetchJobDetails(${jobId}) Response:`, response.data);

      if (response.data) {
        // Update selectedJob with fresh details (including token counts)
        setSelectedJob(prev => ({ ...prev, ...response.data }));

        if (response.data.jd_text) {
          setJdText(response.data.jd_text);
        } else if (response.data.description) {
          setJdText(response.data.description);
        }
      }
    } catch (err) {
      console.error("Failed to fetch job details:", err);
    } finally {
      if (updateLoading) setLoadingJd(false);
    }
  };

  const handleJobSelect = async (job) => {
    setDraftJob(null); // Exit draft mode
    setSelectedJob(job);
    setCandidates([]); // Clear previous candidates immediately
    // Optimistically set JD if available in the list object
    if (job.jd_text) {
      setJdText(job.jd_text);
    } else {
      setJdText(""); // Clear while loading
    }

    // Fetch full job details to get JD if missing or to ensure freshness
    fetchJobDetails(job.id, true);
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
    if (!draftJob || !draftJob.title || draftJob.files.length < 1) return; // Allow 1 for testing

    const BATCH_SIZE = 5;
    const totalFiles = draftJob.files.length;
    const totalBatches = Math.ceil(totalFiles / BATCH_SIZE);

    console.log(`[DEBUG] Starting Upload. Total Files: ${totalFiles}, Batch Size: ${BATCH_SIZE}, Total Batches: ${totalBatches}`);

    try {
      // Initial State
      setUploadState({
        stage: 'processing',
        progress: { current: 0, total: totalFiles }
      });

      const token = localStorage.getItem('token');
      let jobId = null;

      // --- BATCH 1: Create Job & Immediate View Switch ---
      const batch1Files = draftJob.files.slice(0, BATCH_SIZE);
      console.log(`[DEBUG] Batch 1 (Create) - Files: ${batch1Files.length}`);

      const formData1 = new FormData();
      formData1.append('title', draftJob.title);
      formData1.append('jd_text', draftJob.jd_text);
      batch1Files.forEach(file => formData1.append('files', file));

      const res1 = await axios.post(`${API_BASE_URL}/api/jobs/upload`, formData1, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(`[DEBUG] Batch 1 Success. Response:`, res1.data);
      jobId = res1.data.job_id;

      // IMMEDIATE VIEW SWITCH
      const newJob = {
        id: jobId,
        title: draftJob.title,
        jd_text: draftJob.jd_text,
        created_at: new Date().toISOString()
      };

      setSelectedJob(newJob);
      setDraftJob(null);

      // Trigger first data load
      setTimeout(() => {
        console.log(`[DEBUG] Triggering first refresh for Job ID: ${jobId}`);
        setDataRefreshTrigger(prev => prev + 1);

        setUploadState(prev => ({
          ...prev,
          progress: { ...prev.progress, current: batch1Files.length }
        }));
      }, 500);


      // --- REMAINING BATCHES: Append in Background ---
      for (let i = 1; i < totalBatches; i++) {
        const start = i * BATCH_SIZE;
        const end = Math.min(start + BATCH_SIZE, totalFiles);
        const batchFiles = draftJob.files.slice(start, end);
        console.log(`[DEBUG] Batch ${i + 1} (Append) - Files: ${batchFiles.length} (Index ${start} to ${end})`);

        const formData = new FormData();
        batchFiles.forEach(file => formData.append('files', file));

        const appendUrl = `${API_BASE_URL}/api/jobs/upload/${jobId}`;
        console.log(`[DEBUG] Appending to: ${appendUrl}`);

        const resAppend = await axios.post(appendUrl, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`[DEBUG] Batch ${i + 1} Success. Response:`, resAppend.data);

        // REAL-TIME UPDATE
        setDataRefreshTrigger(prev => prev + 1);

        setUploadState(prev => ({
          ...prev,
          progress: { ...prev.progress, current: end }
        }));

        await new Promise(r => setTimeout(r, 500));
      }

      console.log(`[DEBUG] All batches completed.`);
      setUploadState(prev => ({ ...prev, stage: 'completed' }));

      // Fixed 120s window (increased due to backend delay) to keep polling
      // Fixed 120s window (increased due to backend delay) to keep polling
      // NOTE: Smart polling will likely stop this sooner
      setTimeout(() => {
        // Only force idle if we haven't already finished via smart polling
        setUploadState(prev => {
          if (prev.stage !== 'idle') return { ...prev, stage: 'idle' };
          return prev;
        });
        setDataRefreshTrigger(prev => prev + 1);
      }, 120000);

    } catch (err) {
      console.error("[DEBUG] Failed to create job:", err);
      setUploadState(prev => ({ ...prev, stage: 'idle' })); // Reset on error
      if (err.response) {
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
              refreshTrigger={dataRefreshTrigger}
              activeJobId={selectedJob?.id}
            />
          </div>
        </aside>

        {/* Toggle Button (Floating or attached) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-20 left-4 z-10 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 text-gray-600 transition-all"
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

              {/* 2. Resume Processing Status (Hidden/Background) */}

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
                <div className="w-full shrink-0 bg-white rounded-b-2xl rounded-tr-2xl shadow-md border border-gray-100 border-t-0 p-4 relative z-0 flex flex-col h-[1200px] overflow-hidden">
                  {activeTab === 'cards' ? (
                    <CandidatesDisplay
                      jobId={selectedJob ? selectedJob.id : null}
                      candidates={candidates}
                      isLoading={loadingCandidates}
                      totalExpected={uploadState.progress.total}
                    />
                  ) : (
                    <CandidateTable
                      jobId={selectedJob ? selectedJob.id : null}
                      candidates={candidates}
                      isLoading={loadingCandidates}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 2: Stats & Charts (Right) - Fixed Width on Desktop, Full on Mobile */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">

              {/* 1. Token Usage Stats */}
              <div className="grid grid-cols-2 gap-3 h-24">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Input Tokens</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {selectedJob?.prompt_tokens ? selectedJob.prompt_tokens.toLocaleString() : '0'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">prompt</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-center relative overflow-hidden">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Output Tokens</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {selectedJob?.completion_tokens ? selectedJob.completion_tokens.toLocaleString() : '0'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">completion</span>
                  </div>
                </div>
              </div>

              {/* 2. Pie Chart (Candidate Status) */}
              <div className="h-[400px] w-full bg-white rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
                <div className="absolute inset-0">
                  <StatusPieChart
                    jobId={selectedJob ? selectedJob.id : null}
                    candidates={candidates}
                    isLoading={loadingCandidates}
                  />
                </div>
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
