// StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  Container, Typography, Paper, Box, Grid, Card, CardContent, 
  Button, Divider, Chip, CircularProgress, List, ListItemButton,
  ListItemText, ListItemIcon
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAppContext } from './AppContext';
import { useTrackCount, useSubmitAssignment, useCertificateBalance } from './hooks/useContracts';
import { uploadToIPFS } from './utils/ipfs';

const StudentDashboard = () => {
  const { address } = useAccount();
  const { showNotification } = useAppContext();
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get total number of tracks
  const { trackCount, isLoading: isTrackCountLoading } = useTrackCount();
  
  // Get certificate count
  const { certificateCount, isLoading: isCertificateLoading } = useCertificateBalance(address);
  
  // Assignment submission hook
  const { 
    submitAssignment, 
    isLoading: isSubmissionLoading, 
    isSuccess: isSubmissionSuccess,
    isError: isSubmissionError 
  } = useSubmitAssignment();

  // Handle submission result
  useEffect(() => {
    if (isSubmissionSuccess) {
      showNotification('Assignment submitted successfully!', 'success');
      setIsSubmitting(false);
    }
    
    if (isSubmissionError) {
      showNotification('Failed to submit assignment. Please try again.', 'error');
      setIsSubmitting(false);
    }
  }, [isSubmissionSuccess, isSubmissionError, showNotification]);

  // Load mock tracks (in a real app, these would be fetched from the contract)
  useEffect(() => {
    if (!isTrackCountLoading && trackCount > 0) {
      // Mock track data - in a real app, you would fetch each track from the contract
      const mockTracks = [
        {
          id: 1,
          name: "Blockchain Fundamentals",
          description: "Learn the basics of blockchain technology",
          stageCount: 4
        },
        {
          id: 2,
          name: "Smart Contract Development",
          description: "Master Solidity and smart contract development",
          stageCount: 6
        },
        {
          id: 3,
          name: "DApp Frontend Development",
          description: "Build decentralized application frontends",
          stageCount: 5
        }
      ];
      
      setTracks(mockTracks.slice(0, trackCount));
    }
  }, [trackCount, isTrackCountLoading]);

  // Mock function to handle track selection
  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  // Function to handle assignment submission
  const handleSubmitAssignment = async (trackId, stageId) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would:
      // 1. Upload content to IPFS
      // const ipfsHash = await uploadToIPFS('Assignment content goes here');
      
      // For demo, we'll use a mock IPFS hash
      const mockIpfsHash = `ipfs://QmHash${Math.floor(Math.random() * 1000)}`;
      
      // 2. Submit the hash to the contract
      submitAssignment(trackId, stageId, mockIpfsHash);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      showNotification('Failed to upload assignment content', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: 'primary.main', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="#fff">
          Student Dashboard
        </Typography>
        <Typography variant="body1" align="center" color="white">
          Welcome to your personalized learning journey. Explore tracks and track your progress.
        </Typography>
      </Paper>
      
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {isTrackCountLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  trackCount
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Available Tracks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AssignmentIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {selectedTrack ? selectedTrack.stageCount : '0'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Stages in Current Track
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {isCertificateLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  certificateCount
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Certificates Earned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Tracks List */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: 'primary.main' }}>
              <Typography variant="h6" color="white">
                Available Learning Tracks
              </Typography>
            </Box>
            
            <Divider />
            
            {isTrackCountLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : trackCount === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No tracks available yet.
                </Typography>
              </Box>
            ) : (
              <List sx={{ py: 0 }}>
                {tracks.map((track) => (
                  <React.Fragment key={track.id}>
                    <ListItemButton 
                      selected={selectedTrack?.id === track.id}
                      onClick={() => handleSelectTrack(track)}
                    >
                      <ListItemIcon>
                        <SchoolIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={track.name} 
                        secondary={`${track.stageCount} stages`}
                      />
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        {/* Selected Track Details */}
        <Grid item xs={12} md={8}>
          {!selectedTrack ? (
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
              <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Track Selected
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Select a learning track from the list to view details and start your learning journey.
              </Typography>
            </Paper>
          ) : (
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: 'primary.light' }}>
                <Typography variant="h5" color="white" gutterBottom>
                  {selectedTrack.name}
                </Typography>
                <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
                  {selectedTrack.description}
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Learning Stages
                </Typography>
                
                {/* Stages List */}
                {Array.from({ length: selectedTrack.stageCount }).map((_, index) => (
                  <Card 
                    key={index} 
                    variant="outlined" 
                    sx={{ 
                      mb: 2, 
                      borderRadius: 2,
                      borderLeft: 4,
                      borderColor: index === 0 ? 'success.main' : 
                                   index === 1 ? 'warning.main' : 'grey.300'
                    }}
                  >
                    <CardContent sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Stage {index + 1}: {index === 0 ? 'Introduction to Blockchain' : 
                                             index === 1 ? 'Consensus Mechanisms' :
                                             `Learning Stage ${index + 1}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {index === 0 ? 'Learn the basics of blockchain technology and its applications' : 
                           index === 1 ? 'Understand different consensus algorithms and their tradeoffs' :
                           'Complete this stage to advance your knowledge'}
                        </Typography>
                      </Box>
                      
                      <Box>
                        {index === 0 ? (
                          <Chip 
                            icon={<CheckCircleIcon />} 
                            label="Completed" 
                            color="success" 
                            variant="outlined" 
                          />
                        ) : index === 1 ? (
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={() => handleSubmitAssignment(selectedTrack.id, index + 1)}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <AssignmentIcon />}
                          >
                            Submit Assignment
                          </Button>
                        ) : (
                          <Chip 
                            icon={<PendingIcon />} 
                            label="Locked" 
                            color="default" 
                            variant="outlined" 
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;