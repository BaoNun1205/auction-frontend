import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import chatBotLogo from '~/assets/images/logo/chatBotLogo.png'

const WelcomeScreen = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', p: 3 }}>
    <Box sx={{ width: 150, height: 150, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Box component="div" sx={{ width: 140, height: 90, bgcolor: '#f0f0f0', borderRadius: 2, border: '6px solid #ccc', position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 80, height: 8, bgcolor: '#ccc', borderRadius: '0 0 5px 5px' } }}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Box sx={{ width: '70%', height: 8, bgcolor: '#b41712', borderRadius: 1, mb: 2 }} />
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', top: 15, right: 10, bgcolor: '#b41712', color: 'white', borderRadius: '50% 50% 50% 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-10deg)' }}>
        <Avatar src={chatBotLogo} sx={{ width: 42, height: 42 }} />
      </Box>
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
      Chào mừng đến với <span style={{ color: '#b41712' }}>BidAI</span>
    </Typography>
    <Typography variant="body2" color="text.secondary">Bắt đầu đặt câu hỏi!</Typography>
  </Box>
)

export default WelcomeScreen