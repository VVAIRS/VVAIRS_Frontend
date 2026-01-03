import React, { useState } from "react";
import { Snackbar, Alert, Backdrop, CircularProgress } from "@mui/material";

const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationText, setNotificationText] = useState(null);
    const [loading, setLoading] = useState(false);

    const success = (text) => {
        setNotificationText(text);
        setNotification("success");
        setOpen(true);
    };

    const error = (text) => {
        setNotificationText(text);
        setNotification("error");
        setOpen(true);
    };

    const info = (text) => {
        setNotificationText(text);
        setNotification("info");
        setOpen(true);
    };

    const clear = () => {
        setOpen(false);
        setNotification(null);
        setNotificationText(null);
    };

    /* 🔄 Global Loader */
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <NotificationContext.Provider
            value={{
                success,
                error,
                info,
                clear,
                showLoader,
                hideLoader,
            }}
        >
            {children}

            {/* 🌍 Global Loader */}
            <Backdrop
                open={loading}
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* 🔔 Notification */}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={clear}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={notification || "info"} // 👈 FIX
                    variant="filled"
                    onClose={clear}
                    sx={{ width: "100%" }}
                >
                    {notificationText}
                </Alert>
            </Snackbar>

        </NotificationContext.Provider>
    );
};

export { NotificationProvider };
export default NotificationContext;
