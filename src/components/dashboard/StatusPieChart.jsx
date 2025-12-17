import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StatusPieChart = ({ jobId, candidates = [], isLoading = false }) => {
    const [stats, setStats] = useState([]);

    // Exact colors from other components for consistency
    const COLORS = {
        shortlisted: '#22c55e', // green-500
        rejected: '#ef4444',    // red-500
        screening: '#eab308'    // yellow-500
    };

    useEffect(() => {
        calculateStats(candidates);
    }, [candidates]);

    const calculateStats = (candidatesData) => {
        if (!candidatesData) return;

        // Logic to aggregate stats
        let shortlisted = 0;
        let rejected = 0;
        let screening = 0;

        candidatesData.forEach(c => {
            const s = (c.status || '').toLowerCase().replace(/_/g, '').replace(/ /g, '');

            if (s.includes('shortlist') || (s.includes('qualified') && !s.includes('not'))) {
                shortlisted++;
            } else if (s.includes('reject') || s.includes('notqualified')) {
                rejected++;
            } else {
                screening++;
            }
        });

        const data = [
            { name: 'Shortlisted', value: shortlisted, color: COLORS.shortlisted },
            { name: 'Screening/Review', value: screening, color: COLORS.screening },
            { name: 'Rejected', value: rejected, color: COLORS.rejected },
        ].filter(item => item.value > 0); // Only show segments with data

        setStats(data);
    };

    if (!jobId) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Select a job
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (stats.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No data
            </div>
        );
    }

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Position at 60% of radius (inside)
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full h-full relative group">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                    <Pie
                        data={stats}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius="75%"
                        paddingAngle={1}
                        dataKey="value"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                        {stats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Floating Legend (Compact & Corner) */}
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-100 flex flex-col gap-1 min-w-[100px]">
                {stats.map(s => (
                    <div key={s.name} className="flex items-center justify-between gap-2 text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                            <span className="font-medium text-gray-600 truncate max-w-[60px]" title={s.name}>{s.name}</span>
                        </div>
                        <span className="font-bold text-gray-900">{s.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusPieChart;
