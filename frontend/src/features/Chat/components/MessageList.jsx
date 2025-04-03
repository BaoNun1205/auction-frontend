import React, { useEffect, useRef } from 'react'
import { Box, CircularProgress } from '@mui/material'
import MessageItem from './MessageItem'
import TypingIndicator from './TypingIndicator'

const MessageList = ({ messages, currentUserId, targetUser, isLoading, isTyping }) => {
  const messagesEndRef = useRef(null)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <Box sx={{ flex: 1, p: 1.5, overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '3px' } }}>
      {messages.map((msg, index) => (
        <MessageItem 
          key={index}
          message={msg}
          currentUserId={currentUserId}
          targetUserAvatar={targetUser?.avatar}
        />
      ))}
      {isTyping && <TypingIndicator targetUser={targetUser} />}
      <div ref={messagesEndRef} />
    </Box>
  )
}

export default MessageList