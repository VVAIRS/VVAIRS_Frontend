// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/DashboardPage");

    } catch (err) {
      if (err.response) {
        const backendMessage =
          err.response.data?.message ||
          err.response.data?.detail ||
          err.response.data?.error ||
          "Invalid credentials";

        setError(backendMessage);
      } else if (err.request) {
        setError("Server did not respond.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <Link to="/ForgotPassword" style={{ color: '#000', fontSize: '0.9rem', textDecoration: 'underline' }}>
            Forgot Password?
          </Link>
        </div>

        <p style={styles.signupText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f1f1f1", // light grey
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    borderRadius: "10px",
    background: "#ffffff", // white
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)", // soft grey shadow
    width: "320px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#000000", // black
  },
  label: {
    color: "#333", // dark grey
    marginBottom: "4px",
  },
  input: {
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc", // light grey border
    background: "#fafafa", // slightly off-white
    color: "#000",
  },
  button: {
    padding: "0.7rem",
    border: "none",
    borderRadius: "6px",
    background: "#333333", // dark grey button
    color: "#ffffff", // white text
    cursor: "pointer",
  },
  error: {
    color: "#ff4444",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  signupText: {
    textAlign: "center",
    marginTop: "1rem",
    color: "#333",
  },
  signupLink: {
    color: "#000", // black link
    textDecoration: "underline",
  },
};

export default LoginPage;
