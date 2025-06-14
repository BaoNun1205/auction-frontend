import React from 'react'
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { MoreVert, Notifications, NotificationsOff } from '@mui/icons-material'

const ChatHeader = ({
  targetUser,
  shopMenuAnchorEl,
  setShopMenuAnchorEl,
  notificationsEnabled,
  setNotificationsEnabled
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const handleMenuOpen = (event) => {
    setShopMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setShopMenuAnchorEl(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: isMobile ? 1 : isTablet ? 1.5 : 2,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'white',
        gap: isMobile ? 1 : 2
      }}
    >
      <Avatar
        src={targetUser?.avatar}
        sx={{
          width: isMobile ? 36 : isTablet ? 40 : 44,
          height: isMobile ? 36 : isTablet ? 40 : 44
        }}
      >
        {targetUser?.name?.charAt(0) || targetUser?.username?.charAt(0)}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant={isMobile ? 'subtitle2' : 'subtitle1'}
          sx={{
            fontWeight: 600,
            color: '#333',
            fontSize: isMobile ? '0.9rem' : undefined
          }}
          noWrap
        >
          {targetUser?.name || targetUser?.username}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#4caf50',
            fontSize: isMobile ? '0.7rem' : '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Box
            sx={{
              width: isMobile ? 6 : 8,
              height: isMobile ? 6 : 8,
              borderRadius: '50%',
              bgcolor: '#4caf50'
            }}
          />
          Đang hoạt động
        </Typography>
      </Box>

      <IconButton onClick={handleMenuOpen} size={isMobile ? 'small' : 'medium'} sx={{ color: '#666' }}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={shopMenuAnchorEl}
        open={Boolean(shopMenuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <FormControlLabel
            control={
              <Switch
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                size={isMobile ? 'small' : 'medium'}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {notificationsEnabled ? <Notifications /> : <NotificationsOff />}
                <Typography variant={isMobile ? 'body2' : 'body1'}>Thông báo</Typography>
              </Box>
            }
          />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ChatHeader
