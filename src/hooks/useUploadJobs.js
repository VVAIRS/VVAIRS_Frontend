import { useState } from "react";
import { uploadJobApi, updateJobApi } from "../api/dashboardApi";

export default function useUploadJob() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // ✅ Existing function (unchanged)
    const uploadJob = async ({ title, jd_text }) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("jd", jd_text);

            const res = await uploadJobApi(formData);

            setSuccess(true);
            return res.data;

        } catch (err) {
            console.error("Upload job error:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ✅ NEW FUNCTION: Upload resumes for a job
    const uploadResumes = async (jobId, files) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append("files", file);
            });

            const res = await updateJobApi(jobId, formData);
            setSuccess(true);
            return res.data;

        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return {
        uploadJob,
        uploadResumes, // 👈 exposed here
        loading,
        success,
        error
    };
}
