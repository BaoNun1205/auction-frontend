import React, { useState, useEffect } from 'react'
import {
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Fade,
  IconButton,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'
import {
  Menu as MenuIcon,
  Favorite as FavoriteIcon,
  AccountCircle as SignInIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AccessTime,
  Person,
  LocationOn,
  EmojiEvents,
  Gavel,
  Store,
  Wallet,
  Payments,
  ExitToApp,
  Home,
  Info,
  Article,
  ContactMail
} from '@mui/icons-material'
import Logo from '~/assets/images/logo/logo.png'
import AppModal from '~/components/Modal/Modal'
import { useAppStore } from '~/store/appStore'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  StyledAppBar,
  NavLink,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  IconButtonWithBadge,
  LogoContainer
} from './style'
import { useGetUserById } from '~/hooks/userHook'
import { useGetNotificationsByReceiverId } from '~/hooks/notificationHook'
import Authentication from '~/features/Authentication'
import Notification from './Notification'
import ChatButton from '~/features/Chat/ChatUser'
import { useRecentKeywords, useRecordSearch } from '~/hooks/searchHistoryHook'
import { useCustomNavigate } from '~/utils/navigate'
import { useLogout } from '~/hooks/authHook'
import { primaryColor } from '~/utils/config'
import HeaderSkeleton from './skeletons/HeaderSkeleton'

