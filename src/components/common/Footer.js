import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'grey.900',
                color: 'white',
                borderTop: 1,
                borderColor: 'grey.700',
                py: { xs: 8, md: 12 }
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, lg: 8 } }}>
                <Grid container spacing={8}>

                    {/* Logo/Branding Column */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h4"
                            component="span"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.025em',
                                color: 'white'
                            }}
                        >
                            AIRS<Box component="span" sx={{ color: 'grey.500' }}>.</Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2, color: 'grey.400' }}>
                            Hire smarter with AI-powered resume screening.
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 2, color: 'grey.500' }}>
                            © {new Date().getFullYear()} AIRS. All rights reserved.
                        </Typography>
                    </Grid>

                    {/* Links Column 1: Company */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'grey.300',
                                mb: 3
                            }}
                        >
                            Company
                        </Typography>
                        <Stack spacing={2}>
                            <Link href="#about" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                About Us
                            </Link>
                            <Link href="#contact" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                Contact Us
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Links Column 2: Product */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'grey.300',
                                mb: 3
                            }}
                        >
                            Product
                        </Typography>
                        <Stack spacing={2}>
                            <Link href="#pricing" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                Pricing
                            </Link>
                            <Link href="#" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                Features
                            </Link>
                            <Link href="#" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                Dashboard
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Legal Column */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'grey.300',
                                mb: 3
                            }}
                        >
                            Legal
                        </Typography>
                        <Stack spacing={2}>
                            <Link href="#" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                Privacy Policy
                            </Link>
                            <Link href="#" color="grey.400" underline="hover" sx={{ transition: 'color 0.2s', '&:hover': { color: 'white' } }}>
                                Terms of Service
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
