import { useState } from "react";
import { Typography, Box, Tabs, Tab, Link, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CandidatesGrid from "../components/CandidatesGrid";
import CandidatesCards from "../components/CandidatesCard";
import Charts from "./Charts";
export default function CandidatesDashboardPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [candidatesData, setCandidatesData] = useState([]); // ✅ always array
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };


    return (
        <Box sx={{ p: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Link
                        component="button"
                        underline="none"
                        sx={{
                            fontSize: "1.2rem",
                            color: "black",
                            "&:hover": { color: "black" },
                        }}
                        onClick={() => navigate("/")}
                    >
                        Jobs /
                    </Link>

                    <Typography variant="h6" fontWeight={600}>
                        Candidates Dashboard
                    </Typography>
                </Box>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Cards" />
                    <Tab label="Table" />
                    <Tab label="Stats" />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            {activeTab === 0 && (
                <CandidatesCards onDataLoaded={setCandidatesData} />
            )}

            {activeTab === 1 && (
                <CandidatesGrid onDataLoaded={setCandidatesData} />
            )}

            {activeTab === 2 && (
                <Charts />
            )}
        </Box>
    );
}
