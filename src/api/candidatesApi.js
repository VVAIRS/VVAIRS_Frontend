import { instanceAPI } from "./axios";
export const getCandidatesApi = (id) => {
    return instanceAPI.get(`/jobs/${id}/candidates`);
};