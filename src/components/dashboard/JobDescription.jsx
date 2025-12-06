import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const JobDescription = ({ jdText = "", onJdChange, onSave, variant = "full", onExpand, isEditable = true }) => {
    const [localText, setLocalText] = useState(jdText);

    useEffect(() => {
        setLocalText(jdText);
    }, [jdText]);

    // Widget Mode (Card view)
    if (variant === "widget") {
        return (
            <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex-1 p-4 flex flex-col items-center justify-center">
                    {jdText ? (
                        <div
                            onClick={onExpand}
                            className="w-full h-full text-left cursor-pointer relative"
                        >
                            <div className="absolute top-0 right-0 p-2 bg-gradient-to-l from-white via-white to-transparent">
                                <ExternalLink className="w-4 h-4 text-indigo-600" />
                            </div>
                            <p className="text-gray-600 text-base p-4 h-full overflow-hidden text-ellipsis leading-relaxed">
                                {jdText}
                            </p>
                        </div>
                    ) : (
                        <div
                            onClick={onExpand}
                            className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center p-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Job Description</h3>
                            <p className="text-gray-500 text-sm flex items-center">
                                View or Edit
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Full Mode (Textarea view)
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="flex-1">
                <textarea
                    readOnly={!isEditable}
                    className={`w-full h-full p-4 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none transition-all duration-200 
                        ${isEditable ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-white border-transparent text-gray-600 cursor-default'}`}
                    placeholder={isEditable ? "Enter job description here..." : "No description available."}
                    value={isEditable ? localText : jdText}
                    onChange={(e) => isEditable && setLocalText(e.target.value)}
                />
            </div>
            {isEditable && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => onSave && onSave(localText)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobDescription;
