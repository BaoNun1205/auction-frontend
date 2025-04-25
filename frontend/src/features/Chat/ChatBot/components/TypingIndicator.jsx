import React from 'react'
import { Stack, Avatar, Box, Typography } from '@mui/material'

const TypingIndicator = ({ targetUser }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
    <Avatar src={targetUser?.avatar} sx={{ width: 28, height: 28 }} />
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Box sx={{ width: 8, height: 8, bgcolor: '#b41712', borderRadius: '50%', animation: 'dot-flashing 1s infinite linear alternate', '@keyframes dot-flashing': { '0%': { opacity: 0.2 }, '100%': { opacity: 1 } } }} />
        <Box sx={{ width: 8, height: 8, bgcolor: '#b41712', borderRadius: '50%', animation: 'dot-flashing 1s infinite linear alternate', animationDelay: '0.2s' }} />
        <Box sx={{ width: 8, height: 8, bgcolor: '#b41712', borderRadius: '50%', animation: 'dot-flashing 1s infinite linear alternate', animationDelay: '0.4s' }} />
      </Box>
      <Typography variant="caption" color="text.secondary">Đang tải...</Typography>
    </Box>
  </Stack>
)

export default TypingIndicator