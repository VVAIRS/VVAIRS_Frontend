import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography, Chip, useTheme, useMediaQuery } from '@mui/material';
import dashMainImg from '../../assets/dash-main.png';

// Recommended Image URL
const AI_SCREENING_DASHBOARD_IMAGE = dashMainImg;

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            bgcolor: 'background.paper',
            pt: { xs: 12, md: 16 },
            pb: { xs: 8, md: 10 }
        }}>
            <Container maxWidth="xl" sx={{ textAlign: 'center', px: { xs: 2, sm: 4, lg: 8 } }}>

                {/* $5 Free Credits Banner */}
                <Box sx={{ display: 'inline-block', mb: 2 }}>
                    <Chip
                        label={
                            <Typography variant="body2" component="span" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                ⚡ New users get <Box component="span" sx={{ fontWeight: 'bold' }}>$5 free credits</Box> to experience intelligent screening!
                            </Typography>
                        }
                        sx={{
                            bgcolor: 'grey.100',
                            px: 1,
                            py: 0.5,
                            height: 'auto',
                            '& .MuiChip-label': { padding: 0 },
                            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                        }}
                    />
                </Box>

                {/* Headline */}
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 800,
                        color: 'text.primary',
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
                        lineHeight: { xs: 1.2, md: 1.1 },
                        letterSpacing: '-0.02em',
                        mb: 3
                    }}
                >
                    Streamline Your Hiring with{' '}
                    <Box component="span" sx={{ color: 'text.secondary' }}>AI-Powered Resume Screening</Box>
                </Typography>

                {/* Subheadline */}
                <Typography
                    variant="h5"
                    sx={{
                        mt: 3,
                        maxWidth: '800px',
                        mx: 'auto',
                        color: 'text.secondary',
                        fontSize: { xs: '1.125rem', md: '1.25rem' },
                        lineHeight: 1.6
                    }}
                >
                    Let ResumeZai handle resume analysis, job matching, and candidate scoring — so you can focus on what truly matters: <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>hiring the right talent.</Box>
                </Typography>

                {/* Call to Action Button */}
                <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        component={Link}
                        to="/dashboard"
                        variant="contained"
                        size="large"
                        sx={{
                            px: 5,
                            py: 2,
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            color: 'white',
                            bgcolor: 'grey.900',
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: 6,
                            '&:hover': {
                                bgcolor: 'grey.800',
                                boxShadow: 10,
                            },
                        }}
                    >
                        Start Screening for Free
                    </Button>
                </Box>

                {/* --- IMAGE INTEGRATION: AI Screening Dashboard --- */}
                <Box
                    sx={{
                        mt: 8,
                        mx: 'auto',
                        bgcolor: 'grey.800',
                        borderRadius: 4,
                        boxShadow: 24,
                        overflow: 'hidden',
                        height: { xs: 250, sm: 350, md: 450 },
                        maxWidth: '1000px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2
                    }}
                >
                    <Box
                        component="img"
                        src={AI_SCREENING_DASHBOARD_IMAGE}
                        alt="AI Resume Screening Dashboard showing candidate rankings"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 3,
                            opacity: 0.85,
                        }}
                    />
                </Box>
                {/* ------------------------------------------------ */}

                {/* Tagline */}
                <Typography variant="h6" sx={{ mt: 5, fontWeight: 600, color: 'text.secondary' }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>Fast. Accurate. AI-driven.</Box>
                </Typography>

            </Container>
        </Box>
    );
};

export default HeroSection;
