import React from "react";
import {
    Card,
    CardContent,
    Box,
    Stack,
    Skeleton
} from "@mui/material";

export default function CandidateCardSkeleton() {
    return (
        <Card
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "250px",
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative"
            }}
        >
            <CardContent sx={{
                p: 2.5,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                        minWidth={0}
                    >
                        <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
                        <Box flex={1}>
                            <Skeleton variant="text" width="60%" height={24} />
                            <Skeleton variant="text" width="40%" height={20} />
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
                        <Skeleton variant="rounded" width={60} height={26} sx={{ mb: 1, borderRadius: 4 }} />
                        <Skeleton variant="text" width={40} height={32} />
                    </Box>
                </Box>

                {/* Quick Info */}
                <Box sx={{
                    flexShrink: 0,
                    minHeight: '70px'
                }}>
                    <Stack spacing={0.75}>
                        <Box display="flex" alignItems="center" gap={0.75}>
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="text" width="80%" />
                        </Box>

                        <Box display="flex" alignItems="center" gap={0.75}>
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="text" width="40%" />
                        </Box>
                    </Stack>
                </Box>

                {/* Skills */}
                <Box
                    mt={2}
                    sx={{
                        flexGrow: 1,
                        minHeight: '60px'
                    }}
                >
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {[1, 2, 3].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rounded"
                                width={60}
                                height={22}
                                sx={{ borderRadius: 1 }}
                            />
                        ))}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
