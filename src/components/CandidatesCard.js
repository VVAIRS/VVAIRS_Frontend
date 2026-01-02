import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCandidates from "../hooks/useCandidates";
import CandidateCardTemplate from "./CandidateCardTemplate";
import {
    Grid,
    CircularProgress,
    Typography,
    Box,
    Button,
    Backdrop
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CandidateModal from "./CandidateModal";
import useModal from "../hooks/useModal";
import UploadResumesContainer from "./UploadResumesContainer";
import SequentialAILoader from "./common/SequentialLoader";
export default function CandidatesCards({ onDataLoaded }) {
    const { jobId } = useParams();

    const [open, setOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const { open: uploadOpen, show: uploadShow, close: uploadClose } = useModal();

    const {
        candidatesData,
        candidatesLoading,
        pollingLoading,
        pollCandidatesUntilDone,
        initCandidates,
    } = useCandidates();

    const safeCandidates = Array.isArray(candidatesData) ? candidatesData : [];

    useEffect(() => {
        initCandidates(jobId);
    }, [jobId]);

    useEffect(() => {
        onDataLoaded?.(safeCandidates);
    }, [safeCandidates, onDataLoaded]);

    const handleCardClick = (candidate) => {
        setSelectedCandidate(candidate);
        setOpen(true);
    };

    const handleUploadCompleted = async () => {
        await pollCandidatesUntilDone(jobId);
        uploadClose();
    };


    if (candidatesLoading && !pollingLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Backdrop
                open={pollingLoading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.modal + 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        p: 4,
                        borderRadius: 3,
                        minWidth: 280,
                    }}
                >
                    {/* AI Loader */}
                    <SequentialAILoader />

                    <Typography variant="h6" fontWeight={600}>
                        Analyzing resumes…
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        Our AI is matching and ranking candidates
                    </Typography>
                </Box>
            </Backdrop>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mr: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={uploadShow}
                >
                    Upload Resumes
                </Button>
            </Box>
            {safeCandidates.length === 0 && !pollingLoading && (
                <Typography align="center" sx={{ mt: 4 }}>
                    No candidates found
                </Typography>
            )}
            <Grid container spacing={2} sx={{ px: 2 }}>
                {safeCandidates.map((candidate) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={3}
                        sx={{
                            flexBasis: { md: '24%', lg: '24%', xl: '24%' },
                            maxWidth: { md: '24%', lg: '24%', xl: '24%' },
                            flexGrow: 0,
                            flexShrink: 0
                        }}
                        key={candidate.id}
                    >
                        <CandidateCardTemplate
                            data={candidate}
                            onClick={() => handleCardClick(candidate)}
                        />
                    </Grid>
                ))}
            </Grid>

            <UploadResumesContainer
                open={uploadOpen}
                onClose={uploadClose}
                onUploadCompleted={handleUploadCompleted}
            />

            <CandidateModal
                open={open}
                onClose={() => setOpen(false)}
                data={selectedCandidate}
            />
        </>
    );
}
