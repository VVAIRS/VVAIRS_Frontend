import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";
import { login, signup, verify, logout } from "../api/auth";
import { useAuthContext } from "../context/AuthContext";
const useAuth = () => {
    const navigate = useNavigate();
    const notification = useContext(NotificationContext);
    const { checkAuth } = useAuthContext();

    const loginForm = useForm();
    const signupForm = useForm();
    const password = signupForm.watch("password");

    /* ================= LOGIN ================= */
    const loginUser = async (data) => {
        notification.showLoader();
        try {
            const res = await login(data);

            if (res?.data?.token) {
                notification.success("Login successful");
                await checkAuth();
                navigate("/jobs");
            } else {
                notification.error("Login failed");
            }
        } catch (err) {
            notification.error(
                err.response?.data?.detail || "Login failed"
            );
        } finally {
            notification.hideLoader();
        }
    };

    /* ================= SIGNUP ================= */
    const sendCode = async (data) => {
        notification.showLoader();
        try {
            const res = await signup(data);

            if (res?.data?.ok) {
                notification.success(
                    `Verification code sent to ${data.email}`
                );
            }
        } catch (err) {
            notification.error(
                err.response?.data?.detail || "Failed to send code"
            );
        } finally {
            notification.hideLoader();
        }
    };

    const verifyCode = async (data) => {
        notification.showLoader();
        try {
            const res = await verify(data);

            if (res?.data?.ok) {
                notification.success("Signup successful! Redirecting...");
                setTimeout(() => navigate("/jobs"), 1000);
            }
        } catch (err) {
            notification.error(
                err.response?.data?.detail || "Verification failed"
            );
        } finally {
            notification.hideLoader();
        }
    };
    const logoutUser = async () => {
        notification.showLoader();
        try {
            await logout(); // backend logout
            await checkAuth();
            notification.success("Logged out successfully");
            navigate("/login");
        } catch (err) {
            notification.error(
                err.response?.data?.detail || "Logout failed"
            );
        } finally {
            notification.hideLoader();
        }
    };
    return {
        /* Login */
        loginRegister: loginForm.register,
        loginHandleSubmit: loginForm.handleSubmit,
        loginErrors: loginForm.formState.errors,
        loginUser,

        /* Signup */
        signupRegister: signupForm.register,
        signupHandleSubmit: signupForm.handleSubmit,
        signupErrors: signupForm.formState.errors,
        sendCode,
        verifyCode,

        password,
        logoutUser
    };
};

export default useAuth;
