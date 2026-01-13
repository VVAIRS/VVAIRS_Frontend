import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function useToasts() {
  const [toast, setToast] = React.useState([]);

  const removeToast = (id) => {
    setToast((prev) => prev.filter((t) => t.id !== id));
  };

  const pushToast = (t) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const next = {
      id,
      severity: t.tone === 'error' ? 'error' : 'success',
      title: t.title || 'Update',
      message: t.message || ''
    };
    setToast((prev) => [next, ...prev].slice(0, 4));
    // Auto-remove is handled by Snackbar's autoHideDuration, but we keep this for state management clean up if needed
    // actually Snackbar handles its own visibility per instance, but here we have a list.
    // For MUI, it's often easier to show one snackbar at a time or use a provider.
    // However, to keep existing logic (list of toasts), we might need a Stack of Snellbars or just one that updates.
    // Let's stick to a simpler single-toast approach or a stack if MUI supports it.
    // Standard MUI Snackbar usually displays one at a time.
    // Let's modify useToasts to just handle the "current" active toast for simplicity if the app allows,
    // or render a list of Alerts in a fixed position.

    // Revised approach: The original code rendered a list of custom toasts. 
    // We can replicate this visually with a Stack of Alerts in a fixed container.

    setTimeout(() => removeToast(id), 5200);
  };

  return { toast, pushToast, removeToast };
}

export function ToastList({ toasts, onDismiss }) {
  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360, width: 'calc(100% - 32px)' }}>
      {toasts.map((t) => (
        <Alert
          key={t.id}
          severity={t.severity}
          onClose={() => onDismiss(t.id)}
          variant="filled"
          sx={{ width: '100%', boxShadow: 3 }}
        >
          <strong>{t.title}</strong>
          <div>{t.message}</div>
        </Alert>
      ))}
    </div>
  );
}