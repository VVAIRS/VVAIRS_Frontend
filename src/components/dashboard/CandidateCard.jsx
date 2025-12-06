import React from 'react';
import { User, Mail, Phone, FileText } from 'lucide-react';

const CandidateCard = ({ candidate }) => {
    const { name, match_score, reasoning, email, phone } = candidate;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50 ring-green-500/20';
        if (score >= 50) return 'text-yellow-600 bg-yellow-50 ring-yellow-500/20';
        return 'text-red-600 bg-red-50 ring-red-500/20';
    };

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
            {/* Header: Name & Score */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1 text-lg" title={name}>{name || "Unknown Candidate"}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                            {email && (
                                <span className="flex items-center gap-1" title={email}>
                                    <Mail className="w-3.5 h-3.5" />
                                    <span className="truncate max-w-[140px]">{email}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-sm font-bold ring-1 ring-inset ${getScoreColor(match_score)}`}>
                    {match_score}%
                </div>
            </div>

            {/* Reasoning / Context */}
            <div className="flex-1 mt-2 min-h-0">
                <div className="flex items-start gap-2 h-full">
                    <FileText className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-6 leading-relaxed">
                        {reasoning || "No analysis available."}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default CandidateCard;
