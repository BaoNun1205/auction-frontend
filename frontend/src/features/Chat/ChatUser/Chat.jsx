import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connectWebSocket, sendMessage } from '~/service/webSocketService'
import { useGetConversations, useGetMessages, useUpdateUnread } from '~/hooks/chatHook'
import { Box } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import ChatSidebar from '../components/ChatSidebar'
import WelcomeScreen from '../components/WelcomeScreen'
import ChatHeader from '../components/ChatHeader'
import ChatMessages from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'

export default function Chat({ vendorId }) {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [liveMessages, setLiveMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [shopMenuAnchorEl, setShopMenuAnchorEl] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [localConversations, setLocalConversations] = useState([])
  const messagesEndRef = useRef(null)
  const {
    auth,
    conversationCount,
    setConversationCount,
    unreadConversationCount,
    setUnreadConversationCount,
    isChatOpen,
    isSidebarVisible
  } = useAppStore()

  const isChatOpenRef = useRef(isChatOpen)

  useEffect(() => {
    isChatOpenRef.current = isChatOpen
  }, [isChatOpen])

  const user = auth.user
  const currentUserId = user.id
  const token = auth.token
  const { data: conversations = [], isLoading: isLoadingConversations } = useGetConversations(currentUserId)

  // Auto select conversation nếu truyền vào vendorId
  useEffect(() => {
    if (!vendorId || !conversations.length) return

    const matchedConversation = conversations.find((conv) => {
      return (
        (conv.buyer.userId === vendorId || conv.seller.userId === vendorId) &&
      (conv.buyer.userId === currentUserId || conv.seller.userId === currentUserId)
      )
    })

    if (matchedConversation) {
      setSelectedConversation(matchedConversation.conversationId)
    }
  }, [vendorId, conversations, currentUserId])

  useEffect(() => {
    if (conversationCount !== conversations.length) {
      setConversationCount(conversations.length)
    }
  }, [conversations, conversationCount, setConversationCount])

  const { data: messages = [], isLoading: isLoadingMessages } = useGetMessages(selectedConversation)

  // Khởi tạo hook useUpdateUnread
  const { mutate: updateUnreadCount } = useUpdateUnread()

  const sortedMessages = [...messages, ...liveMessages]
    .filter((msg, index, self) => index === self.findIndex(m => m.timestamp === msg.timestamp && m.content === msg.content))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  useEffect(() => setLocalConversations(conversations), [conversations])

  // Cập nhật danh sách cuộc trò chuyện với tin nhắn mới
  useEffect(() => {
    const unreadCount = localConversations.filter(conv => conv.unread > 0).length
    if (unreadConversationCount !== unreadCount) {
      setUnreadConversationCount(unreadCount)
    }
  }, [localConversations, unreadConversationCount, setUnreadConversationCount])

  const selectedConversationData = localConversations.find((c) => c.conversationId === selectedConversation)

  const targetUser = selectedConversationData
    ? (selectedConversationData.seller.userId === currentUserId ? selectedConversationData.buyer : selectedConversationData.seller)
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
              liveMessages.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
              messages.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content)

          if (isCurrentConversation && !isMine && !isDuplicate) {
            setLiveMessages(prev => [...prev, messageData])
          }

          // xử lý unread nếu khác conversation hiện tại
          if (!isMine && !isCurrentConversation) {
            const conversation = localConversations.find(conv => conv.conversationId === messageData.conversationId)
            if (conversation) {
              updateUnreadCount({
                conversationId: messageData.conversationId,
                unreadCount: (conversation.unread || 0) + 1
              })
            }
          }

          // gửi notification nếu chat chưa mở và không phải tin nhắn của mình
          // if (!isChatOpenRef.current && !isMine) {
          //   const payload = {
          //     senderId: messageData.sender.userId,
          //     receiverId: currentUserId,
          //     type: 'MESSAGE',
          //     title: 'Tin nhắn mới',
          //     content: `${messageData.sender.name || messageData.sender.username}: ${messageData.content}`,
          //     referenceId: messageData.conversationId
          //   }

          //   console.log('Sending notification payload:', payload)

          //   sendMessage(`/app/rt-auction/notification/new-message/user/${currentUserId}`, payload)
          // }

          setLocalConversations((prevConversations) => {
            const existingConv = prevConversations.find(conv => conv.conversationId === messageData.conversationId)
            if (existingConv) {
              return prevConversations.map((conv) =>
                conv.conversationId === messageData.conversationId
                  ? {
                    ...conv,
                    lastMessage: messageData.content,
                    time: messageData.timestamp,
                    unread: !isMine && conv.conversationId !== selectedConversation
                      ? (conv.unread || 0) + 1 : conv.unread
                  }
                  : conv
              )
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
      const destinations = conversations.map(conv => `/rt-chat/conversations/${conv.conversationId}`)
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
      const selectedConv = localConversations.find(conv => conv.conversationId === selectedConversation)
      if (selectedConv && selectedConv.unread > 0) {
        updateUnreadCount({
          conversationId: selectedConversation,
          unreadCount: 0
        })
      }
      setLocalConversations((prev) =>
        prev.map((conv) => conv.conversationId === selectedConversation ? { ...conv, unread: 0 } : conv)
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
      const isDuplicate = prev.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
        messages.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content)
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

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: '#f5f5f5', overflow: 'hidden', borderRadius: 1 }}>
      {isSidebarVisible && (
        <ChatSidebar
          conversations={localConversations}
          isLoadingConversations={isLoadingConversations}
          currentUserId={currentUserId}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      )}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {!selectedConversation ? (
          <WelcomeScreen />
        ) : (
          <>
            <ChatHeader
              targetUser={targetUser}
              shopMenuAnchorEl={shopMenuAnchorEl}
              setShopMenuAnchorEl={setShopMenuAnchorEl}
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
            />
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