import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const SingleSelect = React.forwardRef(({ label, options, error, helperText, ...props }, ref) => {
  return (
    <TextField
      select
      label={label}
      error={!!error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      size="small"
      inputRef={ref}
      {...props}
    >
      {options && options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
});

SingleSelect.displayName = 'SingleSelect';

export default SingleSelect;
