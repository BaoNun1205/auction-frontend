import React, { useState } from 'react'
import { Box, IconButton, Paper, Typography, Badge } from '@mui/material'
import { Chat as ChatIcon, OpenInNew, KeyboardArrowDown } from '@mui/icons-material'
import ChatInterface from './Chat' // Import giao diện chat

const ChatButton = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      {/* Nút mở chat */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: '#b41712',
          color: 'white',
          zIndex: 1000,
          '&:hover': {
            bgcolor: '#9c1410'
          }
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Cửa sổ chat */}
      {open && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            width: 600,
            height: 500,
            bgcolor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderBottom: '1px solid #f0f0f0',
              bgcolor: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#b41712',
                  fontSize: '1.25rem',
                  mr: 2
                }}
              >
                Chat
              </Typography>
              <Badge
                badgeContent="25"
                color="error"
                sx={{
                  ml: 0.5,
                  '& .MuiBadge-badge': {
                    bgcolor: '#b41712',
                    color: 'white',
                    fontWeight: 'normal',
                    fontSize: '0.75rem',
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    padding: '0 6px'
                  }
                }}
              />
            </Box>
            <Box>
              <IconButton size="small" sx={{ color: '#757575' }}>
                <OpenInNew fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleClose} sx={{ color: '#757575' }}>
                <KeyboardArrowDown fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Nội dung Chat */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <ChatInterface />
          </Box>
        </Paper>
      )}
    </Box>
  )
}

export default ChatButton