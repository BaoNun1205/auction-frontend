import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DeliveryConfirmationDialog = ({ open, selectedAsset, handleClose, handleConfirm }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      sx: {
        borderRadius: '12px',
        border: '1px solid rgba(180, 23, 18, 0.2)',
      },
    }}
  >
    <DialogTitle sx={{ color: '#b41712', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
      <LocalShippingIcon />
      Xác nhận giao hàng
    </DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ mb: 2 }}>
        Bạn có chắc chắn muốn xác nhận rằng vật phẩm{' '}
        <strong style={{ color: '#b41712' }}>"{selectedAsset?.assetName}"</strong> đang được giao hàng không?
      </DialogContentText>
      <Box
        sx={{
          p: 2,
          backgroundColor: 'rgba(180, 23, 18, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(180, 23, 18, 0.2)',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          <strong>Lưu ý:</strong> Sau khi xác nhận, trạng thái vật phẩm sẽ được chuyển thành "Đang giao hàng" và
          người mua sẽ được thông báo về việc giao hàng.
        </Typography>
      </Box>
    </DialogContent>
    <DialogActions sx={{ p: 3, gap: 1 }}>
      <Button
        onClick={handleClose}
        variant="outlined"
        sx={{
          borderColor: '#b41712',
          color: '#b41712',
          '&:hover': {
            borderColor: '#a01510',
            backgroundColor: 'rgba(180, 23, 18, 0.1)',
          },
        }}
      >
        Hủy
      </Button>
      <Button
        onClick={handleConfirm}
        variant="contained"
        startIcon={<CheckCircleIcon />}
        sx={{
          backgroundColor: '#b41712',
          '&:hover': {
            backgroundColor: '#a01510',
          },
        }}
      >
        Xác nhận giao hàng
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeliveryConfirmationDialog;