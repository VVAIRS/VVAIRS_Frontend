import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCandidates from "../hooks/useCandidates";
import CandidateCardTemplate from "./CandidateCardTemplate";
import CandidateCardSkeleton from "./CandidateCardSkeleton";
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


    const LoadingSkeletons = () => (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            px: 2,
            justifyContent: { xs: "center", sm: "flex-start" }
        }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <Box
                    key={item}
                    sx={{
                        width: { xs: "100%", sm: "435px", md: "435px" },
                        flexGrow: 0,
                        flexShrink: 0
                    }}
                >
                    <CandidateCardSkeleton />
                </Box>
            ))}
        </Box>
    );

    if (candidatesLoading && !pollingLoading) {
        return <LoadingSkeletons />;
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
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                px: 2,
                justifyContent: { xs: "center", sm: "flex-start" }
            }}>
                {safeCandidates.map((candidate) => (
                    <Box
                        key={candidate.id}
                        sx={{
                            width: { xs: "100%", sm: "435px", md: "435px" },
                            flexGrow: 0,
                            flexShrink: 0
                        }}
                    >
                        <CandidateCardTemplate
                            data={candidate}
                            onClick={() => handleCardClick(candidate)}
                        />
                    </Box>
                ))}
            </Box>

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
