// App.jsx - Updated with blockchain integration
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import StudentDashboard from './StudentDashboard';
import MentorDashboard from './MentorDashboard';
import AdminDashboard from './AdminDashboard';
import { useAppContext } from './AppContext';

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