import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  // Optional: show nothing / loader while auth is checking
  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
