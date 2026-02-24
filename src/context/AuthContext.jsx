import { createContext, useContext, useEffect, useState } from "react";
import { instanceAPI } from "../api/axios";
import useAPI from "../api/useApi";
import { user } from "../api/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    request: userRequest,
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useAPI(user);
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
    userRequest();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        checkAuth,
        userData,
        userLoading,
        userError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
