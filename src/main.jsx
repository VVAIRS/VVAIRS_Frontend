import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { NotificationProvider } from './context/NotificationContext.jsx';
const theme = createTheme({
    typography: {
        fontFamily: [
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'Segoe UI',
            'Roboto',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#2563eb', // blue-600
        },
        secondary: {
            main: '#0f172a', // slate-900
        },
        background: {
            default: '#f8fafc',
        }
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NotificationProvider>
                <App />
            </NotificationProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
