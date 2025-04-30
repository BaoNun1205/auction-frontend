import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box } from '@mui/material'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import {
  useChatWithToolCall,
  useCreateConversation,
  useGetConversations,
  useGetMessagesByConversationId
} from '~/hooks/chatBotHook'
import ChatSidebar from './components/ChatSidebar'
import { useAppStore } from '~/store/appStore'
import WelcomeScreen from './components/WelcomeScreen'

export default function Chat() {
  const { auth } = useAppStore()
  const user = auth.user
  const currentUserId = user.id

  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const { data: conversations = [], isLoading: isLoadingConversations, refetch: refetchConversations } = useGetConversations(currentUserId)

  const { mutate: createConversation, isPending: isCreating } = useCreateConversation()
  const { mutate: chatWithToolCall, isPending } = useChatWithToolCall()

  const selectedConv = useMemo(
    () => conversations.find((conv) => conv.id === selectedConversation),
    [selectedConversation, conversations]
  )

  const { data: fetchedMessages = [], isLoading: isLoadingMessages } = useGetMessagesByConversationId(selectedConversation)

  useEffect(() => {
    setMessages(fetchedMessages)
  }, [fetchedMessages])

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const userMessage = {
      content: newMessage,
      createdAt: new Date().toISOString(),
      role: 'user',
      conversationId: selectedConversation
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage('')

    chatWithToolCall(
      { conversationId: selectedConversation, content: newMessage },
      {
        onSuccess: (data) => {
          const res = data?.data
          if (!res) return

          console.log('msg.content:', res.content)


          const botMessage = {
            content: res,
            createdAt: Date.now(),
            role: 'assistant',
            conversationId: res.conversationId
          }

          setMessages((prev) => [...prev, botMessage])

          refetchConversations()
        },
        onError: (err) => {
          console.error('Error sending message:', err)
        }
      }
    )
  }

  const handleNewChat = () => {
    createConversation(
      { userId: currentUserId },
      {
        onSuccess: (data) => {
          const newConversation = {
            ...data,
            messages: []
          }

          conversations.unshift(newConversation)

          setSelectedConversation(data.id)
          setMessages([])
        },
        onError: (error) => {
          console.error('Lỗi tạo cuộc trò chuyện mới:', error)
        }
      })
  }

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: '#f5f5f5', overflow: 'hidden', borderRadius: 1 }}>
      <ChatSidebar
        conversations={conversations}
        isLoadingConversations={isLoadingConversations}
        currentUserId={currentUserId}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        handleNewChat={handleNewChat}
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {!selectedConversation ? (
          <WelcomeScreen />
        ) : (
          <>
            <ChatMessages
              sortedMessages={messages}
              isLoadingMessages={false}
              isTyping={isPending}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              selectedConversation={selectedConversation}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              isSending={isPending}
            />
          </>
        )}
      </Box>
    </Box>
  )
}
