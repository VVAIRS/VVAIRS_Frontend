import { instanceAPI } from "./axios";

export const fetchJobsApi = () => {
    return instanceAPI.get("/jobs/");
};
export const uploadJobApi = (formData) => {
    return instanceAPI.post("/jobs/create_job", formData);
};
export const deleteJobApi = (id) => {
    return instanceAPI.delete(`/jobs/${id}`);
};
export const updateJobApi = (jobId, formData) => {
    return instanceAPI.post(`/jobs/upload/${jobId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};
export const fetchJobByIdApi = (jobId) => {
    return instanceAPI.get(`/jobs/${jobId}/status`);
};
