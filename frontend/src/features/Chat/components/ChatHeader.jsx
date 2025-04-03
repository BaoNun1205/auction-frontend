import React from 'react'
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Switch,
  Divider,
  Avatar,
  IconButton
} from '@mui/material'
import { KeyboardArrowDown, ChevronRight } from '@mui/icons-material'

export default function ChatHeader({
  targetUser,
  shopMenuAnchorEl,
  setShopMenuAnchorEl,
  notificationsEnabled,
  setNotificationsEnabled
}) {
  const handleShopMenuOpen = (event) => setShopMenuAnchorEl(event.currentTarget)
  const handleShopMenuClose = () => setShopMenuAnchorEl(null)
  const handleNotificationToggle = () => setNotificationsEnabled((prev) => !prev)

  return (
    <Box
      sx={{
        p: 1.5,
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', gap: 0.5 }}
        onClick={handleShopMenuOpen}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {targetUser?.name || 'Đang tải...'}
        </Typography>
        <KeyboardArrowDown fontSize="small" sx={{ color: '#757575' }} />
      </Box>

      <Menu
        anchorEl={shopMenuAnchorEl}
        open={Boolean(shopMenuAnchorEl)}
        onClose={handleShopMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ '& .MuiPaper-root': { width: 280, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: 1, mt: 0.5 } }}
        MenuListProps={{ sx: { padding: 0 } }}
        disablePortal
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={targetUser?.avatar} sx={{ width: 40, height: 40 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {targetUser?.name || 'Đang tải...'}
          </Typography>
        </Box>
        <Divider />
        <MenuItem sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Tắt thông báo</Typography>
          <Switch
            size="small"
            checked={notificationsEnabled}
            onChange={handleNotificationToggle}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': { color: '#b41712' },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#b41712' }
            }}
          />
        </MenuItem>
        <MenuItem sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Tố cáo người dùng</Typography>
          <ChevronRight fontSize="small" sx={{ color: '#757575' }} />
        </MenuItem>
        <MenuItem sx={{ py: 1.5, px: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Xem thông tin cá nhân</Typography>
          <ChevronRight fontSize="small" sx={{ color: '#757575' }} />
        </MenuItem>
      </Menu>
    </Box>
  )
}