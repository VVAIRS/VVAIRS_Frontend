import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const DeleteModal = ({
    open,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onCancel,
    onConfirm,
}) => {
    if (!open) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1300,
            }}
        >
            <Paper sx={{ p: 3, width: 400, position: "relative" }}>
                <IconButton
                    onClick={onCancel}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {description}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={onConfirm}>
                        Delete
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default DeleteModal;
