import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    CircularProgress,
    Paper,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Fade,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useUploadJob from "../hooks/useUploadJobs";
import useModal from "../hooks/useModal";
function Loader() {
    return (
        <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
            <CircularProgress size={40} />
            <Typography variant="h6" fontWeight={600} color="primary.main">
                Creating Job...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Your job posting is being processed. This may take a few moments.
            </Typography>
        </Box>
    );
}

/* ================= YUP SCHEMA ================= */
const schema = yup.object({
    title: yup.string().trim().required("Job title is required"),
    jd_text: yup.string().trim().required("Job description is required"),
});

export default function CreateJobContainer() {
    const navigate = useNavigate();
    const { open, show, close } = useModal();
    const { uploadJob, loading, success, error } = useUploadJob();
    const [showLoader, setShowLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        close();
        setShowLoader(true);

        try {
            const result = await uploadJob({
                title: data.title,
                jd_text: data.jd_text,

            });

            console.log("Result from uploadJob:", result);
            const jobId = result?.job_id;

            console.log("Extracted job_id:", jobId);

            if (!jobId) {
                console.error("❌ No job_id found in response:", result);
                alert("Error: Job ID not returned from API.");
                setShowLoader(false);
                return;
            }

            reset();

            // Redirect to job-specific candidates page
            setTimeout(() => {
                console.log(`✅ Navigating to: /jobs/${jobId}/candidates`);
                navigate(`/jobs/${jobId}/candidates`);
            }, 5000);

        } catch (err) {
            console.error('❌ Upload error:', err);
            alert(`Upload failed: ${err.message}`);
            setShowLoader(false);
        }
    };

    return (
        <>
            {/* Global Loader */}
            {showLoader && <Loader />}

            {/* Success/Error Messages */}
            {success && !showLoader && (
                <Alert
                    severity="success"
                    sx={{
                        mb: 2,
                        borderRadius: 2
                    }}
                >
                    ✅ Job created successfully! Redirecting to candidates...
                </Alert>
            )}

            {error && !showLoader && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    ❌ Upload failed. Please try again.
                </Alert>
            )}

            {/* Create Job Button */}
            <Stack direction="row" justifyContent="flex-end">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={show}
                    sx={{
                        px: 3,
                        py: 1.2,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        background:
                            "linear-gradient(135deg, #1976d2, #0d47a1)",
                        boxShadow: "0 6px 20px rgba(25,118,210,0.35)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #1565c0, #0b3c91)",
                        },
                    }}
                >
                    Create Job
                </Button>
            </Stack>

            {/* Modal */}
            <Dialog
                open={open && !showLoader}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && !loading) {
                        close();
                    }
                }}
                fullWidth
                maxWidth="sm"
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        backdropFilter: "blur(10px)",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        background:
                            "linear-gradient(135deg, #1976d2, #1565c0)",
                        color: "#fff",
                        py: 2,
                    }}
                >
                    <WorkOutlineIcon />
                    <Typography fontWeight={600} flexGrow={1}>
                        Create New Job
                    </Typography>
                    <IconButton
                        onClick={close}
                        sx={{ color: "#fff" }}
                        disabled={loading}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 0,
                            background:
                                "linear-gradient(180deg, #f9fbff, #ffffff)",
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Stack spacing={2.8}>
                                <TextField
                                    label="Job Title"
                                    placeholder="e.g. Frontend Developer"
                                    fullWidth
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    {...register("title")}
                                    disabled={loading}
                                />
                                <TextField
                                    label="Job Description"
                                    placeholder="Describe role, responsibilities & requirements"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={!!errors.jd_text}
                                    helperText={errors.jd_text?.message}
                                    {...register("jd_text")}
                                    disabled={loading}
                                />
                                <Divider />
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={close}
                                        disabled={loading}
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        sx={{
                                            minWidth: 160,
                                            borderRadius: 2,
                                            background:
                                                "linear-gradient(135deg, #1976d2, #0d47a1)",
                                        }}
                                    >
                                        Create Job
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Paper>
                </DialogContent>
            </Dialog>
        </>
    );
}