const Header = () => {
  const theme = useTheme()
  const { auth } = useAppStore()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [navMenuAnchor, setNavMenuAnchor] = useState(null)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { data: user, isLoading: isLoadingUser } = useGetUserById(auth?.user?.id)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { handleNavigate } = useCustomNavigate()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const { mutate: logout, isLoading: isLoggingOut } = useLogout()

  const currentUserId = auth?.user?.id
  const { data: notifications = [], isLoading: isLoadingNoti } = useGetNotificationsByReceiverId(currentUserId)
  const { data: recentKeywords = [] } = useRecentKeywords(currentUserId)
  const { mutate: recordSearch } = useRecordSearch()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const keyword = searchParams.get('keyword') || ''
    setSearchKeyword(keyword)
  }, [location.search])

  if (isLoadingUser || isLoadingNoti) {
    const isAuth = Boolean(auth?.user?.id);
    return <HeaderSkeleton isAuth={isAuth} />;
  }

  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const handleConfirmLogout = () => {
    logout(null, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (error) => {
        console.error('Error logging out:', error)
      }
    })
    setLogoutDialogOpen(false)
  }

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false)
  }

  const navItems = [
    { label: 'Trang chủ', path: '/', icon: <Home /> },
    { label: 'Giới thiệu', path: '/introduction', icon: <Info /> },
    { label: 'Tin tức', path: '/news', icon: <Article /> },
    { label: 'Liên hệ', path: '/contact', icon: <ContactMail /> }
  ]

  const profileItems = [
    { text: 'Hồ sơ', icon: <Person />, value: 1, onClick: () => handleNavigate('/profile', { tabSet: 1 }) },
    { text: 'Địa chỉ', icon: <LocationOn />, value: 2, onClick: () => handleNavigate('/profile', { tabSet: 2 }) },
    { text: 'Vật phẩm đã thắng', icon: <EmojiEvents />, value: 3, onClick: () => handleNavigate('/profile', { tabSet: 3 }) },
    { text: 'Phiên đấu giá', icon: <Gavel />, value: 4, onClick: () => handleNavigate('/profile', { tabSet: 4 }) },
    { text: 'Bán đấu giá', icon: <Store />, value: 5, onClick: () => handleNavigate('/profile', { tabSet: 5 }) },
    { text: 'Ví của tôi', icon: <Wallet />, value: 6, onClick: () => handleNavigate('/profile', { tabSet: 6 }) },
    { text: 'Lịch sử thanh toán', icon: <Payments />, value: 7, onClick: () => handleNavigate('/profile', { tabSet: 7 }) },
    { text: 'Đăng xuất', icon: <ExitToApp />, value: 8, onClick: handleLogout }
  ]

  const handleNavMenuOpen = (event) => setNavMenuAnchor(event.currentTarget)
  const handleNavMenuClose = () => setNavMenuAnchor(null)
  const handleProfileMenuOpen = (event) => setProfileMenuAnchor(event.currentTarget)
  const handleProfileMenuClose = () => setProfileMenuAnchor(null)
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen)
  const toggleSearch = () => setSearchOpen(!searchOpen)

  const handleNavItemClick = (path) => {
    navigate(path)
    handleNavMenuClose()
    setDrawerOpen(false)
  }

  const handleProfileItemClick = (callback) => {
    if (callback) callback()
    handleProfileMenuClose()
  }

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    if (!searchKeyword.trim()) return

    if (auth?.user?.id) {
      recordSearch({
        userId: auth.user.id,
        keyword: searchKeyword.trim()
      })
    }

    navigate(`/search?keyword=${searchKeyword.trim()}`)

    setSearchKeyword('')
    setShowSuggestions(false)
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {isMobile && (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>

            {/* Mobile Drawer Navigation */}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 280,
                  boxSizing: 'border-box',
                  borderRadius: '0 10px 10px 0'
                }
              }}
            >
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }} color={primaryColor}>
                    Bid Master
                  </Typography>
                </Box>
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />

              {auth.isAuth && user && (
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar alt={user?.username} src={user?.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {user?.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              <Divider />

              <List sx={{ pt: 1 }}>
                {navItems.map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    onClick={() => handleNavItemClick(item.path)}
                    sx={{
                      py: 1.5,
                      borderRadius: '0 20px 20px 0',
                      mx: 1,
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: primaryColor }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>

              {auth.isAuth && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ px: 3, mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>
                    Tài khoản
                  </Typography>
                  <List>
                    {profileItems.map((item) => (
                      <ListItem
                        button
                        key={item.value}
                        onClick={() => handleProfileItemClick(item.onClick)}
                        sx={{
                          py: 1.5,
                          borderRadius: '0 20px 20px 0',
                          mx: 1,
                          mb: 0.5,
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: primaryColor }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ color: item.value === 8 ? primaryColor : 'inherit' }} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Drawer>
          </>
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <LogoContainer
            elevation={3}
            sx={{
              width: { xs: 50, md: 60, lg: 80 },
              height: { xs: 50, md: 60, lg: 80 }
            }}
            onClick={() => navigate('/')}
          >
            <Box component="img" src={Logo} alt="Logo" sx={{ width: '180%' }} />
          </LogoContainer>

          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4 }}>
              {navItems.map((item) => (
                <NavLink key={item.label} onClick={() => navigate(item.path)} sx={{ mr: 2 }}>
                  {item.label}
                </NavLink>
              ))}
            </Box>
          )}
        </Box>

        {(!isMobile || searchOpen) && (
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              display: 'flex',
              flexGrow: isMobile ? 1 : 0,
              ml: isMobile ? 1 : 0
            }}
          >
            <Search sx={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchKeyword}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (recentKeywords.length > 0) setShowSuggestions(true)
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
                sx={{
                  width: isMobile ? '100%' : 'auto'
                }}
              />
              {showSuggestions && recentKeywords.length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    mt: 0.5,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 1,
                    maxHeight: 300,
                    overflow: 'auto'
                  }}
                >
                  {recentKeywords.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setSearchKeyword(item.keyword)
                        navigate(`/search?keyword=${item.keyword}`)
                        setShowSuggestions(false)
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.primary'
                      }}
                    >
                      <AccessTime fontSize="small" color="action" />
                      {item.keyword}
                    </MenuItem>
                  ))}
                </Box>
              )}
            </Search>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton color="inherit" onClick={toggleSearch}>
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          )}

          {auth.isAuth && user && (
            <>
              <ChatButton />
              <Notification initialNotifications={notifications} />
            </>
          )}

          {auth.isAuth ? (
            <>
              <IconButton
                color="inherit"
                onClick={isMobile ? null : handleProfileMenuOpen} // Disable click on mobile
                sx={{
                  ml: 1,
                  border: '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Avatar
                  alt={user?.username}
                  src={user?.avatar}
                  sx={{
                    width: 32,
                    height: 32
                  }}
                />
              </IconButton>

              {/* Profile Menu - Desktop Only */}
              {!isMobile && (
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileMenuClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                      minWidth: 280,
                      borderRadius: 2,
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 20,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {/* User info section */}
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar alt={user?.username} src={user?.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {user?.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Menu items */}
                  <Box sx={{ py: 1 }}>
                    {profileItems.map((item) => (
                      <MenuItem
                        key={item.value}
                        onClick={() => handleProfileItemClick(item.onClick)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: primaryColor,
                            minWidth: 40
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{
                            color: item.value === 8 ? primaryColor : 'inherit'
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Box>
                </Menu>
              )}
            </>
          ) : (
            <AppModal
              trigger={
                <IconButton color="inherit" aria-label="sign in">
                  <SignInIcon />
                </IconButton>
              }
            >
              <Authentication />
            </AppModal>
          )}
        </Box>

        <Dialog
          open={logoutDialogOpen}
          onClose={handleCloseLogoutDialog}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title" color={primaryColor}>
            Xác nhận đăng xuất
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              Bạn có chắc chắn muốn đăng xuất không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog} sx={{ mr: 2 }}>
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
          </DialogActions>
        </Dialog>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header