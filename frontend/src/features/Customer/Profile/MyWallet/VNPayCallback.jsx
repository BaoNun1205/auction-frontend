import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Paper, Typography, CircularProgress, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

const VNPayCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const status = params.get('status')
    const amount = params.get('amount')

    if (status === 'success') {
      setStatus('success')
      setMessage('Giao dịch nạp tiền thành công!')
      setAmount(parseFloat(amount))
    } else {
      setStatus('error')
      setMessage('Giao dịch thất bại. Vui lòng thử lại sau!')
    }
  }, [location])

  const handleBackToWallet = () => {
    navigate('/profile')
  }

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
        {status === 'success' ? (
          <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
        ) : (
          <ErrorIcon sx={{ fontSize: 60, color: '#f44336', mb: 2 }} />
        )}
        <Typography variant="h5" gutterBottom>
          {message}
        </Typography>
        {status === 'success' && (
          <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
            Số tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToWallet}
          sx={{ mt: 2 }}
        >
          Quay lại ví
        </Button>
      </Paper>
    </Box>
  )
}

export default VNPayCallback