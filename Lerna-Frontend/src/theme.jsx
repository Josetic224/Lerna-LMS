import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3a86ff', // Vibrant blue that works in both themes
      light: '#6fa8ff',
      dark: '#2667cc',
    },
    secondary: {
      main: '#38b2ac', // Teal that's softer than the original mint green
      light: '#5ec9c4',
      dark: '#2c8f8a',
    },
    background: {
      default: '#f8fafc', // Very light blue-gray background
      paper: '#ffffff',   // White paper background
    },
    text: {
      primary: '#334155', // Slate gray text for better readability
      secondary: '#64748b', // Light slate for secondary text
    },
    accent: {
      main: '#e11d48', // Refined rose red accent for important elements
      light: '#f43f5e',
      dark: '#be123c',
    },
    error: {
      main: '#ef4444', // Red
    },
    warning: {
      main: '#f59e0b', // Amber
    },
    info: {
      main: '#3b82f6', // Blue
    },
    success: {
      main: '#10b981', // Emerald
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
          backgroundColor: '#3a86ff',
          '&:hover': {
            backgroundColor: '#2667cc',
          },
        },
        containedSecondary: {
          backgroundColor: '#38b2ac',
          '&:hover': {
            backgroundColor: '#2c8f8a',
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
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#3a86ff',
          color: '#ffffff', // Ensure text is white
        },
      },
    },
    // Add styles for navbar text elements
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    // Ensure buttons in AppBar have white text
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        colorPrimary: {
          "& .MuiButton-root": {
            color: '#ffffff',
          },
          "& .MuiIconButton-root": {
            color: '#ffffff',
          },
          "& .MuiTypography-root": {
            color: '#ffffff',
          },
        },
      },
    },
  },
});

export const getThemeWithMode = (mode) => {
  return createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: mode,
      primary: {
        ...theme.palette.primary,
        main: mode === 'dark' ? '#3a86ff' : '#3a86ff', // Same blue in both modes for consistency
      },
      secondary: {
        ...theme.palette.secondary,
        main: mode === 'dark' ? '#5eead4' : '#38b2ac', // Brighter teal in dark mode
      },
      background: {
        ...theme.palette.background,
        default: mode === 'dark' ? '#0f172a' : '#f8fafc', // Dark blue-slate for dark mode
        paper: mode === 'dark' ? '#1e293b' : '#ffffff', // Darker blue-slate for paper in dark mode
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#334155', // Light slate in dark mode
        secondary: mode === 'dark' ? '#cbd5e1' : '#64748b', // Lighter slate for secondary text in dark mode
      },
    },
    components: {
      ...(mode === 'dark' ? {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#3a86ff', // Same as light mode for consistency
              color: '#ffffff', // White text in dark mode
              '& .MuiButton-root': {
                color: '#ffffff',
              },
              '& .MuiButton-outlined': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: '#ffffff',
              },
              '& .MuiButton-contained': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
              },
              '& .MuiIconButton-root': {
                color: '#ffffff',
              },
              '& .MuiTypography-root': {
                color: '#ffffff',
              },
            },
          },
        },
      } : {}),
    },
  });
};