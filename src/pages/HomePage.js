import React from 'react';
import { Box } from '@mui/material';

// Assuming these components are defined below or in separate files
// import Navbar from "../components/Navbar";
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import FeaturesGrid from '../components/home/FeatureGrid';

// The main component that renders the full homepage
const HomePage = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
                overflowX: 'hidden'
            }}
        >
            <Box component="main">
                <HeroSection />
                <AboutSection />
                <FeaturesGrid />
            </Box>
        </Box>
    );
};

export default HomePage;
