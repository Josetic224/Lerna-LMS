import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import { useAppContext } from './AppContext';
import { Box, Container, Typography, Paper } from '@mui/material';

const StudentDashboard = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: '#4A90E2' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="#fff">
        Student Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Welcome to your personalized learning journey. Your courses and progress will appear here.
      </Typography>
    </Paper>
  </Container>
);

const MentorDashboard = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: '#50E3C2' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="#fff">
        Mentor Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Welcome to your mentoring hub. Your students and assignments will appear here.
      </Typography>
    </Paper>
  </Container>
);

const AdminDashboard = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: '#D0021B' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="#fff">
        Admin Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Platform management and analytics center.
      </Typography>
    </Paper>
  </Container>
);

function App() {
  const { isDarkMode, isAuthenticated, userRole } = useAppContext();

  useEffect(() => {
    console.log('Auth state:', { isAuthenticated, userRole });
  }, [isAuthenticated, userRole]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
      </Routes>
    </Router>
  );
}

export default App;
