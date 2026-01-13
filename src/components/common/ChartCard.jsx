import { useRef, useEffect } from 'react';
import { Card, Box, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import IconBadge from './IconBadge';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export default function ChartCard({ title, subtitle, chartId, type, iconClass, ...rest }) {
  const palette = {
    primary: 'rgba(37, 99, 235, 0.9)',
    primarySoft: 'rgba(37, 99, 235, 0.25)',
  };

  const lineData = {
    labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm'],
    datasets: [
      {
        data: [18, 28, 40, 46, 60, 72],
        borderColor: palette.primary,
        backgroundColor: palette.primarySoft,
        tension: 0.35,
        pointRadius: 2,
        fill: true,
        borderWidth: 2
      }
    ]
  };

  const barData = {
    labels: ['0–40%', '41–60%', '61–80%', '81–100%'],
    datasets: [
      {
        data: [12, 28, 22, 16],
        backgroundColor: [
          'rgba(15, 23, 42, 0.16)',
          'rgba(15, 23, 42, 0.28)',
          'rgba(37, 99, 235, 0.55)',
          'rgba(37, 99, 235, 0.85)'
        ],
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
      y: { grid: { color: 'rgba(15,23,42,0.08)' }, ticks: { color: '#64748b', font: { size: 10 } } }
    }
  };

  return (
    <Card sx={{ p: 2, height: '100%' }} {...rest}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <IconBadge iconClass={iconClass} tone="neutral" sx={{ width: 32, height: 32 }} />
      </Box>
      <Box sx={{ height: 120 }}>
        {type === 'line' ? (
          <Line data={lineData} options={options} />
        ) : (
          <Bar data={barData} options={options} />
        )}
      </Box>
    </Card>
  );
}