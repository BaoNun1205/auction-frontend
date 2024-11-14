import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as OrdersIcon, Notifications as NotificationsIcon, AccountCircle as SignInIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import Logo from '~/components/LogoComponent/Logo';
import AppModal from '~/components/Modal/Modal';
import LoginForm from '~/features/Authentication/components/AuthLogin/Login';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#b41712', // Remove background
  border: `1px solid ${theme.palette.common.white}`, // Add white border
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `1em`,  // Adjust padding as needed
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch', // Make the input longer
    },
  },
  '&:hover': {
    backgroundColor: '#b41712', // Keep background transparent on hover
  },
}));

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#b41712' }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 4, ml: 2 }}>
                  <Link href="/customer" color="inherit" underline="none" sx={{ color: 'white' }}>
                    Home
                  </Link>
                  <Link href="#introduction" color="inherit" underline="none" sx={{ color: 'white' }}>
                    Introduction
                  </Link>
                  <Link href="#news" color="inherit" underline="none" sx={{ color: 'white' }}>
                    News
                  </Link>
                  <Link href="#contact" color="inherit" underline="none" sx={{ color: 'white' }}>
                    Contact
                  </Link>
                </Box>
              )}
            </Box>
            {/* Centering the Search input without the icon */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {searchVisible && (
                <Search>
                  <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleSearchClick} color="white">
                <SearchIcon sx={{ color: 'white' }} />
                <Typography variant="body2" sx={{ ml: 0.5, color: 'white' }}>Search</Typography>
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, color: 'white' }}>
                <OrdersIcon />
                <Typography variant="body2" sx={{ ml: 0.5, color: 'white' }}>Orders</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, color: 'white' }}>
                <NotificationsIcon />
                <Typography variant="body2" sx={{ ml: 0.5, color: 'white' }}>Notifications</Typography>
              </Box>
              <AppModal trigger={<Box sx={{ display: 'flex', alignItems: 'center', ml: 3, color: 'white', cursor: 'pointer' }}>
                <SignInIcon />
                <Typography variant="body2" sx={{ ml: 0.5, color: 'white' }}>Sign In</Typography>
              </Box>}>
                <LoginForm />
              </AppModal>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}