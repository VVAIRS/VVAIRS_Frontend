import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ArrowLeft, Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword } = useAuth();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleEmailSubmit = async (data) => {
    const success = await forgotPassword(data);
    if (success) {
      setUserEmail(data.email);
      setStep(2);
      reset(); // Clear form for next step
    }
  };

  const handleResetSubmit = async (data) => {
    const success = await resetPassword({
      email: userEmail,
      code: data.code,
      new_password: data.new_password,
    });
    if (success) {
      // Hook handles navigation on success
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Stack spacing={step === 1 ? 3 : 2}>
            <Box>
              <IconButton
                onClick={() => (step === 1 ? navigate("/login") : setStep(1))}
                sx={{
                  mb: 1,
                  ml: -1,
                  color: "#64748b",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <ArrowLeft size={20} />
              </IconButton>
              <Typography variant="h5" fontWeight={800} color="#1e293b">
                {step === 1 ? "Forgot Password?" : "Reset Password"}
              </Typography>
              <Typography variant="body2" color="#64748b" sx={{ mt: 1 }}>
                {step === 1
                  ? "Enter your email below and we'll send you a code to reset your password."
                  : `Enter the code sent to ${userEmail} and your new password.`}
              </Typography>
            </Box>

            {step === 1 ? (
              <form onSubmit={handleSubmit(handleEmailSubmit)}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      py: 1.5,
                      borderRadius: "12px",
                      bgcolor: "#4f46e5",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#4338ca" },
                    }}
                  >
                    Send Reset Code
                  </Button>
                </Stack>
              </form>
            ) : (
              <form onSubmit={handleSubmit(handleResetSubmit)}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Reset Code"
                    placeholder="Enter 6-digit code"
                    {...register("code", {
                      required: "Reset code is required",
                    })}
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ShieldCheck size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    placeholder="Minimum 6 characters"
                    {...register("new_password", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    error={!!errors.new_password}
                    helperText={errors.new_password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    placeholder="Re-enter new password"
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch("new_password") !== val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />

                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setStep(1)}
                      sx={{
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#e2e8f0",
                        color: "#64748b",
                        "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      sx={{
                        py: 1.5,
                        borderRadius: "12px",
                        bgcolor: "#4f46e5",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#4338ca" },
                      }}
                    >
                      Verify
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;

