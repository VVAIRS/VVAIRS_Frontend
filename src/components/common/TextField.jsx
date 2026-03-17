import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = React.forwardRef(({ label, error, helperText, ...props }, ref) => {
  return (
    <MuiTextField
      label={label}
      error={!!error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      size="small"
      inputRef={ref}
      {...props}
    />
  );
});

TextField.displayName = 'TextField';

export default TextField;
