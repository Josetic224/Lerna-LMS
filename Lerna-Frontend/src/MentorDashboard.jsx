// MentorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, Grid, Card, CardContent, 
  Button, Divider, Chip, CircularProgress, List, ListItemButton,
  ListItemText, ListItemIcon, TextField, Slider, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import GradingIcon from '@mui/icons-material/Grading';
import { useAppContext } from './AppContext';
import { useEvaluateSubmission } from './hooks/useContracts';
import { getFromIPFS } from './utils/ipfs';

const MentorDashboard = () => {
  const { showNotification } = useAppContext();
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  // Evaluation hook
  const { 
    evaluateSubmission, 
    isLoading: isEvaluationLoading, 
    isSuccess: isEvaluationSuccess,
    isError: isEvaluationError 
  } = useEvaluateSubmission();

  // Load mock submissions (in a real app, these would be fetched from events or API)
  useEffect(() => {
    // Mock data
    const mockSubmissions = [
      {
        id: 1,
        student: '0x1234...5678',
        studentName: 'Alex Johnson',
        trackId: 1,
        trackName: 'Blockchain Fundamentals',
        stageId: 2,
        stageName: 'Consensus Mechanisms',
        ipfsHash: 'ipfs://QmHash123',
        submittedAt: '2025-04-10T15:30:00Z',
        status: 'pending'
      },
      {
        id: 2,
        student: '0x5678...9012',
        studentName: 'Maria Garcia',
        trackId: 2,
        trackName: 'Smart Contract Development',
        stageId: 3,
        stageName: 'Contract Security',
        ipfsHash: 'ipfs://QmHash456',
        submittedAt: '2025-04-09T11:45:00Z',
        status: 'pending'
      },
      {
        id: 3,
        student: '0x9012...3456',
        studentName: 'James Wilson',
        trackId: 1,
        trackName: 'Blockchain Fundamentals',
        stageId: 3,
        stageName: 'Blockchain Applications',
        ipfsHash: 'ipfs://QmHash789',
        submittedAt: '2025-04-08T09:15:00Z',
        status: 'pending'
      }
    ];
    
    setSubmissions(mockSubmissions);
  }, []);

  // Handle evaluation result
  useEffect(() => {
    if (isEvaluationSuccess) {
      showNotification('Submission evaluated successfully!', 'success');
      // Update submission in the list
      if (selectedSubmission) {
        setSubmissions(prev => 
          prev.map(sub => 
            sub.id === selectedSubmission.id 
              ? { ...sub, status: 'evaluated', score } 
              : sub
          )
        );
      }
      handleCloseEvaluationDialog();
    }
    
    if (isEvaluationError) {
      showNotification('Failed to evaluate submission. Please try again.', 'error');
    }
  }, [isEvaluationSuccess, isEvaluationError, showNotification, selectedSubmission, score]);

  const handleSelectSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleOpenEvaluationDialog = () => {
    setScore(0);
    setFeedback('');
    setEvaluationDialogOpen(true);
  };

  const handleCloseEvaluationDialog = () => {
    setEvaluationDialogOpen(false);
  };

  const handleEvaluateSubmission = () => {
    if (selectedSubmission) {
      evaluateSubmission(
        selectedSubmission.trackId,
        selectedSubmission.stageId,
        score
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: 'secondary.main', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="#fff">
          Mentor Dashboard
        </Typography>
        <Typography variant="body1" align="center" color="white">
          Review student submissions and provide valuable feedback.
        </Typography>
      </Paper>
      
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AssignmentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {submissions.filter(sub => sub.status === 'pending').length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Pending Submissions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PeopleIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {new Set(submissions.map(sub => sub.student)).size}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Active Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {submissions.filter(sub => sub.status === 'evaluated').length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Evaluated Submissions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Submissions List */}
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: 'secondary.main' }}>
              <Typography variant="h6" color="white">
                Student Submissions
              </Typography>
            </Box>
            
            <Divider />
            
            {submissions.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No submissions waiting for review.
                </Typography>
              </Box>
            ) : (
              <List sx={{ py: 0 }}>
                {submissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <ListItemButton 
                      selected={selectedSubmission?.id === submission.id}
                      onClick={() => handleSelectSubmission(submission)}
                    >
                      <ListItemIcon>
                        {submission.status === 'evaluated' ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <PendingIcon color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${submission.studentName} - ${submission.stageName}`} 
                        secondary={`${submission.trackName} - Submitted: ${formatDate(submission.submittedAt)}`}
                      />
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        {/* Selected Submission Details */}
        <Grid item xs={12} md={7}>
          {!selectedSubmission ? (
            <Paper 
              elevation={2} 
              sx={{ 
                borderRadius: 2, 
                p: 4, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400
              }}
            >
              <GradingIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Submission Selected
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Select a student submission from the list to review and evaluate it.
              </Typography>
            </Paper>
          ) : (
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: 'secondary.light' }}>
                <Typography variant="h5" color="white" gutterBottom>
                  Submission Details
                </Typography>
                <Chip 
                  label={selectedSubmission.status === 'evaluated' ? 'Evaluated' : 'Pending Review'} 
                  color={selectedSubmission.status === 'evaluated' ? 'success' : 'warning'}
                  size="small"
                  sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
                />
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      STUDENT
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                      {selectedSubmission.studentName}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      WALLET ADDRESS
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {selectedSubmission.student}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      LEARNING TRACK
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {selectedSubmission.trackName}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      STAGE
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {selectedSubmission.stageName}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      IPFS SUBMISSION HASH
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {selectedSubmission.ipfsHash}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Submission Content
                    </Typography>
                    
                    <Card variant="outlined" sx={{ bgcolor: 'background.default', borderRadius: 2, p: 2 }}>
                      <Typography variant="body2">
                        {/* In a real app, you would fetch and display content from IPFS */}
                        This would display the actual submission content fetched from IPFS using the hash: {selectedSubmission.ipfsHash}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  {selectedSubmission.status === 'evaluated' ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CheckCircleIcon />}
                      disabled
                    >
                      Already Evaluated
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleOpenEvaluationDialog}
                      startIcon={<GradingIcon />}
                    >
                      Evaluate Submission
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
      
      {/* Evaluation Dialog */}
      <Dialog 
        open={evaluationDialogOpen} 
        onClose={handleCloseEvaluationDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Evaluate Submission</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 1 }}>
            <Typography id="score-slider" gutterBottom>
              Score (0-100)
            </Typography>
            <Slider
              value={score}
              onChange={(e, newValue) => setScore(newValue)}
              aria-labelledby="score-slider"
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={100}
            />
            
            <TextField
              margin="dense"
              label="Feedback for Student"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Your evaluation will be recorded on the blockchain. The score determines if the student passes this stage.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEvaluationDialog}>Cancel</Button>
          <Button 
            onClick={handleEvaluateSubmission} 
            variant="contained" 
            color="secondary"
            disabled={isEvaluationLoading}
          >
            {isEvaluationLoading ? <CircularProgress size={24} /> : 'Submit Evaluation'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MentorDashboard;