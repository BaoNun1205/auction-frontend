import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import {
  CheckCircle
} from '@mui/icons-material'

export const PaymentConfirmDialog = ({ open, handleClose, handleConfirm, amount }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-confirm-dialog-title"
      aria-describedby="payment-confirm-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 500
        }
      }}
    >
      <DialogTitle id="payment-confirm-dialog-title" sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircle color="primary" sx={{ mr: 1 }} />
          Xác nhận thanh toán
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="payment-confirm-dialog-description" sx={{ mb: 2 }}>
          Bạn có chắc chắn muốn thanh toán số tiền{' '}
          <Typography component="span" fontWeight="bold" color="error.main">
            {amount.toLocaleString('vi-VN')} VNĐ
          </Typography>{' '}
          cho vật phẩm đấu giá này?
        </DialogContentText>
        <DialogContentText sx={{ color: 'text.primary' }}>
          Sau khi xác nhận, hệ thống sẽ ghi nhận thanh toán của bạn và tiến hành các bước tiếp theo để hoàn tất giao
          dịch.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Hủy
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary" autoFocus>
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  )
}