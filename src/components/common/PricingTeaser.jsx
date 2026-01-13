import { Card, Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LucideIcon from './LucideIcon';

export default function PricingTeaser({ onAction, ...rest }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        p: { xs: 3, sm: 4 },
        position: 'relative',
        overflow: 'hidden',
      }}
      {...rest}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -96,
          right: -96,
          width: 256,
          height: 256,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          opacity: 0.1,
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} justifyContent="space-between" gap={3} position="relative">
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ bgcolor: 'grey.50', border: 1, borderColor: 'divider', borderRadius: 999, px: 2, py: 0.5, width: 'fit-content' }}>
            <LucideIcon name="badge-check" size={16} color="#2563eb" />
            <Typography variant="body2" fontWeight="bold" color="text.secondary">Plans for every team size</Typography>
          </Stack>
          <Typography variant="h5" fontWeight="bold" color="text.primary" mt={2}>
            Compare plans and scale when hiring ramps up
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Start with a pilot and move to bulk screening with dedicated models, automation, and enterprise safeguards.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" onClick={onAction} endIcon={<LucideIcon name="arrow-right" size={16} />}>
            View Pricing
          </Button>
          <Button variant="outlined" onClick={() => navigate('/about')} endIcon={<LucideIcon name="arrow-right" size={16} />}>
            Learn about us
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}