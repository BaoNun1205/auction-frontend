import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B7201B'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#B7201B'
  }
}))

const MAX_VALUE = 999999999 // Giới hạn tối đa: 999 triệu VND

const PlaceDepositForm = ({ item, onSubmit }) => {
  const [depositAmount, setDepositAmount] = useState('')
  const [error, setError] = useState('')
  const requiredDeposit = item.depositAmount || 0 // Xử lý depositAmount undefined/null

  useEffect(() => {
    setDepositAmount(requiredDeposit.toString())
  }, [requiredDeposit])

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text').replace(/\./g, '')
    if (!/^\d*$/.test(pastedValue)) {
      e.preventDefault()
    }
  }

  const handleDepositChange = (e) => {
    const value = e.target.value.replace(/\./g, '') // Loại bỏ dấu chấm
    // Chỉ cho phép số
    if (!/^\d*$/.test(value)) {
      return // Không cập nhật nếu chứa ký tự không phải số
    }

    if (!value) {
      setError('Vui lòng nhập số tiền cọc')
      setDepositAmount('')
      return
    }

    const numValue = Number(value)
    if (numValue !== requiredDeposit) {
      setError(`Số tiền cọc phải đúng ${requiredDeposit.toLocaleString('vi-VN')} VND`)
    } else if (numValue > MAX_VALUE) {
      setError(`Số tiền cọc không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VND`)
    } else {
      setError('')
    }
    setDepositAmount(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const numericDepositValue = Number(depositAmount)
    if (!depositAmount) {
      setError('Vui lòng nhập số tiền cọc')
      return
    }
    if (numericDepositValue !== requiredDeposit) {
      setError(`Số tiền cọc phải đúng ${requiredDeposit.toLocaleString('vi-VN')} VND`)
      return
    }
    if (numericDepositValue > MAX_VALUE) {
      setError(`Số tiền cọc không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VND`)
      return
    }
    onSubmit(numericDepositValue)
  }

  const formatNumber = (value) => {
    if (!value) return ''
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
      {/* <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Đặt cọc
      </Typography> */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        Hãy đặt cọc để tham gia và xem lịch sử đặt giá trong phiên đấu giá.
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'left' }}>
          Số tiền cọc yêu cầu: {requiredDeposit.toLocaleString('vi-VN')} VND
        </Typography>
        <StyledTextField
          fullWidth
          label="Số tiền cọc"
          type="text"
          value={formatNumber(depositAmount)}
          onChange={handleDepositChange}
          onPaste={handlePaste}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>
          }}
          sx={{ mb: 2 }}
        />
      </Paper>
      <StyledButton
        type="submit"
        fullWidth
        size="large"
        sx={{
          width: '100%',
          height: '50px'
        }}
        disabled={!!error || !depositAmount}
      >
        Gửi
      </StyledButton>
    </Box>
  )
}

export default PlaceDepositForm