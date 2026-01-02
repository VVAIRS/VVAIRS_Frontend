import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login, signup, verify } from "../api/auth";

const useAuth = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loginLoading, setLoginLoading] = useState(false);

    const loginForm = useForm();
    const signupForm = useForm();
    const password = signupForm.watch("password");

    /* ================= LOGIN ================= */
    const loginUser = async (data) => {
        setMessage({ type: "", text: "" });
        setLoginLoading(true);

        try {
            const res = await login(data);

            if (res?.data?.token) {
                navigate("/DashboardPage");
            } else {
                setMessage({ type: "error", text: "Login failed" });
            }
        } catch (err) {
            setMessage({
                type: "error",
                text: err.response?.data?.detail || "Login failed",
            });
        } finally {
            setLoginLoading(false);
        }
    };

    /* ================= SIGNUP ================= */
    const sendCode = async (data) => {
        setMessage({ type: "", text: "" });
        try {
            const res = await signup(data);
            if (res?.data?.ok) {
                setMessage({
                    type: "success",
                    text: `Verification code sent to ${data.email}`,
                });
            }
        } catch (err) {
            setMessage({
                type: "error",
                text: err.response?.data?.detail || "Failed to send code",
            });
        }
    };

    const verifyCode = async (data) => {
        setMessage({ type: "", text: "" });
        try {
            const res = await verify(data);
            if (res?.data?.ok) {
                setMessage({
                    type: "success",
                    text: "Signup successful! Redirecting...",
                });
                setTimeout(() => navigate("/DashboardPage"), 1000);
            }
        } catch (err) {
            setMessage({
                type: "error",
                text: err.response?.data?.detail || "Verification failed",
            });
        }
    };

    return {
        loginRegister: loginForm.register,
        loginHandleSubmit: loginForm.handleSubmit,
        loginErrors: loginForm.formState.errors,
        loginLoading,
        loginUser,
        signupRegister: signupForm.register,
        signupHandleSubmit: signupForm.handleSubmit,
        signupErrors: signupForm.formState.errors,
        sendCode,
        verifyCode,
        message,
        password,
    };
};

export default useAuth;
