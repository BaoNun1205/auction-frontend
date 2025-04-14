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
import { useCountUnreadNotifications, useMarkNotificationAsRead } from '~/hooks/notificationHook'

const Notification = ({ userId, authToken, initialNotifications = [] }) => {
  const [notifications, setNotifications] = useState(initialNotifications) // Khởi tạo với danh sách từ API
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)

  // Hàm xử lý thông báo mới từ WebSocket
  const handleNewNotification = (frame) => {
    try {
      const binaryBody = frame.binaryBody || frame._binaryBody
      const jsonString = new TextDecoder().decode(binaryBody)
      const notification = JSON.parse(jsonString)

      console.log('Parsed notification:', notification)

      setNotifications((prev) => {
        const existingIndex = prev.findIndex((n) => n.id === notification.id)
        if (existingIndex !== -1) {
          // Nếu đã tồn tại, thay thế bằng thông báo mới
          const updated = [...prev]
          updated[existingIndex] = notification
          return updated
        }
        // Nếu chưa có thì thêm mới vào đầu danh sách
        return [notification, ...prev]
      })
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
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
      `/rt-notification/new-register/owner/${userId}` // Thông báo đăng ký mới (nếu user là owner)
      // Nếu cần subscribe topic session, thêm `/rt-notification/new-bid/session/{sessionId}`
    ]
    console.log('Subscribing to destinations:', destinations)

    const cleanup = connectWebSocket(authToken, destinations, handleNewNotification)

    // Cleanup khi component unmount
    return () => {
      console.log('Cleaning up WebSocket connection')
      cleanup()
      // disconnectWebSocket()
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

  const { mutate: markAsRead } = useMarkNotificationAsRead()

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId, {
      onSuccess: () => {
        setNotificationsAnchorEl(null)
      },
      onError: (err) => {
        console.error('Failed to mark as read:', err)
      }
    })
  }

  return (
    <>
      <IconButtonWithBadge
        color="inherit"
        aria-label="notifications"
        onClick={handleIconClick}
      >
        <Badge
          badgeContent={notifications.filter((n) => !n.read).length}
          color="error"
        >
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
                onClick={() => handleNotificationClick(notification.id)}
                sx={{
                  py: 2,
                  px: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: notification.read ? 'inherit' : 'rgba(180, 23, 18, 0.1)',
                  '&:hover': {
                    backgroundColor: notification.read
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'rgba(180, 23, 18, 0.2)' // hover với màu chủ đạo đậm hơn
                  }
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: notification.read ? 'medium' : 'bold',
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