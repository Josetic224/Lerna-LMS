// RoleRegistrationDialog.jsx
import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography, Box, Paper, Grid
} from '@mui/material';
import { useAppContext } from './AppContext';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';

const RoleRegistrationDialog = ({ open, onClose }) => {
  const { registerAsStudent, registerAsMentor, isLoading } = useAppContext();

  const handleStudentRegistration = () => {
    registerAsStudent();
    onClose();
  };

  const handleMentorRegistration = () => {
    registerAsMentor();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Welcome to Lerna
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Choose your role to get started
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ px: 4, pb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderTop: 4,
                borderColor: 'primary.main'
              }}
              onClick={handleStudentRegistration}
            >
              <SchoolIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Join as Student
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enroll in courses, complete assignments, and earn verified credentials
              </Typography>
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  disabled={isLoading}
                  onClick={handleStudentRegistration}
                >
                  Register as Student
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderTop: 4,
                borderColor: 'secondary.main'
              }}
              onClick={handleMentorRegistration}
            >
              <PeopleIcon color="secondary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Join as Mentor
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Evaluate assignments, provide feedback, and help students succeed
              </Typography>
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth
                  disabled={isLoading}
                  onClick={handleMentorRegistration}
                >
                  Register as Mentor
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'center' }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleRegistrationDialog;