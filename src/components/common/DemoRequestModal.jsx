import React, { useContext } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, IconButton, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from './TextField';
import SingleSelect from './SingleSelect';
import { RequestDemoApi } from '../../api/dashboardApi';
import useAPI from '../../api/useApi';
import NotificationContext from '../../context/NotificationContext';

const schema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  work_email: yup.string().email('Invalid email address').required('Work email is required'),
  phone: yup.string().required('Phone number is required'),
  company: yup.string().required('Company name is required'),
  monthly_resume_volume: yup.string().required('Please select monthly resume volume'),
  hiring_for: yup.string().optional(),
});

const volumeOptions = [
  { value: '0-50', label: '0–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-1000', label: '201–1000' },
  { value: '1000+', label: '1000+' },
];

export default function DemoRequestModal({ open, onClose }) {
  const notification = useContext(NotificationContext);
  const { request: submitDemo, loading } = useAPI(RequestDemoApi);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      work_email: '',
      phone: '',
      company: '',
      monthly_resume_volume: '0-50',
      hiring_for: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await submitDemo(data);
      if (response) {
        notification?.success('Demo request submitted successfully!');
        reset();
        onClose();
      } else {
        notification?.error('Failed to submit demo request. Please try again.');
      }
    } catch (error) {
      notification?.error(error?.message || 'Something went wrong.');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pb={1}>
        <Box>
          <DialogTitle sx={{ p: 0, fontWeight: 'bold' }}>Request a demo</DialogTitle>
          <Typography variant="body2" color="text.secondary">
            Tell us a bit about your hiring volume and we’ll follow up with a tailored walkthrough.
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" sx={{ alignSelf: 'flex-start' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box 
          component="form" 
          id="demo-request-form" 
          onSubmit={handleSubmit(onSubmit)} 
          display="grid" 
          gap={2.5}
          sx={{ py: 1 }}
        >
          <Box display="grid" gridTemplateColumns={{ sm: '1fr 1fr' }} gap={2}>
            <TextField
              label="Full Name"
              placeholder="Enter your name"
              error={errors.name}
              helperText={errors.name?.message}
              {...register('name')}
              disabled={loading}
            />
            <TextField
              label="Work Email"
              placeholder="name@company.com"
              error={errors.work_email}
              helperText={errors.work_email?.message}
              {...register('work_email')}
              disabled={loading}
            />
          </Box>

          <Box display="grid" gridTemplateColumns={{ sm: '1fr 1fr' }} gap={2}>
            <TextField
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              error={errors.phone}
              helperText={errors.phone?.message}
              {...register('phone')}
              disabled={loading}
            />
            <TextField
              label="Company"
              placeholder="Your company name"
              error={errors.company}
              helperText={errors.company?.message}
              {...register('company')}
              disabled={loading}
            />
          </Box>

          <SingleSelect
            label="Monthly Resume Volume"
            options={volumeOptions}
            error={errors.monthly_resume_volume}
            helperText={errors.monthly_resume_volume?.message}
            {...register('monthly_resume_volume')}
            disabled={loading}
          />

          <TextField
            label="What are you hiring for? (optional)"
            placeholder="Roles, locations, must-have skills..."
            multiline
            rows={3}
            error={errors.hiring_for}
            helperText={errors.hiring_for?.message}
            {...register('hiring_for')}
            disabled={loading}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, px: 3, gap: 1 }}>
        <Button onClick={handleClose} disabled={loading} color="inherit" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="demo-request-form"
          disabled={loading}
          variant="contained"
          sx={{ 
            px: 4, 
            textTransform: 'none',
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' }
          }}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </DialogActions>

      <Typography variant="caption" color="text.secondary" align="center" sx={{ pb: 3, px: 3 }}>
        By submitting, you agree to our terms and to receive a follow-up email about the demo request.
      </Typography>
    </Dialog>
  );
}