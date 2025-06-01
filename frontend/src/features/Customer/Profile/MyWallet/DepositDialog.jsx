import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box
} from '@mui/material'
import { useVNPayPayment } from '../../../../hooks/paymentHook'
import { useAppStore } from '~/store/appStore'

const MIN_VALUE = 10000 // Tối thiểu: 10.000 VND
const MAX_VALUE = 999999999 // Tối đa: 999 triệu VND

const DepositDialog = ({ open, onClose }) => {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const { auth } = useAppStore()

  const { mutate, isLoading } = useVNPayPayment()

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text').replace(/\./g, '')
    if (!/^\d*$/.test(pastedValue)) {
      e.preventDefault()
    }
  }

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\./g, '') // Loại bỏ dấu chấm
    // Chỉ cho phép số
    if (!/^\d*$/.test(value)) {
      return // Không cập nhật nếu chứa ký tự không phải số
    }

    if (!value) {
      setError('Vui lòng nhập số tiền nạp')
      setAmount('')
      return
    }

    const numValue = Number(value)
    if (numValue < MIN_VALUE) {
      setError(`Số tiền nạp tối thiểu là ${MIN_VALUE.toLocaleString('vi-VN')} VND`)
    } else if (numValue > MAX_VALUE) {
      setError(`Số tiền nạp không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VND`)
    } else {
      setError('')
    }
    setAmount(value)
  }

  const handleSubmit = () => {
    const numericAmount = Number(amount)
    if (!amount) {
      setError('Vui lòng nhập số tiền nạp')
      return
    }
    if (numericAmount < MIN_VALUE) {
      setError(`Số tiền nạp tối thiểu là ${MIN_VALUE.toLocaleString('vi-VN')} VND`)
      return
    }
    if (numericAmount > MAX_VALUE) {
      setError(`Số tiền nạp không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VND`)
      return
    }

    mutate(
      { amount: numericAmount, bankCode: 'NCB', userId: auth.user.id },
      {
        onSuccess: (response) => {
          window.location.href = response.data.paymentUrl
        },
        onError: (error) => {
          console.error('Payment failed:', error)
        }
      }
    )
  }

  const formatNumber = (value) => {
    if (!value) return ''
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ color: '#b41712' }}>
          Nạp tiền vào ví
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Số tiền (VND)"
            type="text"
            fullWidth
            value={formatNumber(amount)}
            onChange={handleAmountChange}
            onPaste={handlePaste}
            error={!!error}
            helperText={error}
            InputProps={{
              endAdornment: <Typography variant="body2">VNĐ</Typography>
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Số tiền nạp tối thiểu: 10.000 VNĐ
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!!error || !amount || isLoading}
          sx={{ backgroundColor: '#b41712', '&:hover': { backgroundColor: '#8b120e' } }}
        >
          Thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DepositDialog