import { useEffect, useState, useCallback } from 'react'
import { connectWebSocket, sendMessage } from '~/service/webSocketService'
import { useGetConversations, useGetMessages } from '~/hooks/chatHook'
import { useAppStore } from '~/store/appStore'

export default function useChatLogic() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [liveMessages, setLiveMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [localConversations, setLocalConversations] = useState([])

  const user = useAppStore((state) => state.auth.user)
  const currentUserId = user.id
  const token = useAppStore((state) => state.auth.token)

  const { data: conversations = [], isLoading: isLoadingConversations } = useGetConversations(currentUserId)
  const { data: messages = [], isLoading: isLoadingMessages } = useGetMessages(selectedConversation)

  const sortedMessages = [...messages, ...liveMessages]
    .filter((msg, index, self) => 
      index === self.findIndex(m => m.timestamp === msg.timestamp && m.content === msg.content)
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  useEffect(() => {
    setLocalConversations(conversations)
  }, [conversations])

  const onMessage = useCallback(
    (message) => {
      const response = JSON.parse(message.body)
      console.log('Received message:', response)
      if (response.code === 200 && response.result) {
        const messageData = response.result
        if (messageData.content && messageData.sender && messageData.timestamp && messageData.conversationId) {
          // Chỉ thêm tin nhắn vào liveMessages nếu đang ở conversation đó
          if (messageData.conversationId === selectedConversation) {
            setLiveMessages((prev) => {
              const isDuplicate = prev.some(
                m => m.timestamp === messageData.timestamp && m.content === messageData.content
              ) || messages.some(
                m => m.timestamp === messageData.timestamp && m.content === messageData.content
              )
              if (isDuplicate || messageData.sender.userId === currentUserId) {
                return prev
              }
              return [...prev, messageData]
            })
          }

          // Cập nhật lastMessage và time trong conversations
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
                      ? (conv.unread || 0) + 1
                      : conv.unread
                  }
                  : conv
              )
            }
            return prevConversations // Nếu conversation chưa tồn tại, giữ nguyên danh sách
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
      return () => cleanup && cleanup()
    }
  }, [conversations, isLoadingConversations, token, onMessage])

  useEffect(() => {
    if (selectedConversation) {
      setLiveMessages([])
      setLocalConversations((prev) =>
        prev.map((conv) =>
          conv.conversationId === selectedConversation ? { ...conv, unread: 0 } : conv
        )
      )
    }
  }, [selectedConversation])

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
      const isDuplicate = prev.some(
        m => m.timestamp === messageData.timestamp && m.content === messageData.content
      ) || messages.some(
        m => m.timestamp === messageData.timestamp && m.content === messageData.content
      )
      if (isDuplicate) return prev
      return [...prev, messageData]
    })

    setLocalConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.conversationId === selectedConversation
          ? {
            ...conv,
            lastMessage: messageData.content,
            time: messageData.timestamp,
            unread: 0
          }
          : conv
      )
    )

    setNewMessage('')
  }

  return {
    selectedConversation,
    setSelectedConversation,
    newMessage,
    setNewMessage,
    sortedMessages,
    isTyping,
    localConversations,
    currentUserId,
    token,
    isLoadingConversations,
    isLoadingMessages,
    handleSendMessage
  }
}