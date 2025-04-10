import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemeWithMode } from './theme';
import { Snackbar, Alert, CircularProgress, Backdrop } from '@mui/material';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.theme === 'dark' || 
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info' // 'error', 'warning', 'info', 'success'
  });

  // Create theme based on mode
  const theme = useMemo(() => getThemeWithMode(isDarkMode ? 'dark' : 'light'), [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  // Show notification helper
  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Fetch user role when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      setIsLoading(true);
      
      // Simulate API call to fetch user role
      const fetchUserRole = async () => {
        try {
          // In a real app, this would be an API call to your backend
          // await userAPI.getUserRole(address)
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // For demo, randomly assign a role (in real app, this would come from your backend)
          const roles = ['student', 'mentor', 'admin'];
          const assignedRole = roles[0]; // Always student for now
          
          setUserRole(assignedRole);
          showNotification(`Welcome back! You're logged in as a ${assignedRole}`, 'success');
        } catch (error) {
          console.error('Error fetching user role:', error);
          showNotification('Error fetching your account details', 'error');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUserRole();
    } else {
      setUserRole(null);
    }
  }, [isConnected, address]);

  // Context value
  const value = {
    userRole,
    isLoading,
    isDarkMode,
    toggleTheme,
    isAuthenticated: isConnected && userRole !== null,
    showNotification,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        
        {/* Global loading indicator */}
        <Backdrop 
          sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)' 
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        
        {/* Global notification system */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleNotificationClose} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </AppContext.Provider>
  );
};