import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Alert, MenuItem, Box, Typography, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DemoRequestModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [volume, setVolume] = useState('0-50');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open) setErrorMsg('');
  }, [open]);

  const validateEmail = (v) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());
  };

  const submit = async () => {
    setErrorMsg('');
    const nm = name.trim();
    const em = email.trim();
    const co = company.trim();

    if (!nm) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!validateEmail(em)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!co) {
      setErrorMsg('Please enter your company name.');
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));

    if (onSubmit) onSubmit({ name: nm, email: em, company: co, volume, note });

    setName('');
    setEmail('');
    setCompany('');
    setVolume('0-50');
    setNote('');
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pb={1}>
        <Box>
          <DialogTitle sx={{ p: 0, fontWeight: 'bold' }}>Request a demo</DialogTitle>
          <Typography variant="body2" color="text.secondary">
            Tell us a bit about your hiring volume and we’ll follow up with a tailored walkthrough.
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ alignSelf: 'flex-start' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box display="grid" gap={2}>
          <Box display="grid" gridTemplateColumns={{ sm: '1fr 1fr' }} gap={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              placeholder="name@company.com"
            />
          </Box>

          <Box display="grid" gridTemplateColumns={{ sm: '1fr 1fr' }} gap={2}>
            <TextField
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              select
              label="Monthly resume volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="0-50">0–50</MenuItem>
              <MenuItem value="51-200">51–200</MenuItem>
              <MenuItem value="201-1000">201–1000</MenuItem>
              <MenuItem value="1000+">1000+</MenuItem>
            </TextField>
          </Box>

          <TextField
            label="What are you hiring for? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            minRows={3}
            fullWidth
            size="small"
            placeholder="Roles, locations, must-have skills, or compliance needs…"
          />

          {errorMsg && (
            <Alert severity="error">{errorMsg}</Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={submitting} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={submit}
          disabled={submitting}
          variant="contained"
          endIcon={!submitting && <i className="icon-arrow-right" />}
        >
          {submitting ? 'Submitting…' : 'Submit'}
        </Button>
      </DialogActions>

      <Typography variant="caption" color="text.secondary" align="center" sx={{ pb: 2 }}>
        By submitting, you agree to receive a follow-up email about the demo request.
      </Typography>
    </Dialog>
  );
}