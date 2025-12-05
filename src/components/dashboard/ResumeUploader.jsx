import React from 'react';
import { Upload } from 'lucide-react';

const ResumeUploader = () => {
    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
                <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center p-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Upload Resumes</h3>
                    <p className="text-gray-500 text-xs">Drag & drop or browse</p>
                </div>
            </div>
        </div>
    );
};

export default ResumeUploader;
