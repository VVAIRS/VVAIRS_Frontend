import { useState, useEffect } from "react";
import { IconButton, Stack, Chip, Box, Paper } from "@mui/material";
import { DeleteOutlined, Edit, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DataGrid from "./common/DataGrid";
import DeleteModal from "./common/DeleteModal";
import useDashboard from "../hooks/useDashBoard";
import useModal from "../hooks/useModal";
import Typography from "@mui/material/Typography";

export default function JobGrid({ onDataLoaded }) {
    const { rows, loading, deleteJob } = useDashboard();
    const { open, show, close } = useModal();
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (onDataLoaded) {
            onDataLoaded(rows || []);
        }
    }, [rows, onDataLoaded]);

    const handleJobClick = (jobId) => {
        navigate(`/jobs/${jobId}/candidates`);
    };

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        show();
    };

    const confirmDelete = async () => {
        if (selectedRow) {
            await deleteJob(selectedRow.id);
            close();
        }
    };

    const styles = {
        container: {
            p: 3,
            bgcolor: "#f8f9fa",
            minHeight: "100vh",
        },
        paper: {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.08)",
        },
        dataGrid: {
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f1f5f9",
                color: "#475569",
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
            },
            "& .MuiDataGrid-row": {
                "&:hover": {
                    bgcolor: "#f8fafc",
                },
                cursor: "pointer",
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                color: "#334155",
                fontSize: "0.9rem",
            },
            "& .MuiDataGrid-virtualScroller": {
                bgcolor: "#ffffff",
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e2e8f0",
                bgcolor: "#ffffff",
            },
        },
        statusChip: {
            fontWeight: 600,
            fontSize: "0.75rem",
            height: "24px",
            borderRadius: "6px",
            textTransform: "capitalize",
        },
        titleText: {
            color: "primary.main",
            fontWeight: 600,
            fontSize: "0.95rem",
            textDecoration: "none",
            "&:hover": {
                color: "primary.main",
            },
        },
    };

    const statusStyles = {
        completed: { bg: "#dcfce7", color: "#166534" },
        failed: { bg: "#fee2e2", color: "#991b1b" },
        processing: { bg: "#fef3c7", color: "#92400e" },
    };

    const columns = [
        {
            field: "reportId",
            headerName: "Report ID",
            minWidth: 120,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ color: "#64748b", fontFamily: 'monospace' }}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: "title",
            headerName: "Job Title",
            flex: 1.5,
            minWidth: 200,
            renderCell: (params) => (
                <Typography
                    sx={styles.titleText}
                    onClick={() => handleJobClick(params.row.id)}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 140,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        ...styles.statusChip,
                        bgcolor: statusStyles[params.value]?.bg || "#f1f5f9",
                        color: statusStyles[params.value]?.color || "#475569",
                    }}
                />
            ),
        },
        {
            field: "cost",
            headerName: "Cost ($)",
            type: "numberColumn",
            minWidth: 100,
            headerAlign: 'left',
            align: 'left',
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 500, color: "#334155" }}>
                    ${Number(params.value).toFixed(2)}
                </Typography>
            )
        },
        {
            field: "totalTokens",
            headerName: "Tokens",
            type: "numberColumn",
            minWidth: 120,
            headerAlign: 'left',
            align: 'left',
            renderCell: (params) => (
                <Typography sx={{ color: "#64748b" }}>
                    {params.value?.toLocaleString() || 0}
                </Typography>
            )
        },
        {
            field: "createdOn",
            headerName: "Created Date",
            minWidth: 180,
            renderCell: (params) => (
                <Typography sx={{ color: "#64748b", fontSize: "0.85rem" }}>
                    {new Date(params.value).toLocaleDateString()}
                </Typography>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            minWidth: 140,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                        size="small"
                        onClick={() => handleJobClick(params.row.id)}
                        sx={{
                            color: "#3b82f6",
                            "&:hover": { bgcolor: "#eff6ff" }
                        }}
                    >
                        <VisibilityOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(params.row)}
                        sx={{
                            color: "#ef4444",
                            "&:hover": { bgcolor: "#fef2f2" }
                        }}
                    >
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={styles.container}>
            <Paper elevation={0} sx={styles.paper}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    pageSize={13}
                    height="85vh" // Adjusted height
                    getRowId={(row) => row.id}
                    sx={styles.dataGrid}
                    disableRowSelectionOnClick
                />
            </Paper>

            <DeleteModal
                open={open}
                onCancel={close}
                onConfirm={confirmDelete}
                title="Delete Job"
                description={`Are you sure you want to delete "${selectedRow?.title}"?`}
            />
        </Box>
    );
}
