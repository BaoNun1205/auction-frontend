import React from 'react'
import { Box, Typography, Menu, MenuItem, Switch, Divider, Avatar } from '@mui/material'
import { KeyboardArrowDown, ChevronRight } from '@mui/icons-material'
import { formatRelativeTime } from '~/utils/customTime'

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

  const renderActivityStatus = () => {
    if (!targetUser?.lastSeen) return null

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.75rem' }}>
          {formatRelativeTime(targetUser?.lastSeen) === '0 phút trước' ? (
            <>
              Đang Online
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#4caf50',
                  ml: 0.5,
                  display: 'inline-block'
                }}
              />
            </>
          ) : (
            `Online ${formatRelativeTime(targetUser?.lastSeen)}`
          )}
        </Typography>
      </Box>
    )
  }

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
      <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', gap: 0.5 }} onClick={handleShopMenuOpen}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
            {targetUser?.name || targetUser?.username || 'Đang tải...'}
          </Typography>
          {renderActivityStatus()}
        </Box>
        <KeyboardArrowDown fontSize="small" sx={{ color: '#757575', ml: 0.5 }} />
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
          <Box sx={{ position: 'relative' }}>
            <Avatar src={targetUser?.avatar} sx={{ width: 40, height: 40 }} />
            {/* Online indicator dot in menu */}
            {formatRelativeTime(targetUser?.lastSeen) === '0 phút trước' && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#4caf50',
                  border: '2px solid white'
                }}
              />
            )}
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
              {targetUser?.name || targetUser?.username || 'Đang tải...'}
            </Typography>
            {renderActivityStatus()}
          </Box>
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
