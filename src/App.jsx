import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import useToasts, { ToastList } from "./components/common/Toast";
import DemoRequestModal from "./components/common/DemoRequestModal";
import Button from "./components/common/Button";
import LoginPage from "./pages/LoginPage";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import SignupPage from "./pages/SignUpPage";
import JobsDashboardPage from "./pages/JobsDashboardPage";
import CandidatesDashboardPage from "./pages/CandidateDashboardPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoutes";
// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [pathname, hash]);
  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="grey.50"
        >
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Something went wrong
            </Typography>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Box>
        </Box>
      );
    }
    return this.props.children;
  }
}

function Layout() {
  const { toast, pushToast, removeToast } = useToasts();
  const [demoOpen, setDemoOpen] = useState(false);

  // Key shortcut for demo
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key.toLowerCase() === "d") setDemoOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onDemoSubmit = payload => {
    pushToast({
      tone: "success",
      title: "Request received",
      message: `Thanks, ${payload.name}. We'll email you soon.`,
    });
    setDemoOpen(false);
  };

  const openDemo = () => setDemoOpen(true);

  return (
    <Box
      bgcolor="background.default"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Header
        brand="AI Resume Screening"
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Pricing", href: "/pricing" },
          { label: "Signup", href: "/signup" },
          { label: "Login", href: "/login" },
        ]}
        cta={{ label: "Request Demo", onClick: openDemo }}
      />

      <Box component="main" flexGrow={1}>
        <Outlet context={{ openDemo, pushToast }} />
      </Box>

      <Footer brand="AI Resume Screening Platform" />
      <ToastList toasts={toast} onDismiss={removeToast} />
      <DemoRequestModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        onSubmit={onDemoSubmit}
      />
    </Box>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/jobs" element={<JobsDashboardPage />} />
                <Route
                  path="/jobs/:jobId/candidates"
                  element={<CandidatesDashboardPage />}
                />
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}
