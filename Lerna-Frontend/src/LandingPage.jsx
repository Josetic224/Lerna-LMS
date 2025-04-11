// LandingPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import student from '../src/assets/images/students.svg';
//import students from '../src/assets/images/studentss.svg';
import LernaLogo from '../src/assets/images/LernaLogo.svg';
import LernaWLogo from '../src/assets/images/LernaWLogo.svg';
import { useAppContext } from './AppContext';
import RoleRegistrationDialog from './RoleRegistrationDialog';
import { 
  AppBar, Toolbar, Typography, Button, Container, Box, Grid, 
  Card, CardContent, Avatar, IconButton, Divider, Paper, Chip,
  Drawer, List, ListItem, ListItemText, useMediaQuery,
  Menu, MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Import RainbowKit's ConnectButton and hooks
import { ConnectButton, useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';

// Features data
const features = [
  {
    title: 'Blockchain-Verified Credentials',
    description: 'Earn NFT certificates upon completion that can be verified on-chain, providing immutable proof of your achievements.',
    icon: <VerifiedIcon fontSize="large" />,
    color: '#1565c0'
  },
  {
    title: 'Decentralized Learning',
    description: 'All learning progress and achievements are stored on blockchain, ensuring transparency and permanence.',
    icon: <StorageIcon fontSize="large" />,
    color: '#0277bd'
  },
  {
    title: 'Modular Learning Tracks',
    description: 'Progress through structured learning paths with clearly defined stages, unlocking new content as you advance.',
    icon: <AssignmentIcon fontSize="large" />,
    color: '#00838f'
  },
  {
    title: 'Direct Mentor Feedback',
    description: 'Receive transparent evaluation and feedback from mentors, with all interactions recorded on-chain.',
    icon: <PeopleIcon fontSize="large" />,
    color: '#00695c'
  },
  {
    title: 'Wallet-Based Authentication',
    description: 'Access your learning dashboard securely through your Web3 wallet, no need for traditional username and passwords.',
    icon: <SecurityIcon fontSize="large" />,
    color: '#2e7d32'
  },
  {
    title: 'IPFS Content Storage',
    description: 'All educational content and submissions are stored on IPFS, ensuring censorship resistance and permanent availability.',
    icon: <StorageIcon fontSize="large" />,
    color: '#558b2f'
  },
];

// Roles data
const roles = [
  {
    title: 'Student',
    description: 'Enroll in tracks, complete assignments, and earn verifiable credentials as you progress through your learning journey.',
    capabilities: [
      'Enroll in educational tracks',
      'Submit assignments',
      'Track progress across stages',
      'Receive mentor feedback',
      'Earn blockchain-verified credentials'
    ],
    icon: <SchoolIcon fontSize="large" />,
    color: 'primary'
  },
  {
    title: 'Mentor',
    description: 'Guide and evaluate student work, providing valuable feedback that helps learners improve their skills.',
    capabilities: [
      'View student submissions',
      'Approve or reject work',
      'Provide detailed feedback',
      'Track student progress',
      'Participate in community discussions'
    ],
    icon: <PeopleIcon fontSize="large" />,
    color: 'secondary'
  },
  {
    title: 'Admin',
    description: 'Create and manage learning tracks, assign mentors, and oversee the entire educational ecosystem.',
    capabilities: [
      'Create educational tracks',
      'Design learning stages',
      'Assign mentors to tracks',
      'Manage user roles',
      'Configure platform settings'
    ],
    icon: <SecurityIcon fontSize="large" />,
    color: 'warning'
  },
];

// Steps data
const steps = [
  {
    number: '01',
    title: 'Connect Your Wallet',
    description: 'Use your Web3 wallet to create an account on Lerna. No email or password needed.',
  },
  {
    number: '02',
    title: 'Choose Your Learning Track',
    description: 'Browse and enroll in educational tracks that match your interests and career goals.',
  },
  {
    number: '03',
    title: 'Complete Learning Stages',
    description: 'Progress through modules, submit assignments, and receive feedback from mentors.',
  },
  {
    number: '04',
    title: 'Earn Verified Credentials',
    description: 'Upon completion, receive an NFT certificate that proves your skills on the blockchain.',
  },
];

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDarkMode, toggleTheme, showNotification, userRole, isAuthenticated } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const navigate = useNavigate();
  
  // RainbowKit hooks for wallet interactions
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  
  // Get account information from wagmi
  const { address, isConnected } = useAccount();
  
  // Check if user needs to register
  useEffect(() => {
    if (isConnected && !userRole) {
      setShowRoleDialog(true);
    }
  }, [isConnected, userRole]);
  
  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && userRole) {
      navigate(`/dashboard/${userRole}`);
    }
  }, [isAuthenticated, userRole, navigate]);
  
  // Truncate wallet address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  const handleRoleDialogClose = () => {
    setShowRoleDialog(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            
            {/* Logo */}
            <Box
              component="a"
              href="/"
              sx={{
                mr: 2,
                flexGrow: { xs: 1, md: 0 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                height: '100%',
                position: 'relative',
                overflow: 'visible', // Allow logo to overflow if needed
              }}
            >
              <Box
                component="img"
                src={isDarkMode ? LernaWLogo : LernaLogo}
                alt="Lerna Logo"
                sx={{
                  maxWidth: { xs: '120px', sm: '160px', md: '180px' }, // Responsive width control
                  width: 'auto', // Keep aspect ratio
                  height: 'auto', // Keep aspect ratio
                  maxHeight: '44px', // Set maximum height to fit navbar
                  transform: 'scale(1.95)', // Scale up the logo by 15%
                  transformOrigin: 'left center', // Scale from left side
                  position: 'relative', // Needed for proper scaling
                  display: 'block',
                }}
              />
            </Box>

            
            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              <Button
                color="inherit"
                href="#features"
                sx={{ mx: 1 }}
              >
                Features
              </Button>
              <Button
                color="inherit"
                href="#roles"
                sx={{ mx: 1 }}
              >
                Roles
              </Button>
              <Button
                color="inherit"
                href="#how-it-works"
                sx={{ mx: 1 }}
              >
                How It Works
              </Button>
            </Box>
            
            {/* Theme Toggle */}
            <IconButton 
              onClick={toggleTheme} 
              color="inherit" 
              sx={{ ml: 1 }}
              aria-label="toggle theme"
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            
            {/* Wallet Connection with RainbowKit */}
            <Box sx={{ ml: 2 }}>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button
                              onClick={openConnectModal}
                              variant="contained"
                              startIcon={<AccountBalanceWalletIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button
                              onClick={openChainModal}
                              variant="contained"
                              color="error"
                              sx={{ borderRadius: 2 }}
                            >
                              Wrong Network
                            </Button>
                          );
                        }

                        return (
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Button
                              onClick={openChainModal}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                borderRadius: 2,
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center'
                              }}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              {chain.hasIcon && (
                                <Box
                                  component="img"
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  sx={{ width: 16, height: 16, mr: 1 }}
                                />
                              )}
                              {chain.name}
                            </Button>

                            <Button
                              onClick={openAccountModal}
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              startIcon={<AccountBalanceWalletIcon />}
                            >
                              {account.displayName}
                            </Button>
                          </Box>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            <ListItem sx={{ pb: 2 }}>
              <Typography variant="h6" color="primary" fontWeight={700}>
                Lerna
              </Typography>
            </ListItem>
            <Divider />
            
            <ListItem button component="a" href="#features" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Features" />
            </ListItem>
            
            <ListItem button component="a" href="#roles" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Roles" />
            </ListItem>
            
            <ListItem button component="a" href="#how-it-works" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="How It Works" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 10, md: 16 },
          pb: { xs: 8, md: 12 },
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.paper} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
          position: 'relative',
          overflow: 'hidden',
          color: 'white'
        }}
      >
        {/* Decorative shapes */}
        <Box sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          top: '-250px',
          right: '-100px',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }} />
        
        <Box sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          bottom: '-100px',
          left: '10%',
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Centered content approach */}
          <Box sx={{ 
            textAlign: 'center', 
            maxWidth: '900px', 
            mx: 'auto',
            px: { xs: 2, md: 0 }
          }}>
            <Typography 
              variant="h1" 
              component="h1" 
              fontWeight="bold"
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.1,
                mb: 3
              }}
            >
              Decentralized Learning with{' '}
              <Box 
                component="span" 
                sx={{ 
                  color: theme.palette.secondary.light,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: theme.palette.secondary.light,
                    borderRadius: '2px'
                  }
                }}
              >
                Blockchain Verification
              </Box>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 300,
                mb: 6,
                opacity: 0.9,
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Lerna is a next-generation on-chain learning management system that brings 
              transparency, verifiability, and modular learning to education.
            </Typography>
            
            {/* Features highlight */}
            <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'center' }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 2
                }}>
                  <VerifiedIcon sx={{ fontSize: 40, mb: 1, color: 'secondary.light' }} />
                  <Typography variant="h6" fontWeight="bold">Verified Credentials</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    On-chain certification
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 2
                }}>
                  <AssignmentIcon sx={{ fontSize: 40, mb: 1, color: 'secondary.light' }} />
                  <Typography variant="h6" fontWeight="bold">Modular Learning</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Structured learning paths
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 2
                }}>
                  <SecurityIcon sx={{ fontSize: 40, mb: 1, color: 'secondary.light' }} />
                  <Typography variant="h6" fontWeight="bold">Secure Access</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Wallet-based authentication
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {/* CTA Buttons */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
              mt: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}>
              {isConnected ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="/dashboard"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={openConnectModal}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 2,
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Start Learning Now
                </Button>
              )}
              
              <Button
                variant="outlined"
                size="large"
                href="#how-it-works"
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: 2,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ 
        py: 10,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background design element */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: theme => theme.palette.mode === 'dark' 
              ? 'radial-gradient(circle at 80% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 60%)'
              : 'radial-gradient(circle at 80% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 60%)',
            zIndex: 0
          }} 
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="FEATURES" 
              color="primary" 
              size="small"
              sx={{ mb: 2, fontWeight: 'bold' }}
            />
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              A Better Way to Learn and Verify Skills
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Lerna combines blockchain technology with modern learning methodologies 
              to create a transparent, verifiable educational experience.
            </Typography>
          </Box>

          <Grid container spacing={4} direction="column">
            {features.map((feature, index) => (
              <Grid item key={index}>
                <Card 
                  sx={{ 
                    display: 'flex',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    },
                    position: 'relative',
                    background: theme => theme.palette.mode === 'dark' 
                      ? 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0))'
                      : 'linear-gradient(to right, white, #f8f9fa)'
                  }}
                  elevation={2}
                >
                  {/* Right side decorative design elements */}
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '30%',
                      overflow: 'hidden',
                      zIndex: 0
                    }}
                  >
                    {/* Large circle */}
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        right: -40,
                        top: '50%',
                        marginTop: '-60px',
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        border: `3px dashed ${feature.color}40`,
                        opacity: 0.8
                      }} 
                    />
                    
                    {/* Small circle */}
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        right: 40,
                        bottom: index % 2 === 0 ? 20 : 'auto',
                        top: index % 2 === 1 ? 20 : 'auto',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: `${feature.color}20`,
                        boxShadow: `0 0 0 8px ${feature.color}10`
                      }} 
                    />
                    
                    {/* Decorative dots pattern */}
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 100,
                        top: index % 2 === 0 ? 20 : 'auto',
                        bottom: index % 2 === 1 ? 20 : 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px',
                      }}
                    >
                      {[...Array(9)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: `${feature.color}60`,
                            opacity: (i % 3) * 0.2 + 0.2 // Creates a gradient effect
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Accent color bar on the side */}
                  <Box 
                    sx={{ 
                      width: 8,
                      backgroundColor: feature.color,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 2
                    }}
                  >
                    {/* Decorative dots on the color bar */}
                    {[...Array(3)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          opacity: 0.7
                        }}
                      />
                    ))}
                  </Box>

                  <CardContent 
                    sx={{ 
                      py: 4, 
                      px: 5,
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 1,
                      width: '100%'
                    }}
                  >
                    {/* Enhanced Icon */}
                    <Box
                      sx={{
                        position: 'relative',
                        mr: 4
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '64px',
                          height: '64px',
                          borderRadius: '16px',
                          transform: 'rotate(45deg)',
                          backgroundColor: `${feature.color}30`,
                          top: '6px',
                          left: '6px'
                        }}
                      />
                      <Avatar 
                        sx={{ 
                          bgcolor: feature.color,
                          width: 64,
                          height: 64,
                          boxShadow: `0 8px 16px -2px ${feature.color}50`,
                          position: 'relative',
                          zIndex: 1
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, maxWidth: '60%' }}>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom 
                        fontWeight="600"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '&::after': {
                            content: '""',
                            display: 'inline-block',
                            width: '40px',
                            height: '2px',
                            backgroundColor: feature.color,
                            ml: 2,
                            borderRadius: '1px'
                          }
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                    
                    {/* Arrow icon on right */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ml: 'auto',
                        mr: 2,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: 'background.paper',
                        color: feature.color,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: feature.color,
                          color: 'white',
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Roles Section */}
      <Box 
        id="roles" 
        sx={{ 
          py: 10, 
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="USER ROLES" 
              color="secondary" 
              size="small"
              sx={{ mb: 2, fontWeight: 'bold' }}
            />
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Find Your Place in the Ecosystem
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Lerna supports different user roles, each with specific permissions and capabilities
              tailored to their educational journey.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {roles.map((role, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderTop: 4,
                    borderColor: `${role.color}.main`,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                  elevation={2}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: `${role.color}.main`, mr: 2 }}>
                        {role.icon}
                      </Avatar>
                      <Typography variant="h5" component="h3" fontWeight="500">
                        {role.title}
                      </Typography>
                    </Box>
                    
                    <Typography color="text.secondary" paragraph>
                      {role.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom color={`${role.color}.main`}>
                      CAPABILITIES:
                    </Typography>
                    
                    <Box component="ul" sx={{ pl: 2 }}>
                      {role.capabilities.map((capability, idx) => (
                        <Typography 
                          component="li" 
                          key={idx}
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {capability}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="PROCESS" 
              color="primary" 
              size="small"
              sx={{ mb: 2, fontWeight: 'bold' }}
            />
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              How Lerna Works
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              A simple yet powerful learning flow that leverages blockchain 
              to create a transparent and verifiable educational journey.
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 6 } }}>
                {steps.map((step, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      mb: 4,
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      {step.number}
                    </Box>
                    
                    {index < steps.length - 1 && (
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: 60,
                          left: 30,
                          width: 2,
                          height: 40,
                          bgcolor: 'primary.light',
                          zIndex: 0
                        }} 
                      />
                    )}
                    
                    <Box>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight="500">
                        {step.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={4}
                sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={student}
                  alt="Learning path visualization"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 8,
          bgcolor: 'primary.main',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={10}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              bgcolor: 'primary.dark',
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                  Ready to Transform Your Learning Experience?
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  Join Lerna today and start earning verifiable credentials while building valuable skills 
                  for the Web3 ecosystem and beyond.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-end' }
                  }}
                >
                  {isConnected ? (
                    <>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        href="/dashboard"
                        sx={{ 
                          py: 1.5, 
                          px: 4, 
                          borderRadius: 2,
                          width: { xs: '100%', sm: 'auto' }
                        }}
                      >
                        Go to Dashboard
                      </Button>
                      <Typography 
                        variant="body2" 
                        sx={{ mt: 2, opacity: 0.8 }}
                      >
                        Wallet Connected
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={openConnectModal}
                        sx={{ 
                          py: 1.5, 
                          px: 4, 
                          borderRadius: 2,
                          width: { xs: '100%', sm: 'auto' }
                        }}
                      >
                        Connect Wallet to Start
                      </Button>
                      <Typography 
                        variant="body2" 
                        sx={{ mt: 2, opacity: 0.8, textAlign: { xs: 'center', md: 'right' } }}
                      >
                        No account setup required, just connect your wallet
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 6,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h5" 
                component="div" 
                color="primary.main" 
                fontWeight="bold" 
                gutterBottom
              >
                Lerna
              </Typography>
              <Typography color="text.secondary" paragraph>
                The next-generation blockchain-based learning management system.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Platform</Typography>
                  <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#features" sx={{ p: 0 }}>Features</Button>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#roles" sx={{ p: 0 }}>Roles</Button>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#how-it-works" sx={{ p: 0 }}>How It Works</Button>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Resources</Typography>
                  <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#" sx={{ p: 0 }}>Documentation</Button>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#" sx={{ p: 0 }}>Tutorials</Button>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#" sx={{ p: 0 }}>FAQs</Button>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Legal</Typography>
                  <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#" sx={{ p: 0 }}>Privacy Policy</Button>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Button color="inherit" href="#" sx={{ p: 0 }}>Terms of Service</Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 0 } }}
            >
              &copy; {new Date().getFullYear()} Lerna, Inc. All rights reserved.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton color="inherit" aria-label="twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
                </svg>
              </IconButton>
              <IconButton color="inherit" aria-label="github">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </IconButton>
              <IconButton color="inherit" aria-label="discord">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Role Registration Dialog */}
      <RoleRegistrationDialog 
        open={showRoleDialog} 
        onClose={handleRoleDialogClose} 
      />
    </Box>
  );
};

export default LandingPage;