import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Popover,
  MenuItem,
  IconButton,
  Badge
} from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'
import { IconButtonWithBadge } from './style'
import { connectWebSocket, disconnectWebSocket } from '~/service/webSocketService'

const Notification = ({ userId, authToken, initialNotifications = [] }) => {
  const [notifications, setNotifications] = useState(initialNotifications) // Khởi tạo với danh sách từ API
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)

  // Hàm xử lý thông báo mới từ WebSocket
  const handleNewNotification = (message) => {
    console.log('Received WebSocket message:', message) // Log toàn bộ message nhận được
    if (message.code === 200) {
      const newNotification = message.result // Lấy NotificationResponse từ ApiResponse
      console.log('New notification:', newNotification) // Log thông báo mới
      setNotifications((prev) => {
        // Kiểm tra xem thông báo đã tồn tại chưa để tránh trùng lặp
        if (!prev.some((n) => n.id === newNotification.id)) {
          console.log('Adding new notification to list:', newNotification)
          return [newNotification, ...prev]
        }
        console.log('Notification already exists:', newNotification.id)
        return prev
      })
    } else {
      console.error('Error from server:', message.message)
    }
  }

  // Cập nhật notifications khi initialNotifications thay đổi (từ API)
  useEffect(() => {
    console.log('Initial notifications updated:', initialNotifications)
    setNotifications(initialNotifications)
  }, [initialNotifications])

  // Kết nối WebSocket khi component mount
  useEffect(() => {
    if (!userId || !authToken) {
      console.log('Missing userId or authToken, WebSocket not connected')
      return
    }

    console.log('Connecting WebSocket with userId:', userId, 'and authToken:', authToken)
    const destinations = [
      `/rt-notification/new-message/user/${userId}`, // Thông báo tin nhắn
      `/rt-notification/new-register/owner/${userId}`, // Thông báo đăng ký mới (nếu user là owner)
      // Nếu cần subscribe topic session, thêm `/rt-notification/new-bid/session/{sessionId}`
    ]
    console.log('Subscribing to destinations:', destinations)

    const cleanup = connectWebSocket(authToken, destinations, handleNewNotification)

    // Cleanup khi component unmount
    return () => {
      console.log('Cleaning up WebSocket connection')
      cleanup()
      disconnectWebSocket()
    }
  }, [userId, authToken])

  const formatRelativeTime = (createdAt) => {
    const createdDate = new Date(createdAt)
    const now = new Date()
    const diffInMs = now - createdDate

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30))
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365))

    if (diffInYears >= 1) {
      return `${diffInYears} năm trước`
    } else if (diffInMonths >= 1) {
      return `${diffInMonths} tháng trước`
    } else if (diffInDays >= 1) {
      return `${diffInDays} ngày trước`
    } else if (diffInHours >= 1) {
      return `${diffInHours} giờ trước`
    } else {
      return `${diffInMinutes} phút trước`
    }
  }

  const handleIconClick = (event) => {
    console.log('Notification icon clicked, current notifications:', notifications)
    setNotificationsAnchorEl(notificationsAnchorEl ? null : event.currentTarget)
  }

  return (
    <>
      <IconButtonWithBadge
        color="inherit"
        aria-label="notifications"
        onClick={handleIconClick}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButtonWithBadge>
      <Popover
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={() => setNotificationsAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            maxWidth: '100%',
            maxHeight: '80vh',
            borderRadius: 2,
            mt: 0.5,
            overflow: 'visible',
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: '95%',
              width: 10,
              height: 10,
              bgcolor: 'error.main',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
      >
        <Box
          sx={{
            p: 2,
            pr: 1,
            bgcolor: 'error.main',
            color: 'white',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Thông Báo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsIcon sx={{ ml: 'auto' }} />
          </Box>
        </Box>
        <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
          {notifications.length === 0 ? (
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <NotificationsIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body1" color="text.secondary">
                Không có thông báo nào
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => setNotificationsAnchorEl(null)}
                sx={{
                  py: 2,
                  px: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: notification.isRead ? 'inherit' : 'rgba(231, 229, 229, 0.75)',
                  '&:hover': {
                    backgroundColor: notification.isRead
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'rgba(189, 189, 189, 0.5)'
                  }
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 0.5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {notification.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {notification.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatRelativeTime(notification.createdAt)}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </Box>
      </Popover>
    </>
  )
}

export default Notification