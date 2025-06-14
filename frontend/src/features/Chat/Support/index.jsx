import React from 'react'
import { useEffect, useState, useCallback, useRef } from 'react'
import { connectWebSocket, sendMessage } from '~/service/webSocketService'
import { useGetConversations, useGetMessages, useUpdateUnread } from '~/hooks/chatHook'
import { Box, useTheme, useMediaQuery, IconButton, AppBar, Toolbar, Typography } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import WelcomeScreen from './components/WelcomeScreen'
import ChatSidebar from './components/ChatSidebar'
import { Menu as MenuIcon, ArrowBack } from '@mui/icons-material'

export default function Support() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [liveMessages, setLiveMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [shopMenuAnchorEl, setShopMenuAnchorEl] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [localConversations, setLocalConversations] = useState([])

  // Add these lines after the existing state declarations
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const messagesEndRef = useRef(null)

  const { auth, conversationCount, setConversationCount, unreadConversationCount, setUnreadConversationCount } =
    useAppStore()

  const user = auth.user
  const currentUserId = user.id
  const token = auth.token
  const { data: conversations = [], isLoading: isLoadingConversations } = useGetConversations(currentUserId)

  useEffect(() => {
    if (conversationCount !== conversations.length) {
      setConversationCount(conversations.length)
    }
  }, [conversations, conversationCount, setConversationCount])

  const { data: messages = [], isLoading: isLoadingMessages } = useGetMessages(selectedConversation)

  // Khởi tạo hook useUpdateUnread
  const { mutate: updateUnreadCount } = useUpdateUnread()

  const sortedMessages = [...messages, ...liveMessages]
    .filter(
      (msg, index, self) => index === self.findIndex((m) => m.timestamp === msg.timestamp && m.content === msg.content)
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  useEffect(() => setLocalConversations(conversations), [conversations])

  // Cập nhật danh sách cuộc trò chuyện với tin nhắn mới
  useEffect(() => {
    const unreadCount = localConversations.filter((conv) => conv.unread > 0).length
    if (unreadConversationCount !== unreadCount) {
      setUnreadConversationCount(unreadCount)
    }
  }, [localConversations, unreadConversationCount, setUnreadConversationCount])

  const selectedConversationData = localConversations.find((c) => c.conversationId === selectedConversation)

  const targetUser = selectedConversationData
    ? selectedConversationData.seller.userId === currentUserId
      ? selectedConversationData.buyer
      : selectedConversationData.seller
    : null

  const onMessage = useCallback(
    (message) => {
      const response = JSON.parse(message.body)
      if (response.code === 200 && response.result) {
        const messageData = response.result
        const isMine = messageData.sender.userId === currentUserId
        const isCurrentConversation = messageData.conversationId === selectedConversation

        if (messageData.content && messageData.sender && messageData.timestamp && messageData.conversationId) {
          const isDuplicate =
            liveMessages.some((m) => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
            messages.some((m) => m.timestamp === messageData.timestamp && m.content === messageData.content)

          if (isCurrentConversation && !isMine && !isDuplicate) {
            setLiveMessages((prev) => [...prev, messageData])
          }

          // xử lý unread nếu khác conversation hiện tại
          if (!isMine && !isCurrentConversation) {
            const conversation = localConversations.find((conv) => conv.conversationId === messageData.conversationId)
            if (conversation) {
              updateUnreadCount({
                conversationId: messageData.conversationId,
                unreadCount: (conversation.unread || 0) + 1
              })
            }
          }

          // setLocalConversations((prevConversations) => {
          //   const existingConv = prevConversations.find((conv) => conv.conversationId === messageData.conversationId)
          //   if (existingConv) {
          //     return prevConversations.map((conv) =>
          //       conv.conversationId === messageData.conversationId
          //         ? {
          //           ...conv,
          //           lastMessage: messageData.content,
          //           time: messageData.timestamp,
          //           unread:
          //               !isMine && conv.conversationId !== selectedConversation ? (conv.unread || 0) + 1 : conv.unread
          //         }
          //         : conv
          //     )
          //   }
          //   return prevConversations
          // })

          setLocalConversations((prevConversations) => {
            const idx = prevConversations.findIndex(conv => conv.conversationId === messageData.conversationId)
            if (idx !== -1) {
              const updatedConv = {
                ...prevConversations[idx],
                lastMessage: messageData.content,
                time: messageData.timestamp,
                updatedAt: messageData.timestamp,
                unread: !isMine && prevConversations[idx].conversationId !== selectedConversation
                  ? (prevConversations[idx].unread || 0) + 1 : prevConversations[idx].unread
              }
              return [updatedConv, ...prevConversations.filter((_, i) => i !== idx)]
            }
            return prevConversations
          })

          if (!isMine && isCurrentConversation) {
            setIsTyping(false)
          }
        }
      } else if (response.type === 'TYPING' && response.conversationId === selectedConversation) {
        if (response.userId !== currentUserId) {
          setIsTyping(true)
          setTimeout(() => setIsTyping(false), 5000)
        }
      }
    },
    [currentUserId, selectedConversation, messages, liveMessages]
  )

  useEffect(() => {
    if (!isLoadingConversations && conversations.length > 0 && token) {
      const destinations = conversations.map((conv) => `/rt-chat/conversations/${conv.conversationId}`)
      let cleanupFunc = null
      let isMounted = true

      connectWebSocket(token, destinations, onMessage)
        .then((cleanup) => {
          if (isMounted) {
            cleanupFunc = cleanup
          }
        })
        .catch((err) => {
          console.error('WebSocket connection failed:', err)
        })

      return () => {
        isMounted = false
        if (typeof cleanupFunc === 'function') {
          console.log('Cleaning up chat WebSocket subscriptions')
          cleanupFunc()
        }
      }
    }
  }, [conversations, isLoadingConversations, token, onMessage])

  useEffect(() => {
    if (selectedConversation) {
      setLiveMessages([])
      // Đặt unread về 0 khi chọn conversation
      const selectedConv = localConversations.find((conv) => conv.conversationId === selectedConversation)
      if (selectedConv && selectedConv.unread > 0) {
        updateUnreadCount({
          conversationId: selectedConversation,
          unreadCount: 0
        })
      }
      setLocalConversations((prev) =>
        prev.map((conv) => (conv.conversationId === selectedConversation ? { ...conv, unread: 0 } : conv))
      )
    }
  }, [selectedConversation])

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [sortedMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return
    const messageData = {
      content: newMessage,
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      conversationId: selectedConversation
    }
    sendMessage(`/app/rt-auction/conversations/${selectedConversation}`, messageData)
    setLiveMessages((prev) => {
      const isDuplicate =
        prev.some((m) => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
        messages.some((m) => m.timestamp === messageData.timestamp && m.content === messageData.content)
      if (isDuplicate) return prev
      return [...prev, messageData]
    })
    setLocalConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.conversationId === selectedConversation
          ? { ...conv, lastMessage: messageData.content, time: messageData.timestamp, unread: 0 }
          : conv
      )
    )
    setNewMessage('')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleBackToConversations = () => {
    setSelectedConversation(null)
  }

  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       height: 'calc(100vh - 64px)',
  //       bgcolor: '#f5f5f5',
  //       overflow: 'hidden',
  //       borderRadius: 1
  //     }}
  //   >
  //     {/* Sidebar luôn hiển thị cố định */}
  //     <Box
  //       sx={{
  //         width: '400px', // Giữ width 400px như đã thiết kế
  //         flexShrink: 0,
  //         borderRight: '1px solid #e0e0e0',
  //         bgcolor: 'white'
  //       }}
  //     >
  //       <ChatSidebar
  //         conversations={localConversations}
  //         isLoadingConversations={isLoadingConversations}
  //         currentUserId={currentUserId}
  //         selectedConversation={selectedConversation}
  //         setSelectedConversation={setSelectedConversation}
  //       />
  //     </Box>

  //     {/* Main chat area */}
  //     <Box
  //       sx={{
  //         flex: 1,
  //         display: 'flex',
  //         flexDirection: 'column',
  //         height: '100%',
  //         overflow: 'hidden'
  //       }}
  //     >
  //       {!selectedConversation ? (
  //         <WelcomeScreen />
  //       ) : (
  //         <>
  //           <ChatHeader
  //             targetUser={targetUser}
  //             shopMenuAnchorEl={shopMenuAnchorEl}
  //             setShopMenuAnchorEl={setShopMenuAnchorEl}
  //             notificationsEnabled={notificationsEnabled}
  //             setNotificationsEnabled={setNotificationsEnabled}
  //           />
  //           <ChatMessages
  //             sortedMessages={sortedMessages}
  //             isLoadingMessages={isLoadingMessages}
  //             currentUserId={currentUserId}
  //             targetUser={targetUser}
  //             user={user}
  //             isTyping={isTyping}
  //             messagesEndRef={messagesEndRef}
  //           />
  //           <ChatInput
  //             newMessage={newMessage}
  //             setNewMessage={setNewMessage}
  //             handleSendMessage={handleSendMessage}
  //             selectedConversation={selectedConversation}
  //           />
  //         </>
  //       )}
  //     </Box>
  //   </Box>
  // )

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        bgcolor: '#f5f5f5',
        overflow: 'hidden',
        borderRadius: isMobile ? 0 : 1,
        position: 'relative'
      }}
    >
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            top: 0,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'white',
            color: 'black',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Toolbar sx={{ minHeight: '56px !important', px: 1 }}>
            {selectedConversation ? (
              <>
                <IconButton edge="start" onClick={handleBackToConversations} sx={{ mr: 1 }}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                  {targetUser?.name || targetUser?.username || 'Chat'}
                </Typography>
              </>
            ) : (
              <>
                <IconButton edge="start" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                  Hỗ trợ khách hàng
                </Typography>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: isTablet ? 320 : 400,
            flexShrink: 0,
            borderRight: '1px solid #e0e0e0',
            bgcolor: 'white'
          }}
        >
          <ChatSidebar
            conversations={localConversations}
            isLoadingConversations={isLoadingConversations}
            currentUserId={currentUserId}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <ChatSidebar
          conversations={localConversations}
          isLoadingConversations={isLoadingConversations}
          currentUserId={currentUserId}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          isMobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      )}

      {/* Main chat area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          mt: isMobile ? '56px' : 0 // Account for mobile app bar
        }}
      >
        {!selectedConversation ? (
          !isMobile && <WelcomeScreen />
        ) : (
          <>
            {!isMobile && (
              <ChatHeader
                targetUser={targetUser}
                shopMenuAnchorEl={shopMenuAnchorEl}
                setShopMenuAnchorEl={setShopMenuAnchorEl}
                notificationsEnabled={notificationsEnabled}
                setNotificationsEnabled={setNotificationsEnabled}
              />
            )}
            <ChatMessages
              sortedMessages={sortedMessages}
              isLoadingMessages={isLoadingMessages}
              currentUserId={currentUserId}
              targetUser={targetUser}
              user={user}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              selectedConversation={selectedConversation}
            />
          </>
        )}
      </Box>
    </Box>
  )
}
