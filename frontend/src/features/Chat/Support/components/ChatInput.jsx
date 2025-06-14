import React from 'react'
import { Box, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material'
import { Send, EmojiEmotions, Image } from '@mui/icons-material'

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage, selectedConversation }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Box
      sx={{
        p: isMobile ? 1 : isTablet ? 1.25 : 1.5,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'white',
        display: 'flex',
        alignItems: 'flex-end',
        gap: isMobile ? 0.5 : 1
      }}
    >
      {!isMobile && (
        <>
          <IconButton size={isTablet ? 'small' : 'medium'} sx={{ color: '#666', mb: 0.5 }}>
            <Image />
          </IconButton>
          <IconButton size={isTablet ? 'small' : 'medium'} sx={{ color: '#666', mb: 0.5 }}>
            <EmojiEmotions />
          </IconButton>
        </>
      )}

      <TextField
        fullWidth
        multiline
        maxRows={isMobile ? 3 : 4}
        placeholder="Nhập tin nhắn..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="outlined"
        size='small'
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: isMobile ? 1.5 : 2,
            fontSize: isMobile ? '0.9rem' : '1rem',
            '& fieldset': {
              borderColor: '#e0e0e0'
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196f3'
            }
          },
          '& .MuiInputBase-input': {
            py: isMobile ? 1 : 1.25
          }
        }}
      />

      <IconButton
        onClick={handleSendMessage}
        disabled={!newMessage.trim() || !selectedConversation}
        size={isMobile ? 'small' : 'medium'}
        sx={{
          bgcolor: '#2196f3',
          color: 'white',
          mb: 0.5,
          '&:hover': {
            bgcolor: '#1976d2'
          },
          '&:disabled': {
            bgcolor: '#e0e0e0',
            color: '#999'
          },
          width: isMobile ? 36 : 40,
          height: isMobile ? 36 : 40
        }}
      >
        <Send sx={{ fontSize: isMobile ? 18 : 20 }} />
      </IconButton>
    </Box>
  )
}

export default ChatInput
