import React from 'react';
import { Upload } from 'lucide-react';

const ResumeUploader = () => {
    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Upload Resumes</h2>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-center">
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center p-8 hover:border-indigo-400 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                        <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop Resumes Here</h3>
                    <p className="text-gray-500 text-sm mb-6">or click to browse files</p>
                    <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
                        Browse Files
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeUploader;
