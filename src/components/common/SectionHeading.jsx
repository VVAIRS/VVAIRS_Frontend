import { Box, Typography } from '@mui/material';

export default function SectionHeading({ title, subtitle, align, ...rest }) {
  return (
    <Box textAlign={align || 'left'} {...rest}>
      <Typography variant="h4" component="h2" fontWeight="bold" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}