import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  InputAdornment,
  TextField,
  MenuItem,
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

const AutoBidForm = ({ item, onSubmit, onCloseSession, flagEdit = false }) => {
  const [maxBid, setMaxBid] = useState('')
  const [bidIncrement, setBidIncrement] = useState('')
  const [status, setStatus] = useState('active')
  const [errorBidPrice, setErrorBidPrice] = useState('')
  const [errorBidIncrement, setErrorBidIncrement] = useState('')

  const minBidIncrement = item.bidIncrement
  const currentPrice = item?.auctionSessionInfo?.highestBid || 0

  useEffect(() => {
    if (flagEdit && item) {
      setMaxBid(item.maxBidPrice?.toString() || '')
      setBidIncrement(item.bidIncrement?.toString() || '')
      setStatus(item.status || 'ACTIVE')
    }
  }, [flagEdit, item])

  const handleSubmit = (e) => {
    e.preventDefault()
    const maxBidDecimal = Number(maxBid.replace(/\./g, ''))
    const bidIncrementDecimal = Number(bidIncrement.replace(/\./g, ''))

    onSubmit(
      maxBidDecimal,
      bidIncrementDecimal,
      flagEdit ? status : undefined
    )

    onCloseSession()
  }

  const handleBidPriceChange = (e) => {
    const value = e.target.value.replace(/\./g, '')
    const price = currentPrice + minBidIncrement
    if (Number(value) < price) {
      setErrorBidPrice(`Giá đặt phải lớn hơn hoặc bằng ${(price).toLocaleString('vi-VN')} VND`)
    } else {
      setErrorBidPrice('')
    }
    setMaxBid(value)
  }

  const handleBidIncrementChange = (e) => {
    const value = e.target.value.replace(/\./g, '')
    if (Number(value) < minBidIncrement) {
      setErrorBidIncrement(`Bước nhảy tối thiểu phải là ${minBidIncrement.toLocaleString('vi-VN')} VND`)
    } else {
      setErrorBidIncrement('')
    }
    setBidIncrement(value)
  }

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        {flagEdit ? 'Chỉnh sửa giá tự động' : 'Đặt Giá Tự Động'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {flagEdit
          ? 'Chỉnh sửa thông tin đặt giá tự động của bạn.'
          : 'Nhập số tiền tối đa bạn muốn đặt và bước nhảy để hệ thống tự động đặt giá cho bạn.'}
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <StyledTextField
          fullWidth
          label="Số tiền tối đa"
          type="text"
          value={formatNumber(maxBid)}
          onChange={handleBidPriceChange}
          error={!!errorBidPrice}
          helperText={errorBidPrice}
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>
          }}
          sx={{ mb: 2 }}
        />
        <StyledTextField
          fullWidth
          label="Bước nhảy"
          type="text"
          value={formatNumber(bidIncrement)}
          onChange={handleBidIncrementChange}
          error={!!errorBidIncrement}
          helperText={errorBidIncrement}
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>
          }}
          sx={{ mb: 2 }}
        />

        {flagEdit && (
          <StyledTextField
            select
            fullWidth
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="ACTIVE">Hoạt động</MenuItem>
            <MenuItem value="INACTIVE">Vô hiệu hóa</MenuItem>
          </StyledTextField>
        )}
      </Paper>

      <StyledButton
        type="submit"
        fullWidth
        size="large"
        disabled={!!errorBidPrice || !!errorBidIncrement}
        sx={{
          width: '100%',
          height: '50px'
        }}
      >
        {flagEdit ? 'Lưu chỉnh sửa' : 'Gửi'}
      </StyledButton>
    </Box>
  )
}

export default AutoBidForm
