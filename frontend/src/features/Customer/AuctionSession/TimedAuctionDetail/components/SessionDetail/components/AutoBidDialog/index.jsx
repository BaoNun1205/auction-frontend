import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import AutoBidForm from '../AutoBidForm'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(3),
    minWidth: 400,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      minWidth: 500
    }
  }
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textAlign: 'center',
  color: theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(2)
}))

const StyledInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3)
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500
}))

const AutoBidDialog = ({ open, onClose, autoBid, auctionData, onEdit, showCloseButton = false }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [openForm, setOpenForm] = useState(false)

  const handleEdit = () => {
    setOpenForm(true)
  }

  const handleCloseForm = () => {
    setOpenForm(false)
    // Đóng cả dialog chính khi đóng form chỉnh sửa
    onClose()
  }

  const handleCloseDialog = () => {
    setOpenForm(false)
    onClose()
  }

  return (
    <>
      <StyledDialog open={open} onClose={handleCloseDialog} fullScreen={fullScreen}>
        {/* Tiêu đề với nút close */}
        <StyledDialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#B7201B' }}>
            Thông tin đấu giá tự động
          </Typography>
          {showCloseButton && (
            <IconButton
              onClick={handleCloseDialog}
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
          )}
        </StyledDialogTitle>

        {/* Nội dung */}
        <DialogContent>
          <StyledInfoBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                p: 3
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Giá tối đa:
                </Typography>
                <StyledTypography sx={{ color: '#B7201B' }}>
                  {autoBid.maxBidPrice.toLocaleString('vi-VN')} VNĐ
                </StyledTypography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Bước giá:
                </Typography>
                <StyledTypography sx={{ color: '#B7201B' }}>
                  {autoBid.bidIncrement.toLocaleString('vi-VN')} VNĐ
                </StyledTypography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Trạng thái:
                </Typography>
                <Box
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: autoBid.status === 'ACTIVE' ? '#e8f5e8' : '#ffebee',
                    color: autoBid.status === 'ACTIVE' ? '#4caf50' : '#f44336'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {autoBid.status === 'ACTIVE' ? 'Hoạt động' : 'Vô hiệu hóa'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </StyledInfoBox>
        </DialogContent>

        {/* Nút hành động */}
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCloseDialog}
            sx={{
              borderColor: '#ccc',
              color: '#666',
              '&:hover': {
                borderColor: '#999',
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            onClick={handleEdit}
            sx={{
              background: 'linear-gradient(135deg, #B7201B, #d32f2f)',
              '&:hover': {
                background: 'linear-gradient(135deg, #8f0e0a, #b71c1c)'
              }
            }}
          >
            Chỉnh sửa
          </Button>
        </DialogActions>
      </StyledDialog>

      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1
          }
        }}
      >
        <AutoBidForm item={autoBid} onSubmit={onEdit} auctionData={auctionData} onCloseSession={handleCloseForm} flagEdit={true} />
      </Dialog>
    </>
  )
}

export default AutoBidDialog
