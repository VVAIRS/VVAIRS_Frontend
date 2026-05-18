import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';

export default function SuggestionCard({ suggestion, onAccept }) {
  // suggestion format: { type: 'improve' | 'add', original: '', suggested: '', reason: '', priority: 'high' | 'medium' }
  const isHighPriority = suggestion.priority === 'high';

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        minWidth: '320px',
        maxWidth: '350px',
        flexShrink: 0,
        bgcolor: 'rgba(255,255,255,0.03)', 
        border: '1px solid',
        borderColor: isHighPriority ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)',
        borderRadius: 2
      }}
    >
      <Typography variant="caption" sx={{ color: isHighPriority ? '#ef4444' : '#f59e0b', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>
        {suggestion.type === 'add' ? 'Missing Content' : 'Improvement'}
      </Typography>
      
      {suggestion.original && (
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="#94a3b8" sx={{ textDecoration: 'line-through' }}>
            {suggestion.original}
          </Typography>
        </Box>
      )}
      
      <Box sx={{ mb: 1.5, p: 1.5, bgcolor: 'rgba(56, 189, 248, 0.1)', borderRadius: 1, borderLeft: '3px solid #38bdf8' }}>
        <Typography variant="body2" color="#e2e8f0">
          {suggestion.suggested || suggestion.text}
        </Typography>
      </Box>
      
      <Typography variant="caption" color="#94a3b8" display="block" mb={2}>
        <Box component="span" fontWeight={600} color="#fff">Why: </Box>
        {suggestion.reason || 'To improve ATS compatibility'}
      </Typography>

      <Box display="flex" justifyContent="flex-end" gap={1}>
        {onAccept && (
          <Button 
            size="small" 
            variant="contained" 
            sx={{ 
              bgcolor: '#38bdf8', 
              color: '#0f172a',
              fontWeight: 600,
              '&:hover': { bgcolor: '#0284c7' }
            }}
            startIcon={<CheckCircle size={16} />}
            onClick={() => onAccept(suggestion)}
          >
            Accept
          </Button>
        )}
      </Box>
    </Paper>
  );
}
