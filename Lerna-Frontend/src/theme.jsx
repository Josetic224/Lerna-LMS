// theme.js
import { createTheme } from '@mui/material/styles';

// Educational LMS color palette
// Main colors: Deep blue, teal, and amber accents
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep indigo - represents knowledge and wisdom
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00796b', // Teal - represents growth and progress
      light: '#48a999',
      dark: '#004c40',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#ffc107', // Amber - represents achievement and certification
      light: '#fff350',
      dark: '#c79100',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      dark: '#121212',
      darkPaper: '#1e1e1e',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
      disabled: '#9e9e9e',
      hint: '#757575',
      lightPrimary: '#f5f5f5',
      lightSecondary: '#e0e0e0',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(26, 35, 126, 0.3)',
          },
        },
        containedSecondary: {
          boxShadow: '0 4px 6px rgba(0, 121, 107, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(0, 121, 107, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          },
          transition: 'box-shadow 0.3s ease-in-out',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Theme with dark mode support
export const getThemeWithMode = (mode) => {
  return createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: mode,
      background: {
        ...theme.palette.background,
        default: mode === 'dark' ? theme.palette.background.dark : theme.palette.background.default,
        paper: mode === 'dark' ? theme.palette.background.darkPaper : theme.palette.background.paper,
      },
      text: {
        primary: mode === 'dark' ? theme.palette.text.lightPrimary : theme.palette.text.primary,
        secondary: mode === 'dark' ? theme.palette.text.lightSecondary : theme.palette.text.secondary,
      },
    },
  });
};