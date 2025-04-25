import React, { useState } from 'react'
import { Box } from '@mui/material'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import { useChatWithToolCall } from '~/hooks/chatBotHook'

export default function Chat() {
  const mockConversation = {
    conversationId: 'sample-12345',
    seller: { userId: 'u001', name: 'ChatBot' },
    buyer: { userId: 'u999', name: 'Bạn' }
  }

  const currentUserId = 'u999'

  const [messages, setMessages] = useState([
    {
      content: 'Chào bạn, bạn cần gì ạ?',
      timestamp: new Date().toISOString(),
      sender: mockConversation.seller,
      conversationId: mockConversation.conversationId
    },
    {
      content: 'Mình muốn hỏi về sản phẩm A',
      timestamp: new Date().toISOString(),
      sender: mockConversation.buyer,
      conversationId: mockConversation.conversationId
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const { mutate: chatWithToolCall, isPending } = useChatWithToolCall()

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: mockConversation.buyer,
      conversationId: mockConversation.conversationId
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    chatWithToolCall({ messages: newMessage }, {
      onSuccess: (data) => {
        console.log('Chatbot response:', data)

        const botMessage = {
          content: data?.data || 'Không có phản hồi.',
          timestamp: new Date().toISOString(),
          sender: mockConversation.seller,
          conversationId: mockConversation.conversationId
        }

        setMessages(prev => [...prev, botMessage])
      },
      onError: (err) => {
        console.error('Error sending message:', err)
      }
    })
  }

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: '#f5f5f5', overflow: 'hidden', borderRadius: 1 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <ChatHeader targetUser={mockConversation.seller} />
        <ChatMessages
          sortedMessages={messages}
          isLoadingMessages={false}
          currentUserId={currentUserId}
          targetUser={mockConversation.seller}
          user={mockConversation.buyer}
          isTyping={isPending}
          messagesEndRef={{ current: null }}
        />
        <ChatInput
          selectedConversation={mockConversation.conversationId}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          isSending={isPending}
        />
      </Box>
    </Box>
  )
}
