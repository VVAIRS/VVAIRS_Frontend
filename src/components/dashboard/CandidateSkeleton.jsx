import React from 'react';

const CandidateSkeleton = () => {
    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col h-full animate-pulse">
            {/* Header: Name & Score */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3 w-full">
                    {/* Avatar Skeleton */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>

                    {/* Info Skeleton */}
                    <div className="flex flex-col gap-2 w-full max-w-[180px]">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                {/* Score Skeleton */}
                <div className="w-12 h-6 bg-gray-200 rounded-lg shrink-0"></div>
            </div>

            {/* Reasoning / Context Skeleton */}
            <div className="flex-1 mt-4 space-y-2 min-h-0">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
        </div>
    );
};

export default CandidateSkeleton;
