import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import LucideIcon from './LucideIcon';

export default function Header({ brand, items, cta, ...rest }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  const onNav = (href) => {
    setOpen(false);

    // Handle hash links on the same page
    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '#');
      if (pathname === '/' || pathname === '/index.html') {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    navigate(href);
  };

  const isActive = (it) => {
    if (pathname.endsWith(it.href) && it.href !== '/' && !it.href.includes('#')) return true;
    if ((pathname === '/' || pathname === '/index.html') && it.href === '/') return true;
    return false;
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }} {...rest}>
      <Toolbar sx={{ maxWidth: 1160, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 }, justifyContent: 'space-between' }}>
        <Box
          component="a"
          onClick={(e) => { e.preventDefault(); onNav('/'); }}
          href="/"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
        >
          <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <LucideIcon name="scan" size={24} color="#fff" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={800} color="text.primary" lineHeight={1.2}>
              {brand}
            </Typography>
            <Typography variant="caption" color="text.secondary" display={{ xs: 'none', sm: 'block' }}>
              Secure AI hiring workflows
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {items.map((it, idx) => (
            <Button
              key={idx}
              onClick={() => onNav(it.href)}
              color={isActive(it) ? 'primary' : 'inherit'}
              sx={{ fontWeight: 600, color: isActive(it) ? 'primary.main' : 'text.secondary' }}
            >
              {it.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
            <LucideIcon name="keyboard" size={16} />
            <span>Press <Box component="span" sx={{ border: 1, borderColor: 'divider', borderRadius: 1, px: 0.5, bgcolor: 'grey.100' }}>D</Box> for demo</span>
          </Box> */}

          {cta && (
            <Button
              variant="contained"
              onClick={cta.onClick}
              endIcon={<LucideIcon name="arrow-right" size={16} />}
              sx={{ display: { xs: 'none', md: 'inline-flex' } }}
            >
              {cta.label}
            </Button>
          )}

          <IconButton onClick={() => setOpen(true)} sx={{ display: { md: 'none' }, border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

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
                  <ListItemText primary={it.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {cta && (
            <Box mt={2} px={2}>
              <Button fullWidth variant="contained" onClick={() => { setOpen(false); cta.onClick(); }} endIcon={<LucideIcon name="arrow-right" size={16} />}>
                {cta.label}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}