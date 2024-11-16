import React, { useState } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, 
  ListItemIcon, TextField, Select, MenuItem, Button, Modal, styled
} from '@mui/material';
import { 
  Person, EmojiEvents, Gavel, Store, ExitToApp
} from '@mui/icons-material';
import WonItems from './WonItems';
import RegisterSeller from './RegisterSeller';

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

const CustomerInformation = () => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h4" gutterBottom color="primary" align="center" fontWeight="bold">
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username/Email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State/Province"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        Payment Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select
            fullWidth
            displayEmpty
            variant="outlined"
            label="Bank Name"
          >
            <MenuItem value="">
              <em>Select Bank Name</em>
            </MenuItem>
            <MenuItem value="1">Bank A</MenuItem>
            <MenuItem value="2">Bank B</MenuItem>
            <MenuItem value="3">Bank C</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            displayEmpty
            variant="outlined"
            label="Bank Number"
          >
            <MenuItem value="">
              <em>Select Bank Number</em>
            </MenuItem>
            <MenuItem value="1">1234567890</MenuItem>
            <MenuItem value="2">0987654321</MenuItem>
            <MenuItem value="3">1357924680</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            displayEmpty
            variant="outlined"
            label="Bank Branch"
          >
            <MenuItem value="">
              <em>Select Bank Branch</em>
            </MenuItem>
            <MenuItem value="1">Main Branch</MenuItem>
            <MenuItem value="2">Downtown Branch</MenuItem>
            <MenuItem value="3">Suburb Branch</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button variant="contained" color="primary" size="large">
          UPDATE
        </Button>
      </Box>
    </Box>
  );
}

const CustomerPersonalProfile = () => {
  const [tab, setTab] = useState(1);
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    setLogout(true);
  };

  const handleCloseLogout = () => {
    setLogout(false);
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
            {tab === 3 && <Typography>Auction Content</Typography>}
            {tab === 4 && <RegisterSeller />}
          </StyledPaper>
        </Grid>
      </Grid>

      <Modal
        open={logout}
        onClose={handleCloseLogout}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="logout-modal-title" variant="h6" component="h2" color="primary" gutterBottom>
            Confirm Logout
          </Typography>
          <Typography id="logout-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to logout?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseLogout} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCloseLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default CustomerPersonalProfile;
