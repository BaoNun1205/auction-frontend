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

const DepositDialog = ({ open, onClose }) => {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const { auth } = useAppStore()

  const { mutate, isLoading, isError, data } = useVNPayPayment()

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setAmount(value)
      setError('')
    }
  }

  const handleSubmit = () => {
    if (!amount || parseInt(amount) < 10000) {
      setError('Số tiền nạp tối thiểu là 10,000 VND')
      return
    }

    mutate({ amount, bankCode: 'NCB', userId: auth.user.id }, {
      onSuccess: (response) => {
        window.location.href = response.data.paymentUrl
      },
      onError: (error) => {
        console.error('Payment failed:', error)
      }
    })
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
            value={amount}
            onChange={handleAmountChange}
            error={!!error}
            helperText={error}
            InputProps={{
              endAdornment: <Typography variant="body2">VND</Typography>
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Số tiền nạp tối thiểu: 10,000 VND
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: '#b41712', '&:hover': { backgroundColor: '#8b120e' } }}
        >
          Thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DepositDialog