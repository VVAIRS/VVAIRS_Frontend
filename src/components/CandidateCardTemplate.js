import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Avatar,
    Tooltip
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";

export default function CandidateCardTemplate({ data, onClick }) {
    const avatarColors = [
        "#1D4ED8", // blue
        "#059669", // green
        "#7C3AED", // purple
        "#DC2626", // red
        "#D97706", // amber
        "#0F766E", // teal
        "#9333EA", // violet
        "#2563EB"  // indigo
    ];

    const getAvatarColor = (name = "") => {
        const charCode = name.charCodeAt(0);
        return avatarColors[charCode % avatarColors.length];
    };

    const statusStyles = {
        shortlisted: { bg: "#DCFCE7", color: "#166534" },
        rejected: { bg: "#FEE2E2", color: "#991B1B" },
        pending: { bg: "#FEF3C7", color: "#92400E" }
    };

    return (
        <Card
            onClick={onClick}
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "250px", // Fixed height for uniformity
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
                cursor: "pointer",
                transition: "0.25s",
                display: "flex",
                flexDirection: "column",
                position: "relative", // Ensure positioning context if needed
                "&:hover": {
                    boxShadow: 6,
                    borderColor: "primary.main",
                    transform: "translateY(-4px)"
                }
            }}
        >
            <CardContent sx={{
                p: 2.5,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Distribute space
                overflow: 'hidden'
            }}>
                {/* Header */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                    sx={{ flexShrink: 0 }}
                >
                    {/* Avatar + Name */}
                    <Box
                        display="flex"
                        gap={1.5}
                        alignItems="center"
                        flex={1}
                        minWidth={0} // Important for text overflow handling
                    >
                        <Avatar
                            sx={{
                                bgcolor: getAvatarColor(data.name),
                                fontWeight: 600,
                                width: 40,
                                height: 40,
                                flexShrink: 0
                            }}
                        >
                            {data.name?.charAt(0)?.toUpperCase()}
                        </Avatar>

                        <Box minWidth={0}> {/* This allows text wrapping */}
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                sx={{
                                    wordBreak: 'break-word', // Break long names
                                    overflowWrap: 'break-word', // Modern alternative
                                    lineHeight: 1.3
                                }}
                            >
                                {data.name}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Match Score */}
                    <Box
                        ml={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        flexShrink={0}
                    >
                        <Chip
                            label={data.status}
                            sx={{
                                mb: 1,
                                px: 1.5,
                                height: 26,
                                fontSize: "0.8rem",
                                bgcolor: statusStyles[data.status]?.bg,
                                color: statusStyles[data.status]?.color,
                                textTransform: "capitalize",
                                fontWeight: 600
                            }}
                        />

                        <Typography
                            variant="body1"
                            fontWeight={700}
                            lineHeight={2}
                            sx={{
                                color:
                                    data.match_score >= 85
                                        ? "#166534"     // green
                                        : data.match_score >= 50
                                            ? "#92400E"     // amber
                                            : "#991B1B"     // red
                            }}
                        >
                            {data.match_score}%
                        </Typography>
                    </Box>
                </Box>

                {/* Quick Info - Fixed height section */}
                <Box
                    display="flex"
                    alignItems="center"
                    width="100%"
                >
                    {/* 75% Email */}
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={0.75}
                        sx={{ width: "75%", minWidth: 0 }}
                    >
                        <EmailOutlinedIcon fontSize="small" color="action" />
                        <Typography
                            variant="body2"
                            sx={{
                                wordBreak: "break-word",
                                overflowWrap: "break-word"
                            }}
                        >
                            {data.email}
                        </Typography>
                    </Box>

                    {/* 25% Centered View Icon */}
                    <Box
                        sx={{
                            width: "25%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Tooltip title="View Resume" arrow>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (data.resume_url) {
                                        window.open(data.resume_url, "_blank", "noopener,noreferrer");
                                    }
                                }}
                            >
                                <VisibilityOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                            </IconButton>
                        </Tooltip>

                    </Box>
                </Box>



                {/* Skills - Flexible height but with min height */}
                <Box
                    mt={2}
                    sx={{
                        flexGrow: 1,
                        minHeight: '60px' // Reserve minimum space for skills
                    }}
                >
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {data.skills
                            ?.split(",")
                            .slice(0, 3) // Show up to 3 skills
                            .map((skill, index) => (
                                <Chip
                                    key={`${skill}-${index}`}
                                    label={skill.trim()}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        height: 22,
                                        fontSize: "0.7rem",
                                        maxWidth: '100px', // Limit chip width
                                        '& .MuiChip-label': {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }
                                    }}
                                />
                            ))}

                        {data.skills?.split(",").length > 3 && (
                            <Chip
                                label={`+${data.skills.split(",").length - 3}`}
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: "0.7rem",
                                    bgcolor: "action.hover"
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}