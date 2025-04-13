import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connectWebSocket, sendMessage } from '~/service/webSocketService'
import { useGetConversations, useGetMessages, useUpdateUnread } from '~/hooks/chatHook'
import { Box } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import ChatSidebar from './components/ChatSidebar'
import WelcomeScreen from './components/WelcomeScreen'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'

function formatCustomDate(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffTime = now - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  const weekday = weekdays[date.getDay()]
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const currentYear = now.getFullYear()
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()

  if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  if (isYesterday) return 'Hôm qua'
  if (diffDays > 0 && diffDays <= 3) return weekday
  if (diffDays > 3 && year === currentYear) return `${day}/${month}`
  return `${day}/${month}/${year}`
}

export default function Chat({ vendorId }) {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [liveMessages, setLiveMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [shopMenuAnchorEl, setShopMenuAnchorEl] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [localConversations, setLocalConversations] = useState([])
  const messagesEndRef = useRef(null)
  const { auth, conversationCount, setConversationCount } = useAppStore()

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

  const selectedConversationData = localConversations.find((c) => c.conversationId === selectedConversation)
  const targetUser = selectedConversationData 
    ? (selectedConversationData.seller.userId === currentUserId ? selectedConversationData.buyer : selectedConversationData.seller)
    : null

  const onMessage = useCallback(
    (message) => {
      const response = JSON.parse(message.body)
      if (response.code === 200 && response.result) {
        const messageData = response.result
        if (messageData.content && messageData.sender && messageData.timestamp && messageData.conversationId) {
          if (messageData.conversationId === selectedConversation) {
            setLiveMessages((prev) => {
              const isDuplicate = prev.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content) ||
                messages.some(m => m.timestamp === messageData.timestamp && m.content === messageData.content)
              if (isDuplicate || messageData.sender.userId === currentUserId) return prev
              return [...prev, messageData]
            })
          } else if (messageData.sender.userId !== currentUserId) {
            // Cập nhật unread nếu không phải conversation hiện tại và không phải tin nhắn do user gửi
            const conversation = localConversations.find(conv => conv.conversationId === messageData.conversationId)
            if (conversation) {
              updateUnreadCount({
                conversationId: messageData.conversationId,
                unreadCount: (conversation.unread || 0) + 1
              })
            }
          }

          setLocalConversations((prevConversations) => {
            const existingConv = prevConversations.find(conv => conv.conversationId === messageData.conversationId)
            if (existingConv) {
              return prevConversations.map((conv) =>
                conv.conversationId === messageData.conversationId
                  ? {
                    ...conv,
                    lastMessage: messageData.content,
                    time: messageData.timestamp,
                    unread: messageData.sender.userId !== currentUserId && conv.conversationId !== selectedConversation
                      ? (conv.unread || 0) + 1 : conv.unread
                  }
                  : conv
              )
            }
            return prevConversations
          })
          if (messageData.sender.userId !== currentUserId && messageData.conversationId === selectedConversation) {
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
    [currentUserId, selectedConversation, messages]
  )

  useEffect(() => {
    if (!isLoadingConversations && conversations.length > 0 && token) {
      const destinations = conversations.map(conv => `/rt-chat/conversations/${conv.conversationId}`)
      const cleanup = connectWebSocket(token, destinations, onMessage)
      return () => typeof cleanup === 'function' && cleanup()
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
      <ChatSidebar
        conversations={localConversations}
        isLoadingConversations={isLoadingConversations}
        currentUserId={currentUserId}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        formatCustomDate={formatCustomDate}
      />
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