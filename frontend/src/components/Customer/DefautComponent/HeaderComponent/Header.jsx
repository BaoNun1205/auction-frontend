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
  Avatar
} from '@mui/material'
import {
  Menu as MenuIcon,
  Favorite as FavoriteIcon,
  AccountCircle as SignInIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AccessTime
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
  const [showSuggestions, setShowSuggestions] = useState(false)
  console.log('user: ', user)
  // Lấy danh sách thông báo của người dùng

  const currentUserId = auth?.user?.id

  const { data: notifications = [], isLoading } = useGetNotificationsByReceiverId(currentUserId)
  const { data: recentKeywords = [] } = useRecentKeywords(currentUserId)
  const { mutate: recordSearch } = useRecordSearch()

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
    </StyledAppBar>
  )
}

export default Header
