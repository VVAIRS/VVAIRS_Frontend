import { Button } from '@mui/material';
import LucideIcon from './LucideIcon';

export default function CustomButton({ variant, onClick, iconClass, className, children, ...rest }) {
  const muiVariant = variant === 'primary' ? 'contained' : 'outlined';
  const color = variant === 'primary' ? 'primary' : 'inherit';

  return (
    <Button
      variant={muiVariant}
      color={color}
      onClick={onClick}
      className={className}
      startIcon={iconClass ? <LucideIcon name={iconClass} size={20} /> : null}
      {...rest}
    >
      {children}
    </Button>
  );
}