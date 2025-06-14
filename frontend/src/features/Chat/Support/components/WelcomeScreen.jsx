import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { SupportAgent, Chat, People, Notifications } from '@mui/icons-material'

const WelcomeScreen = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
      p: 4,
      bgcolor: '#fafafa'
    }}
  >
    {/* Main Icon */}
    <Box
      sx={{
        width: 120,
        height: 120,
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#e3f2fd',
        borderRadius: '50%',
        boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2)'
      }}
    >
      <SupportAgent sx={{ fontSize: 64, color: '#1976d2' }} />
    </Box>

    {/* Welcome Text */}
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
      Trung tâm hỗ trợ khách hàng
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
      Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu hỗ trợ khách hàng
    </Typography>
  </Box>
)

export default WelcomeScreen
