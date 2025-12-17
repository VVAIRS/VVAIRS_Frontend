import React, { useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const ResumeUploader = ({ files = [], onFilesChange, onSubmit, isEditable = true }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && onFilesChange) {
            const newFiles = Array.from(e.target.files);
            onFilesChange([...files, ...newFiles]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (isEditable && e.dataTransfer.files && onFilesChange) {
            const newFiles = Array.from(e.dataTransfer.files);
            onFilesChange([...files, ...newFiles]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const isValid = files.length > 0;

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow relative">
            <div className="flex-1 p-4 flex flex-col min-h-0">

                {/* Header / Status / Action */}
                <div className="flex justify-between items-center mb-4 shrink-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">Resumes</h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${files.length > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {files.length}
                        </span>
                    </div>

                    {/* Top Right Enter Button */}
                    {isEditable && (
                        <button
                            onClick={onSubmit}
                            disabled={!isValid}
                            title={isValid ? "Create Job" : "Add at least 1 resume to create"}
                            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
                                ${isValid
                                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105'
                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Upload Area & File List - Scrollable Container */}
                <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                    {isEditable ? (
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current?.click()}
                            className="shrink-0 w-full h-24 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center p-2 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer mb-3"
                        >
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <Upload className="w-5 h-5 text-indigo-600 mb-1" />
                            <p className="text-gray-600 text-sm font-medium">Click or Drop</p>
                        </div>
                    ) : (
                        files.length === 0 && <p className="text-gray-400 text-sm text-center italic mt-4">No resumes uploaded.</p>
                    )}

                    {/* Scrollable File List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                                    <FileText className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                                    <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 ml-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Validation Message (Only if invalid) */}
                {isEditable && !isValid && (
                    <div className="mt-2 pt-2 border-t border-gray-100 shrink-0">
                        <p className="text-sm text-center text-red-400 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Please upload at least one resume
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUploader;
