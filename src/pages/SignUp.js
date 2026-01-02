import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Stack,
    InputAdornment,
    Grid,
} from "@mui/material";
import {
    Person,
    Email,
    Lock,
    LockOpen,
    VpnKey,
} from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
const SignupPage = () => {
    const {
        signupRegister,
        signupHandleSubmit,
        signupErrors,
        password,
        isCodeSent,
        loading,
        message,
        sendCode,
        verifyCode,
    } = useAuth();

    return (
        <Grid container component="main" sx={{ height: "100vh", width: "100%", m: 0 }}>
            {/* Left Side: Image Background with Text */}
            <Grid
                item
                xs={12}
                md={7}
                sx={{
                    backgroundImage: "url('/images/Signup.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 4,
                    color: "white",
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        textAlign: "center",
                        maxWidth: "80%",
                    }}
                >
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{
                            mb: 2,
                            fontFamily: "'Roboto', sans-serif",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        Welcome to VVAIRS
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontStyle: "italic",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        }}
                    >
                        Revolutionizing the Future with Cutting-Edge Technology
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.6,
                            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                            fontSize: "1.1rem",
                        }}
                    >
                        Join thousands of innovators and experience seamless solutions tailored for tomorrow. Sign up now and be part of the next big thing!
                    </Typography>
                </Box>
            </Grid>

            {/* Right Side: Form */}
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
                        ml: 10
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        mb={1}
                        sx={{
                            color: "#333",
                            fontFamily: "'Roboto', sans-serif",
                        }}
                    >
                        Create Your Account
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
                        Join us today and get started
                    </Typography>

                    {message.text && (
                        <Alert
                            severity={message.type}
                            sx={{
                                width: '100%',
                                mb: 3,
                                borderRadius: 2,
                                fontWeight: "bold",
                            }}
                        >
                            {message.text}
                        </Alert>
                    )}

                    <Stack spacing={3} width="100%">
                        <TextField
                            label="Username"
                            fullWidth
                            disabled={isCodeSent}
                            {...signupRegister("username", { required: "Username required" })}
                            error={!!signupErrors.username}
                            helperText={signupErrors.username?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: "#667eea" }} />
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
                            label="Email"
                            type="email"
                            fullWidth
                            disabled={isCodeSent}
                            {...signupRegister("email", { required: "Email required" })}
                            error={!!signupErrors.email}
                            helperText={signupErrors.email?.message}
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
                            disabled={isCodeSent}
                            {...signupRegister("password", { required: "Password required" })}
                            error={!!signupErrors.password}
                            helperText={signupErrors.password?.message}
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

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            disabled={isCodeSent}
                            {...signupRegister("confirmPassword", {
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            error={!!signupErrors.confirmPassword}
                            helperText={signupErrors.confirmPassword?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpen sx={{ color: "#667eea" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="OTP Code"
                                fullWidth
                                disabled={!isCodeSent}
                                {...signupRegister("code", {
                                    required: isCodeSent && "OTP required",
                                })}
                                error={!!signupErrors.code}
                                helperText={signupErrors.code?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKey sx={{ color: "#667eea" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                            <Button
                                variant="contained"
                                disabled={loading || isCodeSent}
                                onClick={signupHandleSubmit(sendCode)}
                                sx={{
                                    background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                                    color: "white",
                                    borderRadius: 2,
                                    fontWeight: "bold",
                                    "&:hover": {
                                        background: "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                                    },
                                    minWidth: { xs: "100%", sm: "auto" },
                                }}
                            >
                                {loading ? "Sending..." : "Send Code"}
                            </Button>
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={!isCodeSent || loading}
                            onClick={signupHandleSubmit(verifyCode)}
                            sx={{
                                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                                color: "white",
                                borderRadius: 2,
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                padding: 1.5,
                                "&:hover": {
                                    background: "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                                },
                                "&:disabled": {
                                    background: "#ccc",
                                },
                            }}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </Stack>

                    <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{
                            mt: 3,
                            color: "#666",
                        }}
                    >
                        By signing up, you agree to our Terms & Conditions. Experience the best with VVAIRS!
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignupPage;