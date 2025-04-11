// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, Grid, Card, CardContent, 
  Button, Divider, Chip, CircularProgress, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tabs, Tab
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppContext } from './AppContext';
import { useTrackCount, useCreateTrack } from './hooks/useContracts';

const AdminDashboard = () => {
  const { showNotification } = useAppContext();
  const [tabValue, setTabValue] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const [createTrackDialogOpen, setCreateTrackDialogOpen] = useState(false);
  const [createStageDialogOpen, setCreateStageDialogOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  
  // Form states
  const [trackName, setTrackName] = useState('');
  const [trackDescription, setTrackDescription] = useState('');
  const [stageName, setStageName] = useState('');
  const [stageDescription, setStageDescription] = useState('');
  const [maxScore, setMaxScore] = useState(100);
  
  // Get track count from contract
  const { trackCount, isLoading: isTrackCountLoading } = useTrackCount();
  
  // Create track hook
  const { 
    createTrack, 
    isLoading: isCreateTrackLoading, 
    isSuccess: isCreateTrackSuccess,
    isError: isCreateTrackError 
  } = useCreateTrack();

  // Load mock tracks (in a real app, these would be fetched from the contract)
  useEffect(() => {
    // Mock data
    const mockTracks = [
      {
        id: 1,
        name: 'Blockchain Fundamentals',
        description: 'Learn the basics of blockchain technology',
        stageCount: 4,
        studentCount: 24,
        completionRate: 68
      },
      {
        id: 2,
        name: 'Smart Contract Development',
        description: 'Master Solidity and smart contract development',
        stageCount: 6,
        studentCount: 18,
        completionRate: 42
      },
      {
        id: 3,
        name: 'DApp Frontend Development',
        description: 'Build decentralized application frontends',
        stageCount: 5,
        studentCount: 15,
        completionRate: 33
      }
    ];
    
    setTracks(mockTracks);
    
    // Mock users
    const mockUsers = [
      {
        address: '0x1234...5678',
        name: 'Alex Johnson',
        role: 'student',
        tracksEnrolled: 2,
        certificatesEarned: 1
      },
      {
        address: '0x5678...9012',
        name: 'Maria Garcia',
        role: 'student',
        tracksEnrolled: 1,
        certificatesEarned: 0
      },
      {
        address: '0x9012...3456',
        name: 'James Wilson',
        role: 'student',
        tracksEnrolled: 3,
        certificatesEarned: 2
      },
      {
        address: '0xabcd...ef01',
        name: 'Sarah Ahmed',
        role: 'mentor',
        tracksAssigned: 2,
        evaluationsCompleted: 15
      },
      {
        address: '0xef01...2345',
        name: 'David Kim',
        role: 'mentor',
        tracksAssigned: 1,
        evaluationsCompleted: 8
      }
    ];
    
    setUsers(mockUsers);
  }, []);

  // Handle track creation result
  useEffect(() => {
    if (isCreateTrackSuccess) {
      showNotification('Track created successfully!', 'success');
      handleCloseCreateTrackDialog();
      
      // In a real app, you would fetch the updated tracks from the contract
      // For now, we'll just add a mock track to the UI
      setTracks(prev => [
        ...prev,
        {
          id: prev.length + 1,
          name: trackName,
          description: trackDescription,
          stageCount: 0,
          studentCount: 0,
          completionRate: 0
        }
      ]);
    }
    
    if (isCreateTrackError) {
      showNotification('Failed to create track. Please try again.', 'error');
    }
  }, [isCreateTrackSuccess, isCreateTrackError, showNotification, trackName, trackDescription]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenCreateTrackDialog = () => {
    setTrackName('');
    setTrackDescription('');
    setCreateTrackDialogOpen(true);
  };

  const handleCloseCreateTrackDialog = () => {
    setCreateTrackDialogOpen(false);
  };

  const handleCreateTrack = () => {
    if (trackName && trackDescription) {
      createTrack(trackName, trackDescription);
    } else {
      showNotification('Please fill all required fields', 'error');
    }
  };

  const handleOpenCreateStageDialog = (track) => {
    setSelectedTrack(track);
    setStageName('');
    setStageDescription('');
    setMaxScore(100);
    setCreateStageDialogOpen(true);
  };

  const handleCloseCreateStageDialog = () => {
    setCreateStageDialogOpen(false);
  };

  const handleCreateStage = () => {
    if (selectedTrack && stageName && stageDescription) {
      // In a real app, you would call a contract function to create a stage
      showNotification('Stage created successfully!', 'success');
      handleCloseCreateStageDialog();
      
      // Update the UI to reflect the new stage
      setTracks(prev => 
        prev.map(track => 
          track.id === selectedTrack.id 
            ? { ...track, stageCount: track.stageCount + 1 } 
            : track
        )
      );
    } else {
      showNotification('Please fill all required fields', 'error');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, bgcolor: 'error.main', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="#fff">
          Admin Dashboard
        </Typography>
        <Typography variant="body1" align="center" color="white">
          Manage learning tracks, stages, and platform users.
        </Typography>
      </Paper>
      
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AssignmentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {isTrackCountLoading ? <CircularProgress size={24} /> : tracks.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Learning Tracks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PeopleIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {users.filter(u => u.role === 'student').length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Registered Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {users.reduce((total, user) => 
                  total + (user.certificatesEarned || 0), 0)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Certificates Issued
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Content */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="admin dashboard tabs"
            variant="fullWidth"
          >
            <Tab label="Learning Tracks" icon={<AssignmentIcon />} iconPosition="start" />
            <Tab label="Users" icon={<PeopleIcon />} iconPosition="start" />
            <Tab label="Platform Analytics" icon={<BarChartIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Tracks Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Learning Tracks Management
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleOpenCreateTrackDialog}
              >
                Create New Track
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Track Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Stages</TableCell>
                    <TableCell>Students</TableCell>
                    <TableCell>Completion Rate</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tracks.map((track) => (
                    <TableRow key={track.id}>
                      <TableCell>{track.id}</TableCell>
                      <TableCell>{track.name}</TableCell>
                      <TableCell>{track.description}</TableCell>
                      <TableCell>{track.stageCount}</TableCell>
                      <TableCell>{track.studentCount}</TableCell>
                      <TableCell>{track.completionRate}%</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenCreateStageDialog(track)}
                          >
                            Add Stage
                          </Button>
                          <IconButton size="small" color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {/* Users Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Platform Users
              </Typography>
              <TextField
                placeholder="Search users..."
                size="small"
                variant="outlined"
                sx={{ width: 250 }}
              />
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Wallet Address</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role === 'student' ? 'Student' : 'Mentor'} 
                          color={user.role === 'student' ? 'primary' : 'secondary'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        {user.role === 'student' ? (
                          <>
                            {user.tracksEnrolled} tracks, {user.certificatesEarned} certificates
                          </>
                        ) : (
                          <>
                            {user.tracksAssigned} tracks, {user.evaluationsCompleted} evaluations
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                          >
                            Manage Roles
                          </Button>
                          <IconButton size="small" color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {/* Analytics Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Platform Analytics
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: 300
              }}
            >
              <Typography>
                Analytics charts and visualization would be displayed here
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
      
      {/* Create Track Dialog */}
      <Dialog 
        open={createTrackDialogOpen} 
        onClose={handleCloseCreateTrackDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Learning Track</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 1 }}>
            <TextField
              margin="dense"
              label="Track Name"
              type="text"
              fullWidth
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              variant="outlined"
              required
            />
            
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={trackDescription}
              onChange={(e) => setTrackDescription(e.target.value)}
              variant="outlined"
              required
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateTrackDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateTrack} 
            variant="contained" 
            color="primary"
            disabled={isCreateTrackLoading}
          >
            {isCreateTrackLoading ? <CircularProgress size={24} /> : 'Create Track'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Create Stage Dialog */}
      <Dialog 
        open={createStageDialogOpen} 
        onClose={handleCloseCreateStageDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add Stage to {selectedTrack?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 1 }}>
            <TextField
              margin="dense"
              label="Stage Name"
              type="text"
              fullWidth
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              variant="outlined"
              required
            />
            
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={stageDescription}
              onChange={(e) => setStageDescription(e.target.value)}
              variant="outlined"
              required
              sx={{ mt: 2 }}
            />
            
            <TextField
              margin="dense"
              label="Maximum Score"
              type="number"
              fullWidth
              value={maxScore}
              onChange={(e) => setMaxScore(Number(e.target.value))}
              variant="outlined"
              required
              inputProps={{ min: 1, max: 100 }}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateStageDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateStage} 
            variant="contained" 
            color="primary"
          >
            Create Stage
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;