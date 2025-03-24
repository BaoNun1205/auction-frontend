import React from 'react'
import { Box, Stack, Avatar, Typography, CircularProgress } from '@mui/material'
import TypingIndicator from './TypingIndicator'

export default function ChatMessages({
  sortedMessages,
  isLoadingMessages,
  currentUserId,
  targetUser,
  user,
  formatCustomDate,
  isTyping,
  messagesEndRef
}) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 1.5,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '3px' }
      }}
    >
      {isLoadingMessages ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <>
          {sortedMessages.map((msg, index) => {
            const senderId = msg.sender?.userId || msg.senderId
            const senderAvatar = senderId === currentUserId ? user.avatar : targetUser?.avatar
            return (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                justifyContent={senderId === currentUserId ? 'flex-end' : 'flex-start'}
                sx={{ mb: 0.75 }}
              >
                {senderId !== currentUserId && <Avatar src={senderAvatar} sx={{ width: 28, height: 28 }} />}
                <Box
                  sx={{
                    bgcolor: senderId === currentUserId ? '#d7f7ef' : '#fff',
                    color: 'black',
                    p: 1.25,
                    borderRadius: 1.5,
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  <Typography variant="body2" sx={{ wordBreak: 'break-word', fontSize: '0.875rem', width: '100%' }}>
                    {msg.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem', fontWeight: 400, alignSelf: 'flex-end' }}
                  >
                    {formatCustomDate(msg.timestamp)}
                  </Typography>
                </Box>
              </Stack>
            )
          })}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  )
}