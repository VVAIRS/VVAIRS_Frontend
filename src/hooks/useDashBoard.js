import { useEffect, useRef, useState, useContext } from "react";
import useAPI from "../api/useApi";
import { fetchJobsApi, deleteJobApi, fetchJobByIdApi } from "../api/dashboardApi";
import NotificationContext from "../context/NotificationContext";
const generateReportId = (index) =>
    `REPORT-${String(index + 1).padStart(3, "0")}`;

export default function useDashboard() {
    const notification = useContext(NotificationContext);
    const [rows, setRows] = useState([]);
    const { data: jobsData, loading, request: jobsRequest } = useAPI(fetchJobsApi);
    const { data: jobData, loading: jobLoading, request: jobRequest } = useAPI(fetchJobByIdApi);
    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        jobsRequest();
    }, [jobsRequest]);

    useEffect(() => {
        if (!jobsData) return;

        const formattedRows = jobsData.map((job, index) => ({
            id: job.job_id,
            reportId: generateReportId(index),
            title: job.title,
            status: job.status?.toLowerCase(),
            cost: job.cost,
            inputTokens: job.prompt_tokens,
            outputTokens: job.completion_tokens,
            totalTokens: job.tokens_used,
            createdOn: job.created_at,
        }));

        setRows(formattedRows);
    }, [jobsData]);


    const deleteJob = async (id) => {
        try {
            notification.showLoader(); // 👈 show loader
            await deleteJobApi(id);
            setRows((prev) => prev.filter((row) => row.id !== id));
            notification.success("Job deleted successfully");
        } catch (error) {
            notification.error("Failed to delete job");
        } finally {
            notification.hideLoader(); // 👈 hide loader
        }
    };
    const fetchJobById = async (id) => {
        try {
            const res = await jobRequest(id);
            console.log("Job status response:", res?.data?.status);
            return res;
        } catch (error) {
            console.error("Failed to fetch job:", error);
            throw error;
        }
    };

    return { rows, deleteJob, jobsData, loading, jobsRequest, jobRequest, fetchJobById, jobData };
}
