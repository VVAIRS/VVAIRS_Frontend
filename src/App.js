import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import JobsDashboardPage from "./pages/JobsDashboardPage";
import CandidateDashboardPage from "./pages/CandidateDashboardPage";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import MainLayout from "./layout/MainLayout";
// import PrivateRoute from "./api/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<MainLayout />}>
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
              <JobsDashboardPage />
              // </PrivateRoute>
            }
          />

          <Route
            path="/jobs/:jobId/candidates"
            element={
              // <PrivateRoute>
              <CandidateDashboardPage />
              // </PrivateRoute>
            }
          />

          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
