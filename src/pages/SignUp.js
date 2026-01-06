import {
    Box,
    TextField,
    Button,
    Typography,
    Stack,
    InputAdornment,
    Backdrop,
    CircularProgress,
    Divider,
    Container,
    Paper,
    CssBaseline,
} from "@mui/material";
import {
    Person,
    Email,
    Lock,
    LockOpen,
    VpnKey,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { keyframes } from "@emotion/react";

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const SignupPage = () => {
    const {
        signupRegister,
        signupHandleSubmit,
        signupErrors,
        password,
        isCodeSent,
        loading,
        sendCode,
        verifyCode,
    } = useAuth();

    const handleGoogleLogin = () => {
        window.location.href = `http://resumezai-cqfzgtffhheqfrfg.centralindia-01.azurewebsites.net/api/auth/login/google`;
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                overflow: "hidden",
                bgcolor: "#0f172a",
                background: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
                position: 'relative',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "url('https://grainy-gradients.vercel.app/noise.svg')",
                    opacity: 0.4,
                    zIndex: 0,
                    pointerEvents: "none",
                }
            }}
        >
            <CssBaseline />

            {/* Moving Gradient Orbs */}
            <Box sx={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(0,0,0,0) 70%)',
                animation: `${floatAnimation} 10s ease-in-out infinite`,
                zIndex: 0,
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(0,0,0,0) 70%)',
                animation: `${floatAnimation} 14s ease-in-out infinite reverse`,
                zIndex: 0,
            }} />

            {/* Loader */}
            <Backdrop
                open={loading}
                sx={{ zIndex: (theme) => theme.zIndex.modal + 2, color: "#fff", backdropFilter: 'blur(5px)' }}
            >
                <CircularProgress size={60} thickness={4} sx={{ color: '#818cf8' }} />
            </Backdrop>

            {/* Signup Card */}
            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, perspective: '1000px' }}>
                <Paper
                    elevation={24}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                            transform: "translateY(-5px)",
                        },
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <Box textAlign="center" mb={3}>
                        <Box sx={{
                            width: 50,
                            height: 50,
                            bgcolor: '#4f46e5',
                            borderRadius: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.4)'
                        }}>
                            <Person sx={{ color: 'white' }} />
                        </Box>

                        <Typography
                            variant="h4"
                            fontWeight="800"
                            gutterBottom
                            sx={{
                                background: "linear-gradient(to right, #1e293b, #334155)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: '-0.5px'
                            }}
                        >
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                            Join us today and get started
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        startIcon={
                            <svg width="20" height="20" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z" />
                                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
                            </svg>
                        }
                        sx={{
                            mb: 2,
                            py: 1.5,
                            textTransform: "none",
                            borderRadius: 2,
                            borderColor: "#e2e8f0",
                            color: "#475569",
                            bgcolor: "#fff",
                            fontWeight: 600,
                            "&:hover": {
                                bgcolor: "#f8fafc",
                                borderColor: "#cbd5e1"
                            }
                        }}
                    >
                        Sign in with Google
                    </Button>

                    <Divider sx={{ mb: 2, "&::before, &::after": { borderColor: "#e2e8f0" } }}>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold">
                            OR
                        </Typography>
                    </Divider>

                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            fullWidth
                            size="small"
                            disabled={isCodeSent}
                            {...signupRegister("username", { required: "Username required" })}
                            error={!!signupErrors.username}
                            helperText={signupErrors.username?.message || ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: "#64748b" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "& fieldset": { borderColor: "#e2e8f0" },
                                    "&:hover fieldset": { borderColor: "#94a3b8" },
                                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                                }
                            }}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            size="small"
                            disabled={isCodeSent}
                            {...signupRegister("email", { required: "Email required" })}
                            error={!!signupErrors.email}
                            helperText={signupErrors.email?.message || ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: "#64748b" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "& fieldset": { borderColor: "#e2e8f0" },
                                    "&:hover fieldset": { borderColor: "#94a3b8" },
                                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                                }
                            }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            size="small"
                            disabled={isCodeSent}
                            {...signupRegister("password", { required: "Password required" })}
                            error={!!signupErrors.password}
                            helperText={signupErrors.password?.message || ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: "#64748b" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "& fieldset": { borderColor: "#e2e8f0" },
                                    "&:hover fieldset": { borderColor: "#94a3b8" },
                                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                                }
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            size="small"
                            disabled={isCodeSent}
                            {...signupRegister("confirmPassword", {
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            error={!!signupErrors.confirmPassword}
                            helperText={signupErrors.confirmPassword?.message || ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpen sx={{ color: "#64748b" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "& fieldset": { borderColor: "#e2e8f0" },
                                    "&:hover fieldset": { borderColor: "#94a3b8" },
                                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                                }
                            }}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="OTP Code"
                                fullWidth
                                size="small"
                                disabled={!isCodeSent}
                                {...signupRegister("code", {
                                    required: isCodeSent && "OTP required",
                                })}
                                error={!!signupErrors.code}
                                helperText={signupErrors.code?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKey sx={{ color: "#64748b" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#f8fafc",
                                        "& fieldset": { borderColor: "#e2e8f0" },
                                        "&:hover fieldset": { borderColor: "#94a3b8" },
                                        "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                                    }
                                }}
                            />

                            <Button
                                variant="contained"
                                disabled={loading || isCodeSent}
                                onClick={signupHandleSubmit(sendCode)}
                                sx={{
                                    flexShrink: 0,
                                    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                                    boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.4)",
                                    borderRadius: 2,
                                    fontWeight: "bold",
                                    minWidth: '120px',
                                    "&:hover": {
                                        background: "linear-gradient(to right, #4338ca, #6d28d9)",
                                    },
                                    "&:disabled": {
                                        background: "#ccc",
                                        boxShadow: "none"
                                    }
                                }}
                            >
                                {loading ? "..." : "Send Code"}
                            </Button>
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={!isCodeSent || loading}
                            onClick={signupHandleSubmit(verifyCode)}
                            sx={{
                                py: 1.5,
                                mt: 1,
                                fontSize: '1rem',
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "none",
                                background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                                boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.4)",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    background: "linear-gradient(to right, #4338ca, #6d28d9)",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 6px 20px 0 rgba(79, 70, 229, 0.6)",
                                },
                                "&:disabled": {
                                    background: "#ccc",
                                    boxShadow: "none"
                                }
                            }}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </Stack>

                    <Typography mt={3} textAlign="center" variant="body2" color="text.secondary">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{
                                fontWeight: 600,
                                color: '#4f46e5',
                                textDecoration: 'none'
                            }}
                        >
                            Log In
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default SignupPage;