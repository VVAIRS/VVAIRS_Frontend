import { Box } from '@mui/material';
import LucideIcon from './LucideIcon';

export default function IconBadge({ iconClass, tone, ...rest }) {
  const isPrimary = tone === 'primary';
  const bgcolor = isPrimary ? 'primary.main' : 'secondary.main';
  const color = 'common.white';

  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: bgcolor,
        color: color,
      }}
      {...rest}
    >
      <LucideIcon name={iconClass} size={24} />
    </Box>
  );
}
