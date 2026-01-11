import { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import CreateJobContainer from "../components/CreateJobContainer";
import JobGrid from "../components/JobsGrid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToExcel } from "../utils/ExportToExcel";

export default function JobsDashboardPage() {
    const [jobData, setJobData] = useState([]);

    const handleExportExcel = () => {
        const exportData = jobData.map(({ id, ...rest }) => rest);
        ExportToExcel(exportData, "Jobs_Report");
    };


    return (
        <Box
            sx={{
                pt: "100px",
                px: 3,
                pb: 3,
                bgcolor: "white",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant="h5" fontWeight={700}>
                    Your Jobs
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FileDownloadIcon />}
                        onClick={handleExportExcel}
                        disabled={!jobData.length}
                    >
                        Export Excel
                    </Button>

                    <CreateJobContainer />
                </Stack>
            </Box>

            {/* Grid */}
            <Box sx={{ flexGrow: 1 }}>
                <JobGrid onDataLoaded={setJobData} />
            </Box>
        </Box>
    );
}
