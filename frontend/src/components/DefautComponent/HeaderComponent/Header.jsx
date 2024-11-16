import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, 
  useMediaQuery, useTheme, Menu, MenuItem, Fade, IconButton,
  Badge, Avatar, Link
} from '@mui/material';
import { 
  Menu as MenuIcon, Favorite as FavoriteIcon, 
  Notifications as NotificationsIcon, AccountCircle as SignInIcon, 
  Search as SearchIcon, AccountCircle as ProfileIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Logo from '~/components/LogoComponent/Logo';
import AppModal from '~/components/Modal/Modal';
import Login from '~/features/Authentication/components/AuthLogin/Login';
import { useAppStore } from '~/store/appStore';
import { useNavigate } from 'react-router-dom';
import { StyledAppBar, NavLink, Search, SearchIconWrapper, StyledInputBase, IconButtonWithBadge } from './style';

const EnhancedHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAppStore();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Introduction', path: '/introduction' },
    { label: 'News', path: '/news' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileClick = () => navigate('/profile');
  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {isMobile && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.path)}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />
          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4 }}>
              {menuItems.map((item) => (
                <NavLink key={item.label} onClick={() => navigate(item.path)} sx={{ mr: 2 }}>
                  {item.label}
                </NavLink>
              ))}
            </Box>
          )}
        </Box>
        {!isMobile && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton color="inherit" onClick={toggleSearch}>
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          )}
          <IconButtonWithBadge color="inherit" aria-label="favorites">
            <Badge badgeContent={4} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButtonWithBadge>
          <IconButtonWithBadge color="inherit" aria-label="notifications">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButtonWithBadge>
          {auth.isAuth ? (
            <IconButton color="inherit" onClick={handleProfileClick}>
              <Avatar alt={auth.user.username} src="/path-to-avatar.jpg" sx={{ width: 32, height: 32 }} />
            </IconButton>
          ) : (
            <AppModal
              trigger={
                <IconButton color="inherit" aria-label="sign in">
                  <SignInIcon />
                </IconButton>
              }
            >
              <Login />
            </AppModal>
          )}
        </Box>
      </Toolbar>
      {isMobile && searchOpen && (
        <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
            />
          </Search>
        </Box>
      )}
    </StyledAppBar>
  );
};

export default EnhancedHeader;