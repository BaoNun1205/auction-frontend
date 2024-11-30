import React, { useState } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText, 
  ListItemIcon, Button, styled, useTheme, useMediaQuery, IconButton, Drawer,
  Collapse
} from '@mui/material';
import { 
  Person, EmojiEvents, Gavel, Store, ExitToApp, LocationOn, Menu as MenuIcon,
  ExpandLess, ExpandMore
} from '@mui/icons-material';
import { Home, FolderTree, ShoppingBag, Calendar, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '~/hooks/authHook';
import AppModal from '~/components/Modal/Modal';
import MyAssets from '../components/MyAsset';
import AuctionRequest from '../components/AuctionRequest';

const primaryColor = '#b41712';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .03)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 6px 10px 4px rgba(0, 0, 0, .07)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(180, 23, 18, 0.1)',
    transform: 'translateX(5px)',
  },
  ...(active && {
    backgroundColor: primaryColor,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: '#8B0000',
    },
  }),
}));

const Main = () => {
  const [tab, setTab] = useState(1);
  const [subTab, setSubTab] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sellerMenuOpen, setSellerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSellerMenuToggle = () => {
    setSellerMenuOpen(!sellerMenuOpen);
  };

  const menuItems = [
    { text: 'Tài sản', icon: <ShoppingBag />, value: 1 },
    { text: 'Yêu cầu', icon: <FileText />, value: 2 }
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
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, mx: 'auto' }}>
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
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
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
              {tab === 1 && <MyAssets />}
              {tab === 2 && <AuctionRequest />}
            </StyledPaper>
          </Grid>
        </Grid>

        <AppModal
          open={logoutModalOpen}
          onClose={handleCloseLogoutModal}
        >
          <Box sx={{ p: 3, borderRadius: theme.shape.borderRadius * 2 }}>
            <Typography id="logout-modal-title" variant="h6" component="h2" color="#B7201B" gutterBottom>
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
                color="primary" 
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
              </Button>
            </Box>
          </Box>
        </AppModal>
      </Container>
    </Box>
  );
};

export default Main;

