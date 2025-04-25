import React from 'react'
import { Box, Typography } from '@mui/material'
import { Chat as ChatIcon } from '@mui/icons-material'

const WelcomeScreen = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', p: 3 }}>
    <Box sx={{ width: 150, height: 150, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Box component="div" sx={{ width: 140, height: 90, bgcolor: '#f0f0f0', borderRadius: 2, border: '6px solid #ccc', position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 80, height: 8, bgcolor: '#ccc', borderRadius: '0 0 5px 5px' } }}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Box sx={{ width: '70%', height: 8, bgcolor: '#b41712', borderRadius: 1, mb: 2 }} />
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', top: 15, right: 10, bgcolor: '#b41712', color: 'white', borderRadius: '50% 50% 50% 0', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-10deg)' }}>
        <ChatIcon sx={{ fontSize: 24 }} />
      </Box>
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Chào mừng bạn đến với BidMaster Chat</Typography>
    <Typography variant="body2" color="text.secondary">Bắt đầu trả lời tin nhắn!</Typography>
  </Box>
)

export default WelcomeScreen