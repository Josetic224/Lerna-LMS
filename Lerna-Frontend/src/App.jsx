// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import { useAppContext } from './AppContext';
import { Box, Container, Typography, Paper } from '@mui/material';

// Dashboard placeholder components
const StudentDashboard = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Student Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Welcome to your personalized learning journey. Your courses and progress will appear here.
      </Typography>
      <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', color: 'white', borderRadius: 2 }}>
        <Typography variant="subtitle1">
          Coming Soon: Interactive learning modules, progress tracking, and credential management.
        </Typography>
      </Box>
    </Paper>
  </Container>
);

const MentorDashboard = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Mentor Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Welcome to your mentoring hub. Your students and assignments will appear here.
      </Typography>
      <Box sx={{ mt: 4, p: 3, bgcolor: 'secondary.light', color: 'white', borderRadius: 2 }}>
        <Typography variant="subtitle1">
          Coming Soon: Student management, assignment review, and feedback tools.
        </Typography>
      </Box>
    </Paper>
  </Container>
);

const AdminDashboard = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Platform management and analytics center.
      </Typography>
      <Box sx={{ mt: 4, p: 3, bgcolor: 'warning.light', color: 'text.primary', borderRadius: 2 }}>
        <Typography variant="subtitle1">
          Coming Soon: User management, course creation, and platform analytics.
        </Typography>
      </Box>
    </Paper>
  </Container>
);

function App() {
  const { isDarkMode, isAuthenticated, userRole } = useAppContext();

  // Log for debugging
  useEffect(() => {
    console.log('Auth state:', { isAuthenticated, userRole });
  }, [isAuthenticated, userRole]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected routes based on authentication and role */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Navigate to={`/dashboard/${userRole}`} replace />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/dashboard/student" 
          element={
            isAuthenticated && userRole === 'student' ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/dashboard/mentor" 
          element={
            isAuthenticated && userRole === 'mentor' ? (
              <MentorDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/dashboard/admin" 
          element={
            isAuthenticated && userRole === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;