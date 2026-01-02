import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Stack,
    InputAdornment,
    Backdrop,
    CircularProgress,
    Divider,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
    const {
        loginRegister,
        loginHandleSubmit,
        loginErrors,
        loginLoading,
        loginUser
    } = useAuth();

    // Handle Google OAuth login
    const handleGoogleLogin = () => {
        // Redirect to your backend Google OAuth endpoint
        window.location.href = `http://resumezai-cqfzgtffhheqfrfg.centralindia-01.azurewebsites.net/api/auth/login/google`;
    };

    return (
        <>
            {/* FULL PAGE LOADER */}
            <Backdrop
                open={loginLoading}
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    color: "#fff",
                }}
            >
                <CircularProgress size={60} color="inherit" />
            </Backdrop>

            <Grid container component="main" sx={{ height: "100vh", width: "100%", m: 0 }}>
                {/* LEFT SIDE – IMAGE */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        backgroundImage: "url('/images/Signup.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: { xs: 2, md: 4 },
                        color: "white",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            textAlign: "center",
                            maxWidth: { xs: "90%", md: "80%" },
                            px: 2,
                        }}
                    >
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            sx={{
                                mb: 2,
                                fontFamily: "'Roboto', sans-serif",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                                fontSize: { xs: "2rem", md: "3rem" },
                            }}
                        >
                            Welcome to VVAIRS
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                mb: 3,
                                fontStyle: "italic",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                                fontSize: { xs: "1.2rem", md: "1.5rem" },
                            }}
                        >
                            Revolutionizing the Future with Cutting-Edge Technology
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.6,
                                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                                fontSize: { xs: "1rem", md: "1.1rem" },
                            }}
                        >
                            Join thousands of innovators and experience seamless solutions tailored
                            for tomorrow. Sign up now and be part of the next big thing!
                        </Typography>
                    </Box>
                </Grid>

                {/* RIGHT SIDE – FORM */}
                <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 4,
                        backgroundColor: "white",
                        minHeight: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 500,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            ml: 12
                        }}
                    >
                        <Typography
                            variant="h4"
                            align="center"
                            fontWeight="bold"
                            mb={1}
                            ml={10}
                            sx={{
                                color: "#333",
                                fontFamily: "'Roboto', sans-serif",
                            }}
                        >
                            Login
                        </Typography>

                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 3, ml: 12 }}
                        >
                            Enter your credentials to continue
                        </Typography>

                        {/* Google OAuth Button */}
                        <Box sx={{ width: "150%", mb: 3 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={handleGoogleLogin}
                                disabled={loginLoading}
                                sx={{
                                    borderColor: "#dadce0",
                                    color: "#3c4043",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    py: 1.5,
                                    borderRadius: 2,
                                    "&:hover": {
                                        borderColor: "#d2d3d4",
                                        backgroundColor: "#f8f9fa",
                                    },
                                    display: "flex",
                                    gap: 2,
                                    ml: 12,
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                                    <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z" />
                                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
                                </svg>
                                Continue with Google
                            </Button>

                            <Divider sx={{ my: 3, ml: 25 }}>
                                <Typography variant="body2" color="text.secondary">
                                    OR
                                </Typography>
                            </Divider>
                        </Box>

                        <form onSubmit={loginHandleSubmit(loginUser)} style={{ width: "100%" }}>
                            <Stack spacing={3} width="150%">
                                <TextField
                                    label="Email"
                                    fullWidth
                                    {...loginRegister("email", { required: "Email is required" })}
                                    error={!!loginErrors.email}
                                    helperText={loginErrors.email?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: "#667eea" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                        },
                                    }}
                                />

                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    {...loginRegister("password", { required: "Password is required" })}
                                    error={!!loginErrors.password}
                                    helperText={loginErrors.password?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: "#667eea" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                        },
                                    }}
                                />

                                <Button
                                    type="submit"
                                    size="large"
                                    disabled={loginLoading}
                                    sx={{
                                        background:
                                            "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                                        color: "white",
                                        fontWeight: "bold",
                                        borderRadius: 2,
                                        py: 1.5,
                                        minHeight: 48,
                                        "&:hover": {
                                            background:
                                                "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                        },
                                        "&:disabled": {
                                            background: "#ccc",
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>

                        <Typography textAlign="center" mt={3} ml={12}>
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                style={{
                                    fontWeight: "bold",
                                    color: "#667eea",
                                    textDecoration: "none",
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;