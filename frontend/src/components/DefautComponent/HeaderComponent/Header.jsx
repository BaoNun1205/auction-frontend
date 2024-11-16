import React from 'react';
import { 
  AppBar, Toolbar, Typography, InputBase, Box, 
  useMediaQuery, useTheme, Menu, MenuItem, Fade, IconButton
} from '@mui/material';
import { 
  Menu as MenuIcon, Favorite as FavoriteIcon, 
  Notifications as NotificationsIcon, AccountCircle as SignInIcon, 
  Search as SearchIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link } from '@mui/material';
import Logo from '~/components/LogoComponent/Logo';
import AppModal from '~/components/Modal/Modal';
import LoginForm from '~/features/Authentication/components/AuthLogin/Login';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#b41712',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

const IconButtonWithLabel = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  margin: theme.spacing(0, 2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Introduction', path: '/introduction' },
    { label: 'News', path: '/news' },
    { label: 'Contact', path: '/contact' },
  ];

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
                <MenuItem key={item.label} onClick={handleMenuClose} component={Link} href={item.path}>
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
                <NavLink key={item.label} href={item.path} sx={{ mr: 2 }}>
                  {item.label}
                </NavLink>
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButtonWithLabel aria-label="favorites">
            <FavoriteIcon />
            <Typography variant="caption">Yêu thích</Typography>
          </IconButtonWithLabel>
          <IconButtonWithLabel aria-label="notifications">
            <NotificationsIcon />
            <Typography variant="caption">Thông báo</Typography>
          </IconButtonWithLabel>
          <AppModal
            trigger={
              <IconButtonWithLabel aria-label="sign in">
                <SignInIcon />
                <Typography variant="caption">Đăng nhập</Typography>
              </IconButtonWithLabel>
            }
          >
            <LoginForm />
          </AppModal>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}