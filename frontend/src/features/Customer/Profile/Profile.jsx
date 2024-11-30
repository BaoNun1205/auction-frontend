import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText,
  ListItemIcon, Button, styled, useTheme, useMediaQuery, IconButton, Drawer,
  Collapse, Breadcrumbs
} from '@mui/material';
import {
  Person, EmojiEvents, Gavel, Store, ExitToApp, LocationOn, Menu as MenuIcon,
  ExpandLess, ExpandMore
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '~/hooks/authHook';
import AppModal from '~/components/Modal/Modal';
import WonItems from './WonItems';
import AuctionInfo from './AuctionInfo';
import CustomerInformation from './CustomerInfomation';
import AddressesInfomation from './AddressInfomation/AddressInfomation';
import { ChevronRight } from 'lucide-react';

const primaryColor = '#b41712';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .03)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 6px 10px 4px rgba(0, 0, 0, .07)'
  }
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(180, 23, 18, 0.1)',
    transform: 'translateX(5px)'
  },
  ...(active && {
    backgroundColor: primaryColor,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: '#8B0000'
    }
  })
}));

const Profile = () => {
  const [tab, setTab] = useState(1);
  const [subTab, setSubTab] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sellerMenuOpen, setSellerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigate = (path) => {
    navigate(path);
  };

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
      }
    });
    setLogoutModalOpen(false);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSellerMenuToggle = () => {
    setSellerMenuOpen(!sellerMenuOpen);
  };

  const menuItems = [
    { text: 'Hồ sơ', icon: <Person />, value: 1 },
    { text: 'Địa chỉ', icon: <LocationOn />, value: 2 },
    { text: 'Chiến lợi phẩm', icon: <EmojiEvents />, value: 3 },
    { text: 'Phiên đấu giá', icon: <Gavel />, value: 4 },
    { text: 'Bán đấu giá', icon: <Store />, value: 5 },
    { text: 'Đăng xuất', icon: <ExitToApp />, value: 6, onClick: handleLogout }
  ];

  const drawer = (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom align="center" fontWeight="bold" sx={{ my: 2 }}>
        Thông tin tài khoản
      </Typography>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.value}>
            <StyledListItem
              button
              active={tab === item.value}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else if (item.subItems) {
                  handleSellerMenuToggle();
                } else {
                  setTab(item.value);
                  setSubTab(null);
                  if (isMobile) {
                    handleDrawerToggle();
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems && (sellerMenuOpen ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItem>
            {item.subItems && (
              <Collapse in={sellerMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <StyledListItem
                      button
                      key={subItem.value}
                      active={subTab === subItem.value}
                      sx={{ pl: 4 }}
                      onClick={() => {
                        setTab(item.value);
                        setSubTab(subItem.value);
                        if (isMobile) {
                          handleDrawerToggle();
                        }
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledPaper>
  );

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
          <Breadcrumbs separator={<ChevronRight fontSize="small" />} aria-label="breadcrumb">
            <Typography
              color="inherit"
              onClick={() => handleNavigate('/')}
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Trang chủ
            </Typography>
            <Typography
              color="inherit"
              onClick={() => handleNavigate('/profile')}
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Thông tin tài khoản
            </Typography>
            <Typography color="text.primary">
              {tab === 1 && 'Hồ sơ'}
              {tab === 2 && 'Địa chỉ'}
              {tab === 3 && 'Chiến lợi phẩm'}
              {tab === 4 && 'Phiên đấu giá'}
              {tab === 5 && 'Bán đấu giá'}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Grid container spacing={3} justifyContent="center">
            {isMobile && (
              <Box sx={{ position: 'fixed', right: 16, top: 16, zIndex: 1100 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {isMobile ? (
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
                  }}
                >
                  {drawer}
                </Drawer>
              ) : (
                drawer
              )}
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={9}>
              <StyledPaper elevation={3}>
                {tab === 1 && <CustomerInformation />}
                {tab === 2 && <AddressesInfomation />}
                {tab === 3 && <WonItems />}
                {tab === 4 && <AuctionInfo />}
                {tab === 5 && navigate('/vendor')}
              </StyledPaper>
            </Grid>
          </Grid>

          <AppModal
            open={logoutModalOpen}
            onClose={handleCloseLogoutModal}
            fullScreen
          >
            <Box sx={{ p: 3, borderRadius: theme.shape.borderRadius * 2 }}>
              <Typography id="logout-modal-title" variant="h6" component="h2" color={primaryColor} gutterBottom>
                Xác nhận đăng xuất
              </Typography>
              <Typography id="logout-modal-description" sx={{ mt: 2 }}>
                Bạn có chắc chắn muốn đăng xuất không?
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleCloseLogoutModal} sx={{ mr: 2 }}>
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: '#8B0000' } }}
                  onClick={handleConfirmLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                </Button>
              </Box>
            </Box>
          </AppModal>
        </Box>
      </Container>
    </>
  );
};

export default Profile;