import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connectWebSocket, disconnectWebSocket, sendMessage } from '~/service/webSocketService'
import { useGetConversations, useGetMessages, useSendMessage } from '~/hooks/chatHook'
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Badge,
  Paper,
  Stack,
  Typography,
  MenuItem,
  Switch,
  Divider,
  Menu
} from '@mui/material'
import {
  Search,
  InsertEmoticon,
  AttachFile,
  Image,
  NoteAdd,
  Send,
  Chat as ChatIcon,
  KeyboardArrowDown,
  ChevronRight
} from '@mui/icons-material'
import { useAppStore } from '~/store/appStore'

export default function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [liveMessages, setLiveMessages] = useState([])
  const messagesEndRef = useRef(null)
  const shopHeaderRef = useRef(null)
  const user = useAppStore((state) => state.auth.user)
  const currentUserId = user.id
  const token = useAppStore((state) => state.auth.token)

  // Shop dropdown menu state
  const [shopMenuAnchorEl, setShopMenuAnchorEl] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // React Query hooks
  const { data: conversations = [] } = useGetConversations(currentUserId)
  const { data: messages = [] } = useGetMessages(selectedConversation)
  const sortedMessages = [...messages, ...liveMessages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  const sendMessageMutation = useSendMessage()

  // Get selected conversation data
  const selectedConversationData = conversations.find((c) => c.conversationId === selectedConversation)

  const onMessage = useCallback(
    (message) => {
      const response = JSON.parse(message.body)
      console.log('Received message:', response)
      if (response.code === 200 && response.result) {
        const messageData = response.result
        if (messageData.content && messageData.senderId && messageData.timestamp) {
          setLiveMessages((prev) => (messageData.senderId === currentUserId ? prev : [...prev, messageData]))
        }
      }
    },
    [currentUserId]
  )

  useEffect(() => {
    if (selectedConversation) {
      const destination = `/rt-chat/conversations/${selectedConversation}`
      connectWebSocket(token, destination, onMessage)
    }
    return () => {
      disconnectWebSocket()
    }
  }, [selectedConversation, token, onMessage])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [sortedMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const messageData = {
      content: newMessage,
      senderId: currentUserId,
      timestamp: new Date().toISOString()
    }

    sendMessage(`/app/rt-auction/conversations/${selectedConversation}`, messageData)
    setLiveMessages((prev) => [...prev, messageData])
    setNewMessage('')
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  // Shop menu handlers
  const handleShopMenuOpen = (event) => {
    setShopMenuAnchorEl(event.currentTarget)
  }

  const handleShopMenuClose = () => {
    setShopMenuAnchorEl(null)
  }

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const WelcomeScreen = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        p: 3
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 150,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* Laptop illustration */}
        <Box
          component="div"
          sx={{
            width: 140,
            height: 90,
            bgcolor: '#f0f0f0',
            borderRadius: 2,
            border: '6px solid #ccc',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 8,
              bgcolor: '#ccc',
              borderRadius: '0 0 5px 5px'
            }
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: '70%',
                height: 8,
                bgcolor: '#b41712',
                borderRadius: 1,
                mb: 2
              }}
            />
          </Box>
        </Box>

        {/* Chat bubble */}
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            right: 10,
            bgcolor: '#b41712',
            color: 'white',
            borderRadius: '50% 50% 50% 0',
            width: 45,
            height: 45,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-10deg)'
          }}
        >
          <ChatIcon sx={{ fontSize: 24 }} />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Chào đến với BidMaster Chat
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Bắt đầu trả lời tin nhắn!
      </Typography>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        bgcolor: '#f5f5f5',
        overflow: 'hidden',
        borderRadius: 1
      }}
    >
      {/* Conversation list sidebar - adjusted width */}
      <Box
        sx={{
          width: 220,
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            placeholder="Tìm theo tên"
            InputProps={{
              startAdornment: (
                <IconButton size="small">
                  <Search fontSize="small" />
                </IconButton>
              )
            }}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                fontSize: '0.875rem'
              }
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#bdbdbd',
              borderRadius: '2px'
            }
          }}
        >
          <List disablePadding>
            {conversations.map((chat) => (
              <ListItem
                key={chat.id}
                button
                onClick={() => {
                  setSelectedConversation(chat.conversationId)
                  setLiveMessages([])
                }}
                sx={{ '&:hover': { bgcolor: '#f5f5f5' }, py: 1, display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <Avatar src={chat.avatar} />
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <Typography variant="body2" fontWeight={500} noWrap>{chat.name}</Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>{chat.lastMessage}</Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">{formatTime(chat.time)}</Typography>
                <Badge badgeContent={chat.unread} color="error" />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Chat area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {!selectedConversation ? (
          <WelcomeScreen />
        ) : (
          <>
            {/* Shop header */}
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
                ref={shopHeaderRef}
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  gap: 0.5
                }}
                onClick={handleShopMenuOpen}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {selectedConversationData?.name}
                </Typography>
                <KeyboardArrowDown fontSize="small" sx={{ color: '#757575' }} />
              </Box>

              <Menu
                anchorEl={shopMenuAnchorEl}
                open={Boolean(shopMenuAnchorEl)}
                onClose={handleShopMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                sx={{
                  '& .MuiPaper-root': {
                    width: 280,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    borderRadius: 1,
                    mt: 0.5
                  }
                }}
                MenuListProps={{
                  sx: { padding: 0 }
                }}
                disablePortal
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={selectedConversationData?.avatar} sx={{ width: 40, height: 40 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {selectedConversationData?.name}
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
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#b41712'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#b41712'
                      }
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

            {/* Messages area */}
            <Box
              sx={{
                flex: 1,
                p: 1.5,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                '&::-webkit-scrollbar': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#bdbdbd',
                  borderRadius: '3px'
                }
              }}
            >
              {sortedMessages.map((msg, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  justifyContent={msg.senderId === currentUserId ? 'flex-end' : 'flex-start'}
                  sx={{ mb: 0.75 }}
                >
                  {msg.senderId !== currentUserId && <Avatar sx={{ width: 28, height: 28 }} />}
                  <Box
                    sx={{
                      bgcolor: msg.senderId === currentUserId ? '#d7f7ef' : '#fff',
                      color: 'black',
                      p: 1.25,
                      borderRadius: 1.5,
                      maxWidth: '70%',
                      position: 'relative',
                      pr: 5.5 // Extra padding for timestamp
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: 'break-word',
                        fontSize: '0.875rem'
                      }}
                    >
                      {msg.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 6,
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '0.7rem',
                        fontWeight: 400
                      }}
                    >
                      {formatTime(msg.timestamp)}
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input area */}
            <Paper sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small">
                  <InsertEmoticon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <Image fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <AttachFile fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <NoteAdd fontSize="small" />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Nhập nội dung tin nhắn"
                  size="small"
                  multiline
                  maxRows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.875rem'
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleSendMessage}
                  disabled={!selectedConversation || !newMessage.trim()}
                  sx={{ color: '#b41712' }}
                >
                  <Send fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  )
}

