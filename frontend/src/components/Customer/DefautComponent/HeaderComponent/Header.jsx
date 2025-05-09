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
  Link
} from '@mui/material'
import {
  Menu as MenuIcon,
  Favorite as FavoriteIcon,
  AccountCircle as SignInIcon,
  Search as SearchIcon,
  Close as CloseIcon
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

const Header = () => {
  const theme = useTheme()
  const { auth } = useAppStore() // Lấy thông tin auth từ store
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { data: user, refetch: refetchUser } = useGetUserById(auth?.user?.id)
  console.log('user: ', user)
  // Lấy danh sách thông báo của người dùng
  const { data: notifications = [], isLoading } = useGetNotificationsByReceiverId(auth?.user?.id)
  const menuItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giới thiệu', path: '/introduction' },
    { label: 'Tin tức', path: '/news' },
    { label: 'Liên hệ', path: '/contact' }
  ]

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const keyword = searchParams.get('keyword') || ''
    setSearchKeyword(keyword)
  }, [location.search])

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleProfileClick = () => navigate('/profile')
  const handleMenuItemClick = (path) => {
    navigate(path)
    handleMenuClose()
  }
  const toggleSearch = () => setSearchOpen(!searchOpen)

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    navigate(`/search?keyword=${searchKeyword.trim()}`)
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {isMobile && (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} TransitionComponent={Fade}>
              {menuItems.map((item) => (
                <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.path)}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
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
              {menuItems.map((item) => (
                <NavLink key={item.label} onClick={() => navigate(item.path)} sx={{ mr: 2 }}>
                  {item.label}
                </NavLink>
              ))}
            </Box>
          )}
        </Box>
        {!isMobile && (
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </Search>
          </Box>
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
          {/* Sử dụng component Notification với userId và authToken */}
          {auth.isAuth && user && (
            <>
              <ChatButton />
              <Notification
                initialNotifications={notifications} // Truyền danh sách thông báo ban đầu
              />
            </>
          )}
          {auth.isAuth ? (
            <IconButton color="inherit" onClick={handleProfileClick}>
              <Avatar alt={user?.username} src={user?.avatar} sx={{ width: 32, height: 32 }} />
            </IconButton>
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
      </Toolbar>
      {isMobile && searchOpen && (
        <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchKeyword}
                onChange={handleSearchChange}
                fullWidth
              />
            </Search>
          </Box>
        </Box>
      )}
    </StyledAppBar>
  )
}

export default Header