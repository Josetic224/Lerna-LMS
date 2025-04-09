// LandingPage.jsx
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useAppContext } from './AppContext';
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
  const { isDarkMode, toggleTheme, showNotification } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // RainbowKit hooks for wallet interactions
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  
  // Get account information from wagmi
  const { address, isConnected } = useAccount();
  
  // Truncate wallet address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                mr: 2,
                flexGrow: { xs: 1, md: 0 },
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              Lerna
            </Typography>
            
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
            ? `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  fontWeight="bold"
                  color={theme.palette.mode === 'dark' ? 'white' : 'primary.dark'}
                  gutterBottom
                >
                  Decentralized Learning with <Typography component="span" variant="h2" fontWeight="bold" color="secondary.main">Blockchain Verification</Typography>
                </Typography>
                
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  paragraph 
                  sx={{ mt: 2, mb: 4 }}
                >
                  Lerna is a next-generation on-chain learning management system that brings 
                  transparency, verifiability, and modular learning to education. 
                  Earn verifiable credentials while learning at your own pace.
                </Typography>
                
                <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  {isConnected ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      href="/dashboard"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={openConnectModal}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                    >
                      Start Learning Now
                    </Button>
                  )}
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    href="#how-it-works"
                    sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: { xs: 4, md: 0 }
              }}>
                <Paper 
                  elevation={6} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    width: '100%',
                    maxWidth: 500,
                    height: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src="/api/placeholder/600/400"
                    alt="Lerna Platform"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'cover',
                      borderRadius: 8
                    }}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 10 }}>
        <Container maxWidth="lg">
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

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                  elevation={2}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: feature.color,
                        width: 56,
                        height: 56,
                        mb: 2
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="500">
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
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
                  src="/api/placeholder/600/500"
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
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
    </Box>
  );
};

export default LandingPage;