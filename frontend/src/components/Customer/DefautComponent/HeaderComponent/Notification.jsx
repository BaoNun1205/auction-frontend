import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Popover,
  MenuItem,
  Badge
} from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'
import { IconButtonWithBadge } from './style'
import { connectWebSocket } from '~/service/webSocketService'
import { useMarkNotificationAsRead } from '~/hooks/notificationHook'
import { useAppStore } from '~/store/appStore'
import { useGetUserById, useUpdateUnreadNotificationCount } from '~/hooks/userHook'
import { formatRelativeTime } from '~/utils/customTime'
import { useGetJoinedSessions } from '~/hooks/depositHook'
import { useNavigate } from 'react-router-dom'

const Notification = ({ initialNotifications = [] }) => {
  const [notifications, setNotifications] = useState(initialNotifications) // Khởi tạo với danh sách từ API
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null)
  const [localUnreadCount, setLocalUnreadCount] = useState(0)
  const { mutate: updateUnreadNotificationCount } = useUpdateUnreadNotificationCount()
  const { mutate: markAsRead } = useMarkNotificationAsRead()
  const { auth } = useAppStore()
  const navigate = useNavigate()
  const token = auth.token
  const userId = auth.user.id

  const { data: user, refetch: refetchUser } = useGetUserById(userId)
  const unreadNotificationCount = user?.unreadNotificationCount || 0

  const { data: joinedSessions } = useGetJoinedSessions(userId)

  useEffect(() => {
    setLocalUnreadCount(unreadNotificationCount)
  }, [unreadNotificationCount])

  console.log('userId noti: ', userId)

  // Hàm xử lý thông báo mới từ WebSocket
  const handleNewNotification = (frame) => {
    try {
      console.log('Received WebSocket message:', frame)
      const binaryBody = frame.binaryBody || frame._binaryBody
      const jsonString = new TextDecoder().decode(binaryBody)
      const notification = JSON.parse(jsonString)

      console.log('Parsed notification:', notification)

      if (notification?.sender?.userId == userId) {
        return
      }

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

      console.log('unreadNotificationCount:', unreadNotificationCount)
      if (!notificationsAnchorEl) {
        setLocalUnreadCount((prev) => {
          const newCount = prev + 1
          updateUnreadNotificationCount(
            { userId, count: newCount }
          )
          return newCount
        })
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }

  // Cập nhật notifications khi initialNotifications thay đổi (từ API)
  useEffect(() => {
    console.log('Initial notifications updated:', initialNotifications)
    setNotifications(initialNotifications)
  }, [initialNotifications])

  useEffect(() => {
    if (!userId || !token) {
      console.log('Missing userId or token, WebSocket not connected')
      return
    }

    // const destinations = [
    //   `/rt-notification/user/${userId}`,
    //   '/rt-notification/new-bid/session/c01757ff-ba4f-4beb-9852-ecad623a1767'
    // ]

    const destinations = [`/rt-notification/user/${userId}`]

    if (Array.isArray(joinedSessions)) {
      joinedSessions.forEach((session) => {
        destinations.push(`/rt-notification/new-bid/session/${session.id}`)
      })
    }


    let cleanup = null

    console.log('Connecting WebSocket with userId:', userId, 'and token:', token)
    connectWebSocket(token, destinations, handleNewNotification)
      .then((_cleanup) => {
        cleanup = _cleanup
      })
      .catch((err) => {
        console.error('WebSocket connection failed:', err)
      })

    return () => {
      console.log('Cleaning up WebSocket connection')
      if (cleanup) cleanup()
    }
  }, [token, userId])

  const handleIconClick = (event) => {
    setNotificationsAnchorEl(notificationsAnchorEl ? null : event.currentTarget)
    console.log('Icon clicked, notificationsAnchorEl:', notificationsAnchorEl)
  }

  useEffect(() => {
    if (notificationsAnchorEl) {
      updateUnreadNotificationCount(
        { userId, count: 0 },
        {
          onSuccess: () => {
            setLocalUnreadCount(0)
          }
        }
      )
    }
  }, [notificationsAnchorEl])

  const handleNotificationClick = (notification) => {
    if (notification.type === 'NEW_BID') {
      navigate(`/session/${notification.referenceId}`)
    } else if (notification.type === 'NEW_REGISTRATION') {
      navigate(`/session/register/${notification.referenceId}`)
    } else if (notification.type === 'RECHARGE' || notification.type === 'REFUND' || notification.type == 'DEPOSIT') {
      navigate('/profile', { state: { tabSet: 6 } })
    }

    markAsRead(notification.id, {
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
        <Badge badgeContent={localUnreadCount} color="error">
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
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  py: 2,
                  px: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)' // chỉ dùng hover nhẹ
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
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
                {!notification.read && (
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: 'error.main',
                      borderRadius: '50%',
                      ml: 2
                    }}
                  />
                )}
              </MenuItem>
            ))
          )}
        </Box>
      </Popover>
    </>
  )
}

export default Notification