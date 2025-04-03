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
  useMediaQuery
} from '@mui/material'
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
  color: theme.palette.primary.main
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

const AutoBidDialog = ({ open, onClose, autoBid, onEdit }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [openForm, setOpenForm] = useState(false)

  const handleEdit = () => {
    setOpenForm(true)
  }

  const handleCloseForm = () => {
    setOpenForm(false)
  }

  return (
    <>
      <StyledDialog open={open} onClose={onClose} fullScreen={fullScreen}>
        {/* Tiêu đề */}
        <StyledDialogTitle>Thông tin đấu giá tự động</StyledDialogTitle>

        {/* Nội dung */}
        <DialogContent>
          <StyledInfoBox>
            <StyledTypography>
              Giá tối đa: <strong>{autoBid.maxBidPrice.toLocaleString('vi-VN')} VND</strong>
            </StyledTypography>
            <StyledTypography>
              Bước giá: <strong>{autoBid.bidIncrement.toLocaleString('vi-VN')} VND</strong>
            </StyledTypography>
          </StyledInfoBox>
        </DialogContent>

        {/* Nút hành động */}
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        </DialogActions>
      </StyledDialog>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <AutoBidForm item={autoBid} onSubmit={onEdit} onCloseSession={handleCloseForm} flagEdit={true} />
      </Dialog>
    </>
  )
}

export default AutoBidDialog
