import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pb={1}>
        {title && <DialogTitle sx={{ p: 0, fontWeight: 'bold' }}>{title}</DialogTitle>}
        <IconButton onClick={onClose} size="small" sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}