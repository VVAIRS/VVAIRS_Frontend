import { DataGrid } from "@mui/x-data-grid";
import { Paper, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledPaper = styled(Paper)(({ theme }) => ({
    background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
    border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    borderRadius: "16px",
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: "none",
    borderRadius: "12px",

    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
        justifyContent: "center",
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "#475569",
    },

    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 600,
        width: "100%",
        textAlign: "center",
    },

    "& .MuiDataGrid-columnHeaders": {
        background: "linear-gradient(90deg, #f8fafc, #e2e8f0)",
        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    },

    "& .MuiDataGrid-row:hover": {
        backgroundColor: alpha("#3b82f6", 0.04),
    },
}));

/* ================= COLUMNS ================= */

