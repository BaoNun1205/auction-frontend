import React from 'react'
import { Box, IconButton, Paper, Typography, Avatar } from '@mui/material'
import { ChevronLeft, ChevronRight, KeyboardArrowDown } from '@mui/icons-material'
import ChatInterface from './Chat'
import { useAppStore } from '~/store/appStore'
import chatBotLogo from '~/assets/images/logo/chatBotLogo.png'

const ChatButton = () => {
  const { isChatBotOpen, setChatBotOpen, isChatOpen, chatVendorId, isBotSidebarVisible, toggleBotSidebar } = useAppStore()

  const handleClickOpen = () => {
    setChatBotOpen(true)
  }

  const handleClose = () => {
    setChatBotOpen(false)
  }

  const handleToggleSidebar = () => {
    toggleBotSidebar()
  }

  return (
    <Box>
      {/* Nút mở chat */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: isChatOpen && !isChatBotOpen ? '60%' : 16,
          right: 16,
          bgcolor: '#b41712',
          color: 'white',
          zIndex: 1000,
          borderRadius: '50%',
          '&:hover': {
            bgcolor: '#9c1410',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
          },
          padding: 0
        }}
      >
        <Avatar src={chatBotLogo} sx={{ width: 48, height: 48, borderRadius: '50%' }} />
      </IconButton>


      {/* Cửa sổ chat luôn mount, ẩn bằng CSS khi đóng */}
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
          display: isChatBotOpen ? 'flex' : 'none',
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
            <Avatar src={chatBotLogo} sx={{ width: 34, height: 34, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#b41712',
                fontSize: '1.25rem'
              }}
            >
              BidAI
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={handleToggleSidebar}>
              {isBotSidebarVisible ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
            <IconButton size="small" onClick={handleClose} sx={{ color: '#757575' }}>
              <KeyboardArrowDown fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Nội dung Chat */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <ChatInterface vendorId={chatVendorId} />
        </Box>
      </Paper>
    </Box>
  )
}

export default ChatButton
