import { Chip } from '@mui/material';
import LucideIcon from './LucideIcon';

export default function Badge({ text, tone, iconClass, ...rest }) {
  const color = tone === 'primary' ? 'primary' : 'default';

  return (
    <Chip
      label={text}
      color={color}
      icon={iconClass ? <LucideIcon name={iconClass} size={16} /> : undefined}
      size="small"
      sx={{ fontWeight: 'bold' }}
      {...rest}
    />
  );
}