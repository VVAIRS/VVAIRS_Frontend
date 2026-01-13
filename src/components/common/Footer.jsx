import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';
import { getCurrentYear } from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import LucideIcon from './LucideIcon';

export default function Footer({ brand, ...rest }) {
  const year = getCurrentYear();
  const navigate = useNavigate();

  const navTo = (href) => {
    // Use navigate directly for hash links too, similar to Header
    if (href.startsWith('/#') && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(href);
  };

  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', py: 8 }} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <LucideIcon name="scan" size={24} color="#fff" />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={800} color="text.primary">
                  {brand}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Enterprise-ready hiring automation
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.6 }}>
              Secure, scalable resume screening with self-hosted AI models, bulk processing, and recruiter-first workflows.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" textTransform="uppercase" display="block" mb={2}>
              Product
            </Typography>
            <Stack spacing={1}>
              <Link component="button" variant="body2" color="text.secondary" onClick={() => navTo('/#features')} textAlign="left" underline="hover">Features</Link>
              <Link component="button" variant="body2" color="text.secondary" onClick={() => navTo('/#why')} textAlign="left" underline="hover">Why Us</Link>
              <Link component="button" variant="body2" color="text.secondary" onClick={() => navTo('/pricing')} textAlign="left" underline="hover">Pricing</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" textTransform="uppercase" display="block" mb={2}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link component="button" variant="body2" color="text.secondary" onClick={() => navTo('/about')} textAlign="left" underline="hover">About</Link>
              <Link component="button" variant="body2" color="text.secondary" onClick={() => navTo('/#usecases')} textAlign="left" underline="hover">Use Cases</Link>
              <Link component="button" variant="body2" color="text.secondary" onClick={() => navTo('/pricing')} textAlign="left" underline="hover">Request Demo</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" textTransform="uppercase" display="block" mb={2}>
              Security
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1}>
                <LucideIcon name="lock" size={16} color="#64748b" style={{ marginTop: 3 }} />
                <Typography variant="body2" color="text.secondary">Self-hosted models, strict isolation</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LucideIcon name="shield-check" size={16} color="#64748b" style={{ marginTop: 3 }} />
                <Typography variant="body2" color="text.secondary">Privacy-forward data flow design</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LucideIcon name="file-check" size={16} color="#64748b" style={{ marginTop: 3 }} />
                <Typography variant="body2" color="text.secondary">Compliance-ready operations</Typography>
              </Stack>
            </Stack>
            <Typography variant="caption" color="text.secondary" display="block" mt={3}>
              © {year} {brand}. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}