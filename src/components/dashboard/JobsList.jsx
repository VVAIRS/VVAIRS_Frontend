import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreHorizontal, Plus } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobsList = ({ onSelectJob }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/jobs/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Backend returns job_id, but frontend uses id. Map it.
            const formattedJobs = response.data.map(job => ({
                ...job,
                id: job.job_id || job.id
            }));
            setJobs(formattedJobs);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            setError('Failed to load jobs');
            setLoading(false);
            // No fallback data - rely on backend
        }
    };

    const handleJobClick = (job) => {
        setSelectedJobId(job.id);
        if (onSelectJob) {
            onSelectJob(job);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'queued':
            default:
                return 'bg-gray-700 text-white';
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 p-4 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Jobs</h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {loading ? (
                    <p className="text-gray-500 text-center">Loading jobs...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => handleJobClick(job)}
                            className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-200 
                                ${selectedJobId === job.id ? 'border-gray-800 ring-1 ring-gray-800 bg-white' : 'border-gray-100 bg-white hover:shadow-md'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800 text-lg">{job.title}</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-500">{job.status}</span>
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${getStatusColor(job.status)}`}>
                                    {job.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2" />
                New Job
            </button>
        </div>
    );
};

export default JobsList;
