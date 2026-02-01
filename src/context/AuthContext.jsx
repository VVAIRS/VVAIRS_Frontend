import { createContext, useContext, useEffect, useState } from "react";
import { instanceAPI } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        setLoading(true);
        try {
            await instanceAPI.get("/auth/user_details");
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);