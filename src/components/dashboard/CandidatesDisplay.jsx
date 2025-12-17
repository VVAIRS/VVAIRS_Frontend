import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateCard from './CandidateCard';
import CandidateSkeleton from './CandidateSkeleton';
import FadeIn from '../ui/FadeIn';
import { Loader2, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CandidatesDisplay = ({ jobId, candidates = [], isLoading = false, totalExpected = 0 }) => {
    // State handled by parent


    if (!jobId) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-200 p-8">
                <p>Select a job to view candidates.</p>
            </div>
        );
    }

    // Error handling handled by parent or silenced for now


    // Smart Skeleton Logic:
    // 1. If loading initially (and no candidates yet), show at least 6 skeletons (or totalExpected if known).
    // 2. If background refreshing, show skeletons only for missing candidates (totalExpected - current).

    let skeletonsNeeded = 0;

    if (isLoading && candidates.length === 0) {
        // Initial load: Show skeletons!
        skeletonsNeeded = totalExpected > 0 ? totalExpected : 6;
    } else {
        // Silent refresh or loaded state
        skeletonsNeeded = Math.max(0, totalExpected - candidates.length);
    }

    return (
        <div className="h-full overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {/* Real Candidates (with FadeIn animation) */}
                {candidates.map((candidate, index) => (
                    <FadeIn key={candidate.id || index} delay={index * 100}>
                        <div className="h-56">
                            <CandidateCard candidate={candidate} />
                        </div>
                    </FadeIn>
                ))}

                {/* Skeleton Candidates (Placeholders) */}
                {Array.from({ length: skeletonsNeeded }).map((_, index) => (
                    <div key={`skeleton-${index}`} className="h-56">
                        <CandidateSkeleton />
                    </div>
                ))}
            </div>

            {/* Fallback empty state if no candidates and no skeletons expected */}
            {!isLoading && candidates.length === 0 && skeletonsNeeded === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                    <p>No candidates found.</p>
                </div>
            )}
        </div>
    );
};

export default CandidatesDisplay;
