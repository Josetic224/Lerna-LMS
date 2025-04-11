// AppContext.jsx
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemeWithMode } from './theme';
import { Snackbar, Alert, CircularProgress, Backdrop } from '@mui/material';
import { useUserRole, useRegisterAsStudent, useRegisterAsMentor } from './hooks/useContracts';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.theme === 'dark' || 
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info' // 'error', 'warning', 'info', 'success'
  });

  // Get user role from smart contract
  const { userRole, isLoading: isRoleLoading, isError: isRoleError } = useUserRole(address);
  
  // Register hooks
  const { 
    registerAsStudent, 
    isLoading: isStudentRegLoading, 
    isSuccess: isStudentRegSuccess,
    isError: isStudentRegError
  } = useRegisterAsStudent();
  
  const { 
    registerAsMentor, 
    isLoading: isMentorRegLoading, 
    isSuccess: isMentorRegSuccess,
    isError: isMentorRegError
  } = useRegisterAsMentor();

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

  // Handle user registration responses
  useEffect(() => {
    if (isStudentRegSuccess) {
      showNotification('Successfully registered as a student!', 'success');
    }
    if (isStudentRegError) {
      showNotification('Failed to register as a student. Please try again.', 'error');
    }
  }, [isStudentRegSuccess, isStudentRegError]);

  useEffect(() => {
    if (isMentorRegSuccess) {
      showNotification('Successfully registered as a mentor!', 'success');
    }
    if (isMentorRegError) {
      showNotification('Failed to register as a mentor. Please try again.', 'error');
    }
  }, [isMentorRegSuccess, isMentorRegError]);

  // Set global loading state when role is being fetched
  useEffect(() => {
    setIsLoading(isRoleLoading || isStudentRegLoading || isMentorRegLoading);
  }, [isRoleLoading, isStudentRegLoading, isMentorRegLoading]);

  // Handle role loading errors
  useEffect(() => {
    if (isRoleError) {
      showNotification('Error loading user role from blockchain. Please check your network connection.', 'error');
    }
  }, [isRoleError]);

  // Show welcome message when user connects and has a role
  useEffect(() => {
    if (isConnected && userRole && !isRoleLoading) {
      showNotification(`Welcome back! You're logged in as a ${userRole}`, 'success');
    }
  }, [isConnected, userRole, isRoleLoading]);

  // Context value
  const value = {
    userRole,
    isLoading,
    isDarkMode,
    toggleTheme,
    isAuthenticated: isConnected && userRole !== null,
    showNotification,
    registerAsStudent,
    registerAsMentor,
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