import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Button,
    Chip,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { Menu as MenuIcon, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const navigationLinks = [
        { name: 'About Us', to: '/#about' },
        { name: 'Pricing', to: '/#pricing' },
    ];

    const toggleDrawer = () => setMobileOpen(!mobileOpen);
    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ minHeight: 80, px: { xs: 1, sm: 3 } }}>

                    {/* Logo */}
                    <Typography
                        component={Link}
                        to="/"
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: 'text.primary',
                            textDecoration: 'none',
                            mr: 4,
                        }}
                    >
                        ResumeZai
                        <Box component="span" sx={{ color: 'primary.main' }}>.</Box>
                    </Typography>

                    {/* Desktop Nav */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        {navigationLinks.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.to}
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    '&:hover': { color: 'text.primary' },
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Desktop Right */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                        <Chip
                            label="$0.00"
                            sx={{
                                bgcolor: 'success.light',
                                color: 'success.dark',
                                fontWeight: 600,
                            }}
                        />

                        <IconButton onClick={handleMenuOpen}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                        </IconButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/profile">Profile</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </Menu>

                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            startIcon={<LogIn size={18} />}
                        >
                            Login
                        </Button>

                        <Button
                            component={Link}
                            to="/signup"
                            variant="contained"
                            startIcon={<UserPlus size={18} />}
                            sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    {/* Mobile Menu Button */}
                    <IconButton
                        sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                anchor="top"
                open={mobileOpen}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        mt: '80px',
                        p: 2,
                    },
                }}
            >
                <List>
                    {navigationLinks.map((item) => (
                        <ListItem
                            key={item.name}
                            component={Link}
                            to={item.to}
                            onClick={toggleDrawer}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        startIcon={<LogIn size={18} />}
                        fullWidth
                    >
                        Login
                    </Button>

                    <Button
                        component={Link}
                        to="/signup"
                        variant="contained"
                        startIcon={<UserPlus size={18} />}
                        fullWidth
                        sx={{ bgcolor: 'grey.900' }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
