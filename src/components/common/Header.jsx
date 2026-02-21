import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import LucideIcon from "./LucideIcon";
import { useAuthContext } from "../../context/AuthContext";
import { logout } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
export default function Header({ brand, cta, ...rest }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const { logoutUser } = useAuth();
  const { isAuthenticated, loading, checkAuth } = useAuthContext();

  const profileMenuOpen = Boolean(anchorEl);

  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },

    isAuthenticated === false && { label: "Signup", href: "/signup" },
    isAuthenticated === false && { label: "Login", href: "/login" },
    // Added Jobs link for authenticated users
    isAuthenticated === true && { label: "Jobs", href: "/jobs" },
  ].filter(Boolean);

  const onNav = href => {
    setOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.replace("/#", "#");
      if (pathname === "/" || pathname === "/index.html") {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    navigate(href);
  };

  const isActive = it => {
    if (pathname.endsWith(it.href) && it.href !== "/" && !it.href.includes("#"))
      return true;
    if ((pathname === "/" || pathname === "/index.html") && it.href === "/")
      return true;
    return false;
  };

  const handleProfileClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleProfileClose();
    logoutUser();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
      }}
      {...rest}
    >
      <Toolbar
        sx={{
          maxWidth: 1160,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box
          component="a"
          onClick={e => {
            e.preventDefault();
            onNav("/");
          }}
          href="/"
          sx={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <LucideIcon name="scan" size={24} color="#fff" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={800}>
              {brand}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display={{ xs: "none", sm: "block" }}
            >
              Secure AI hiring workflows
            </Typography>
          </Box>
        </Box>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {items.map((it, idx) => (
            <Button
              key={idx}
              onClick={() => onNav(it.href)}
              color={isActive(it) ? "primary" : "inherit"}
              sx={{
                fontWeight: 600,
                color: isActive(it) ? "primary.main" : "text.secondary",
              }}
            >
              {it.label}
            </Button>
          ))}
        </Box>

        {/* Right Section */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {cta && isAuthenticated === false && (
            <Button
              variant="contained"
              onClick={cta.onClick}
              endIcon={<LucideIcon name="arrow-right" size={16} />}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              {cta.label}
            </Button>
          )}

          {/* Profile Icon */}
          {isAuthenticated && (
            <>
              <IconButton onClick={handleProfileClick}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={profileMenuOpen}
                onClose={handleProfileClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {/* Mobile Menu */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: { md: "none" },
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <Box p={2} pt={1}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {items.map((it, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton onClick={() => onNav(it.href)}>
                  <ListItemText
                    primary={it.label}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {isAuthenticated && (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/profile")}>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText
                      primary="Logout"
                      sx={{ color: "error.main" }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
