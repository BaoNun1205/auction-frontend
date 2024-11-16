import React, { useState } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, 
  ListItemIcon, Button, styled
} from '@mui/material';
import { 
  Person, EmojiEvents, Gavel, Store, ExitToApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import WonItems from './WonItems';
import RegisterSeller from './RegisterSeller';
import AuctionInfo from './AuctionInfo';
import CustomerInformation from './CustomerInfomation';
import { useLogout } from '~/hooks/authHook';
import AppModal from '~/components/Modal/Modal';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  ...(active && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const Profile = () => {
  const [tab, setTab] = useState(1);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout(null, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        console.error('Error logging out:', error);
      },
    });
    setLogoutModalOpen(false);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const menuItems = [
    { text: 'Personal Information', icon: <Person />, value: 1 },
    { text: 'Won Items', icon: <EmojiEvents />, value: 2 },
    { text: 'Auction', icon: <Gavel />, value: 3 },
    { text: 'Register to sell items', icon: <Store />, value: 4 },
    { text: 'Logout', icon: <ExitToApp />, value: 5, onClick: handleLogout },
  ];

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
              Personal Profile
            </Typography>
            <List>
              {menuItems.map((item) => (
                <StyledListItem
                  button
                  key={item.value}
                  active={tab === item.value}
                  onClick={() => item.onClick ? item.onClick() : setTab(item.value)}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={9}>
          <StyledPaper elevation={3}>
            {tab === 1 && <CustomerInformation />}
            {tab === 2 && <WonItems />}
            {tab === 3 && <AuctionInfo />}
            {tab === 4 && <RegisterSeller />}
          </StyledPaper>
        </Grid>
      </Grid>

      <AppModal
        open={logoutModalOpen}
        onClose={handleCloseLogoutModal}
      >
        <Box>
          <Typography id="logout-modal-title" variant="h6" component="h2" color="#B7201B" gutterBottom>
            Confirm Logout
          </Typography>
          <Typography id="logout-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to logout?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseLogoutModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirmLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </AppModal>
    </Container>
  );
};

export default Profile;