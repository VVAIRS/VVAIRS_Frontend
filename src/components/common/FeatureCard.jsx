import { Card, Typography, Box, Stack } from '@mui/material';
import IconBadge from './IconBadge';
import Badge from './Badge';
import LucideIcon from './LucideIcon';

export default function FeatureCard({ title, description, iconClass, ...rest }) {
  return (
    <Card
      elevation={1}
      sx={{
        p: 3,
        height: '100%',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 4 }
      }}
      {...rest}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <IconBadge iconClass={iconClass} tone="neutral" />
        <Badge text="AI" tone="primary" iconClass="sparkles" />
      </Box>
      <Typography variant="h6" fontWeight="bold" color="text.primary" mt={2} mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
        {description}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} mt="auto">
        <LucideIcon name="arrow-right" size={16} color="#64748b" />
        <Typography variant="caption" color="text.secondary">
          Designed for recruiter workflows
        </Typography>
      </Stack>
    </Card>
  );
}