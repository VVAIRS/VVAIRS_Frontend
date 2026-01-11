import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, keyframes, Paper } from '@mui/material';
import { FileText, Sparkles, Tag, PieChart, Gift, Activity, Lock } from 'lucide-react';

// Data for the features with shortened descriptions
const features = [
    {
        name: 'Auto Resume Screening',
        description: 'Instantly scan, parse, and structure hundreds of resumes at once.',
        IconComponent: FileText,
    },
    {
        name: 'AI-Powered Matching',
        description: 'Algorithms evaluate candidates against job descriptions for a perfect match score.',
        IconComponent: Sparkles,
    },
    {
        name: 'Job ID Management',
        description: 'Organize and track hiring campaigns using a unique ID for each upload.',
        IconComponent: Tag,
    },
    {
        name: 'Scoring Dashboard',
        description: 'View names, contacts, and AI-generated scores in a clean, exportable dashboard.',
        IconComponent: PieChart,
    },
    {
        name: 'Transparent Credits',
        description: 'Get $5 free credits to analyze and see the power of AIRS before purchasing more.',
        IconComponent: Gift,
    },
    {
        name: 'Real-Time Insights',
        description: 'Monitor total resumes, credits consumed, and candidate analytics at a glance.',
        IconComponent: Activity,
    },
    {
        name: 'Secure & Private',
        description: 'All your uploaded data remains fully encrypted, isolated, and confidential.',
        IconComponent: Lock,
    },
];

// Combine the features array twice for a seamless looping effect
const allFeatures = [...features, ...features];

// Define keyframes for the scrolling animation
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } 
`;

const FeaturesGrid = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, lg: 8 } }}>
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        fontWeight: 800,
                        color: 'text.primary',
                        fontSize: { xs: '2.25rem', sm: '3rem' },
                        mb: 8,
                        letterSpacing: '-0.025em'
                    }}
                >
                    Key Highlights
                </Typography>

                {/* --- Animation Container (Hides Overflow) --- */}
                <Box sx={{ position: 'relative', overflow: 'hidden', py: 2 }}>

                    {/* --- Scrolling Track --- */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            width: '200%',
                            animation: isLoaded ? `${scrollLeft} 45s linear infinite` : 'none',
                            willChange: 'transform',
                            '&:hover': {
                                animationPlayState: 'paused'
                            }
                        }}
                    >
                        {allFeatures.map((feature, index) => {
                            const Icon = feature.IconComponent;

                            return (
                                <Paper
                                    key={index}
                                    elevation={1}
                                    sx={{
                                        position: 'relative',
                                        bgcolor: 'background.paper',
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'grey.200',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease-out',
                                        minWidth: { xs: '160px', lg: '207px' },
                                        maxWidth: { xs: '160px', lg: '207px' },
                                        aspectRatio: '1 / 1',
                                        p: { xs: 1.5, lg: 2 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            boxShadow: 6,
                                            transform: 'scale(1.05)',
                                            zIndex: 1,
                                            '& .icon-container': {
                                                color: 'grey.100',
                                                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))'
                                            }
                                        }
                                    }}
                                >
                                    {/* --- ICON INTEGRATION --- */}
                                    <Box
                                        className="icon-container"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 36,
                                            width: 36,
                                            borderRadius: 2,
                                            bgcolor: 'grey.800',
                                            color: 'grey.400',
                                            boxShadow: 1,
                                            mb: 1, // Adjusted margin
                                            alignSelf: 'flex-start', // Align icon to the left like default flex-col
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <Icon size={16} /> {/* Directly use size prop for Lucide icons */}
                                    </Box>

                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'text.primary',
                                            lineHeight: 1.2,
                                            mt: 0.5,
                                            mb: 0.5
                                        }}
                                    >
                                        {feature.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.3,
                                            fontSize: '0.875rem',
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            );
                        })}
                    </Box>
                </Box>

            </Container>
        </Box>
    );
};

export default FeaturesGrid;
