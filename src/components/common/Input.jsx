import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const Input = React.forwardRef(({ error, helperText, ...props }, ref) => {
  return (
    <MuiTextField
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

Input.displayName = 'Input';

export default Input;
