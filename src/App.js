import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import JobsDashboardPage from "./pages/JobsDashboardPage";
import CandidateDashboardPage from "./pages/CandidateDashboardPage";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
// import PrivateRoute from "./api/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Protected routes */}
          <Route
            path="/"
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
