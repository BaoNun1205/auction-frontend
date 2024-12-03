import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  styled
} from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '12px',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(183, 32, 27, 0.3)'
  },
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none'
}))

const PlaceDepositForm = ({ item, onSubmit }) => {
  const depositAmount = item.depositAmount

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Đặt cọc
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Đây là số tiền cọc mà người bán đặt ra.
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, textAlign: 'left' }}>
          Số tiền cọc: {depositAmount.toLocaleString('vi-VN')} VND
        </Typography>
      </Paper>
      <StyledButton
        type="submit"
        fullWidth
        size="large"
        sx={{
          width: '100%',
          height: '50px'
        }}
      >
        Gửi
      </StyledButton>
    </Box>
  )
}

export default PlaceDepositForm