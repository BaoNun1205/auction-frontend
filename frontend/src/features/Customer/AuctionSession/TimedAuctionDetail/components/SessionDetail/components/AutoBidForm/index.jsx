import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  InputAdornment,
  TextField,
  MenuItem,
  styled,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(183, 32, 27, 0.3)'
  },
  fontSize: '16px',
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

const AutoBidForm = ({ item, onSubmit, auctionData, onCloseSession, flagEdit = false }) => {
  const [maxBid, setMaxBid] = useState('')
  const [bidIncrement, setBidIncrement] = useState('')
  const [status, setStatus] = useState('active')
  const [errorBidPrice, setErrorBidPrice] = useState('')
  const [errorBidIncrement, setErrorBidIncrement] = useState('')

  const minBidIncrement = auctionData?.bidIncrement
  const minPrice = (auctionData?.auctionSessionInfo?.highestBid || 0) + minBidIncrement

  useEffect(() => {
    if (flagEdit && item) {
      setMaxBid(item.maxBidPrice?.toString() || '')
      setBidIncrement(item.bidIncrement?.toString() || '')
      setStatus(item.status || 'ACTIVE')
    }
  }, [flagEdit, item])

  const handleSubmit = (e) => {
    e.preventDefault()
    const maxBidDecimal = Number(maxBid)
    const bidIncrementDecimal = Number(bidIncrement)

    onSubmit(maxBidDecimal, bidIncrementDecimal, flagEdit ? status : undefined)

    onCloseSession()
  }

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text').replace(/\./g, '')
    if (!/^\d*$/.test(pastedValue)) {
      e.preventDefault()
    }
  }

  const handleBidPriceChange = (e) => {
    let value = e.target.value.replace(/\./g, '') // Loại bỏ dấu chấm
    // Chỉ cho phép số
    if (!/^\d*$/.test(value)) {
      return // Không cập nhật nếu chứa ký tự không phải số
    }

    if (!value) {
      setErrorBidPrice('Vui lòng nhập số tiền tối đa')
      setMaxBid('')
      return
    }

    const numValue = Number(value)
    if (numValue < minPrice) {
      setErrorBidPrice(`Giá đặt phải lớn hơn hoặc bằng ${minPrice.toLocaleString('vi-VN')} VND`)
    } else if (numValue > MAX_VALUE) {
      setErrorBidPrice(`Giá đặt không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VND`)
    } else {
      setErrorBidPrice('')
    }
    setMaxBid(value)
  }

  const handleBidIncrementChange = (e) => {
    let value = e.target.value.replace(/\./g, '') // Loại bỏ dấu chấm
    // Chỉ cho phép số
    if (!/^\d*$/.test(value)) {
      return // Không cập nhật nếu chứa ký tự không phải số
    }

    if (!value) {
      setErrorBidIncrement('Vui lòng nhập bước nhảy')
      setBidIncrement('')
      return
    }

    const numValue = Number(value)
    if (numValue < minBidIncrement) {
      setErrorBidIncrement(`Bước nhảy tối thiểu phải là ${minBidIncrement.toLocaleString('vi-VN')} VND`)
    } else if (numValue > MAX_VALUE) {
      setErrorBidIncrement(`Bước nhảy không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VND`)
    } else {
      setErrorBidIncrement('')
    }
    setBidIncrement(value)
  }

  const formatNumber = (value) => {
    if (!value) return ''
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <>
      {/* Header với nút close */}
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#B7201B' }}>
          {flagEdit ? 'Chỉnh sửa giá tự động' : 'Đặt Giá Tự Động'}
        </Typography>
        <IconButton
          onClick={onCloseSession}
          size="small"
          sx={{
            color: '#B7201B',
            '&:hover': {
              backgroundColor: 'rgba(183, 32, 27, 0.1)'
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {flagEdit
              ? 'Chỉnh sửa thông tin đặt giá tự động của bạn.'
              : 'Nhập số tiền tối đa bạn muốn đặt và bước nhảy để hệ thống tự động đặt giá cho bạn.'}
          </Typography>

          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: '#fafafa' }}>
            <StyledTextField
              fullWidth
              label="Số tiền tối đa"
              type="text"
              value={formatNumber(maxBid)}
              onChange={handleBidPriceChange}
              onPaste={handlePaste}
              error={!!errorBidPrice}
              helperText={errorBidPrice}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
              }}
              sx={{ mb: 2 }}
            />
            <StyledTextField
              fullWidth
              label="Bước nhảy"
              type="text"
              value={formatNumber(bidIncrement)}
              onChange={handleBidIncrementChange}
              onPaste={handlePaste}
              error={!!errorBidIncrement}
              helperText={errorBidIncrement}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
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

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={onCloseSession}
              sx={{
                borderColor: '#ccc',
                color: '#666',
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Hủy
            </Button>

            <StyledButton
              type="submit"
              fullWidth
              size="large"
              disabled={!!errorBidPrice || !!errorBidIncrement || !maxBid || !bidIncrement}
              sx={{
                minWidth: '120px',
                height: '40px'
              }}
            >
              {flagEdit ? 'Lưu chỉnh sửa' : 'Gửi'}
            </StyledButton>
          </Box>
        </Box>
      </DialogContent>
    </>
  )
}

export default AutoBidForm