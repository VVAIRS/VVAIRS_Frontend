import { useState } from "react";

const useAPI = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        try {
            const response = await apiFunc(...args);
            setData(response.data?.data ?? response.data);
            return response;
        } catch (err) {
            setError(err);
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const resetData = () => {
        setData(null);
        setError("");
        setLoading(false);
    };

    return {
        data,
        error,
        loading,
        request,
        resetData,
        setData,
    };
};

export default useAPI;
