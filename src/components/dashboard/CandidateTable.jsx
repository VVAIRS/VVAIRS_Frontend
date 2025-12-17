import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, Download } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CandidateTable = ({ jobId, candidates = [], isLoading = false }) => {
    // State removed: candidates, loading, error (now props)

    // Column definitions with initial widths
    const [columns, setColumns] = useState([
        { id: 'sno', label: 'S.No', width: 60, minWidth: 50 },
        { id: 'name', label: 'Name', width: 150, minWidth: 100 },
        { id: 'email', label: 'Email', width: 200, minWidth: 150 },
        { id: 'phone', label: 'Phone', width: 120, minWidth: 100 },
        { id: 'experience', label: 'Experience', width: 100, minWidth: 80 },
        { id: 'skills', label: 'Skills', width: 250, minWidth: 150 },
        { id: 'match_score', label: 'Match Score', width: 100, minWidth: 80 },
        { id: 'status', label: 'Status', width: 100, minWidth: 80 },
    ]);


    // Resizing Logic
    const resizingRef = useRef(null);
    const activeColumnRef = useRef(null); // To store the ID of the column being resized

    const startResizing = (e, colId) => {
        e.preventDefault();
        e.stopPropagation(); // Stop propagation just in case

        activeColumnRef.current = colId;
        resizingRef.current = {
            startX: e.pageX,
            startWidth: columns.find(c => c.id === colId).width
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (!resizingRef.current || !activeColumnRef.current) return;

        const { startX, startWidth } = resizingRef.current;
        const colId = activeColumnRef.current;
        const diff = e.pageX - startX;

        setColumns(prev => prev.map(col => {
            if (col.id === colId) {
                const newWidth = Math.max(col.minWidth, startWidth + diff);
                return { ...col, width: newWidth };
            }
            return col;
        }));
    };

    const handleMouseUp = () => {
        activeColumnRef.current = null;
        resizingRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    // Formatting Helpers
    const formatSkills = (skills) => {
        if (Array.isArray(skills)) return skills.join(', ');
        return skills || '-';
    };

    const formatScore = (score) => {
        if (typeof score === 'number') return `${Math.round(score)}%`;
        return score || '-';
    };

    // Helper to safely get experience using backend key
    const getExperience = (c) => {
        if (c.experience_years !== undefined && c.experience_years !== null) {
            return c.experience_years;
        }
        return '-';
    };

    // Helper to get color based on status
    const getStatusColor = (status) => {
        const s = (status || '').toLowerCase().replace(/_/g, '').replace(/ /g, '');
        if (s.includes('shortlist')) return 'bg-green-100 text-green-800';
        if (s.includes('qualified') && !s.includes('not')) return 'bg-green-100 text-green-800';

        if (s.includes('reject') || s.includes('notqualified')) return 'bg-red-100 text-red-800';

        // Default / Under Review / Screening
        return 'bg-yellow-100 text-yellow-800';
    };

    if (!jobId) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>Select a job to view candidates.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-600" />
                <p>Loading candidate data...</p>
            </div>
        );
    }

    // Error handling handled by parent or silenced for now


    if (candidates.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>No candidates found.</p>
            </div>
        );
    }

    const downloadCSV = () => {
        if (!candidates || candidates.length === 0) return;

        const headers = ['Name', 'Email', 'Phone', 'Experience', 'Skills', 'Match Score', 'Status'];
        const csvRows = [headers.join(',')];

        candidates.forEach(c => {
            const row = [
                `"${c.name || ''}"`,
                `"${c.email || ''}"`,
                `"${c.phone || ''}"`,
                `"${getExperience(c)}"`,
                `"${formatSkills(c.skills).replace(/"/g, '""')}"`,
                `"${c.match_score || 0}"`,
                `"${c.status || 'Screening'}"`
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `candidates_${jobId || 'export'}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="h-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-medium text-gray-700">Candidate List</h3>
                <button
                    onClick={downloadCSV}
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    title="Download as CSV"
                >
                    <Download className="w-4 h-4 mr-2 text-gray-500" />
                    Download Excel
                </button>
            </div>
            <div className="overflow-auto flex-1 custom-scrollbar relative">
                <table className="min-w-full text-left text-sm text-gray-600 border-collapse" style={{ tableLayout: 'fixed', width: columns.reduce((acc, col) => acc + col.width, 0) }}>
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200 sticky top-0 z-10">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.id}
                                    className="relative px-4 py-3 select-none truncate group"
                                    style={{ width: col.width }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{col.label}</span>
                                    </div>
                                    <div
                                        className="absolute right-0 top-0 h-full w-2 cursor-col-resize flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors z-20"
                                        style={{ right: '-1px' }}
                                        onMouseDown={(e) => startResizing(e, col.id)}
                                    >
                                        <div className="h-4 w-px bg-gray-300" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {candidates.map((candidate, index) => (
                            <tr key={candidate.id || index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 truncate border-r border-transparent" style={{ width: columns[0].width }}>
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3 truncate font-medium text-gray-900" style={{ width: columns[1].width }}>
                                    {candidate.name || 'Unknown'}
                                </td>
                                <td className="px-4 py-3 truncate" style={{ width: columns[2].width }}>
                                    {candidate.email || '-'}
                                </td>
                                <td className="px-4 py-3 truncate" style={{ width: columns[3].width }}>
                                    {candidate.phone || '-'}
                                </td>
                                <td className="px-4 py-3 truncate" style={{ width: columns[4].width }}>
                                    {getExperience(candidate)}
                                </td>
                                <td className="px-4 py-3 truncate" style={{ width: columns[5].width }} title={formatSkills(candidate.skills)}>
                                    {formatSkills(candidate.skills)}
                                </td>
                                <td className="px-4 py-3 truncate" style={{ width: columns[6].width }}>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(candidate.status)}`}>
                                        {formatScore(candidate.match_score)}
                                    </span>
                                </td>
                                <td className="px-4 py-3 truncate" style={{ width: columns[7].width }}>
                                    <span className="capitalize">{candidate.status || 'Screening'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center shrink-0">
                <span>Total Candidates: {candidates.length}</span>
                <span>Drag headers to resize columns</span>
            </div>
        </div>
    );
};

export default CandidateTable;
