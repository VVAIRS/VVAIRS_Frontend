import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateCard from './CandidateCard';
import { Loader2, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CandidatesDisplay = ({ jobId }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (jobId) {
            fetchCandidates(jobId);
        } else {
            setCandidates([]);
        }
    }, [jobId]);

    const fetchCandidates = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/jobs/${id}/candidates`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCandidates(response.data);
        } catch (err) {
            console.error("Failed to fetch candidates:", err);
            setError("Failed to load candidates.");
        } finally {
            setLoading(false);
        }
    };

    if (!jobId) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-200 p-8">
                <p>Select a job to view candidates.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-white rounded-2xl border border-gray-200 p-8">
                <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-600" />
                <p>Analyzing candidates...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-red-400 bg-white rounded-2xl border border-gray-200 p-8">
                <AlertCircle className="w-8 h-8 mb-2" />
                <p>{error}</p>
                <button
                    onClick={() => fetchCandidates(jobId)}
                    className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (candidates.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-200 p-8">
                <p>No candidates processed yet.</p>
                <p className="text-xs mt-1">Upload resumes to see analysis.</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {candidates.map((candidate, index) => (
                    <div key={index} className="h-56">
                        <CandidateCard candidate={candidate} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidatesDisplay;
