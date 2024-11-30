import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar
} from '@mui/material'
import { styled } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { motion, AnimatePresence } from 'framer-motion'

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 400,
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[5]
}))

const StyledImage = styled(motion.img)({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4]
  }
}))

const RequirementDetails = ({ open, onClose, requirement, onApprove, onReject }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const images = requirement?.imageRequirements || []

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleApprove = () => {
    onApprove(requirement)
    onClose()
  }

  const handleReject = () => {
    onReject(requirement)
    onClose()
  }

  if (!requirement) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
    >
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Chi Tiết Yêu Cầu
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <AnimatePresence mode="wait">
                <StyledImage
                  key={currentImageIndex}
                  src={images[currentImageIndex]?.image}
                  alt={`Ảnh tài sản ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              <NavigationButton
                onClick={handlePrevImage}
                sx={{ left: 8 }}
                aria-label="Ảnh trước"
              >
                <ArrowBackIosNewIcon />
              </NavigationButton>
              <NavigationButton
                onClick={handleNextImage}
                sx={{ right: 8 }}
                aria-label="Ảnh tiếp theo"
              >
                <ArrowForwardIosIcon />
              </NavigationButton>
            </ImageContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {images.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === currentImageIndex ? 'primary.main' : 'grey.300',
                    mx: 0.5,
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              {requirement.assetName}
            </Typography>
            <Typography variant="h5" color="secondary.main" gutterBottom sx={{ fontWeight: 'bold' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(requirement.assetPrice)}
            </Typography>
            <Chip
              label={`Trạng thái: ${
                requirement.status === '0' ? 'Đang chờ duyệt' :
                  requirement.status === '1' ? 'Đã duyệt' : 'Đã từ chối'
              }`}
              color={
                requirement.status === '0' ? 'warning' :
                  requirement.status === '1' ? 'success' : 'error'
              }
              sx={{ mt: 1, mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>{requirement?.vendor?.username.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {requirement?.vendor?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Người gửi
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Ngày tạo
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {new Date(requirement.createdAt).toLocaleString('vi-VN')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Mô tả
            </Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: requirement.assetDescription }}
              sx={{
                mt: 1,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                maxHeight: 200,
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider'
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
              <ActionButton
                variant="contained"
                color="success"
                onClick={handleApprove}
                disabled={requirement.status !== '0'}
                sx={{ mr: 2 }}
              >
                Chấp Nhận
              </ActionButton>
              <ActionButton
                variant="contained"
                color="error"
                onClick={handleReject}
                disabled={requirement.status !== '0'}
              >
                Từ Chối
              </ActionButton>
            </Box>
          </Grid>
        </Grid>

      <DialogContent>
        {requirement ? (
          <Box>
            <CardContent sx={{ backgroundColor: "transparent" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ImageContainer component={motion.div} layout>
                    <AnimatePresence mode="wait">
                      <StyledImage
                        key={currentImageIndex}
                        src={`${images[currentImageIndex]?.image}`}
                        alt={`Ảnh tài sản ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>

                    <NavigationButton
                      onClick={handlePrevImage}
                      style={{ left: 10 }}
                      aria-label="Ảnh trước"
                    >
                      <BiLeftArrow />
                    </NavigationButton>

                    <NavigationButton
                      onClick={handleNextImage}
                      style={{ right: 10 }}
                      aria-label="Ảnh tiếp theo"
                    >
                      <BiRightArrow />
                    </NavigationButton>
                  </ImageContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box p={2}>
                    <Typography variant="h4" gutterBottom>
                      {requirement.assetName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Giá bán
                    </Typography>
                    <Typography variant="h5" color="#b41712">
                      {requirement.assetPrice}
                    </Typography>

                    <Paper elevation={0} sx={{ p: 2, my: 2, bgcolor: "#f5f5f5" }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Ngày tạo: {new Date(requirement.createdAt).toLocaleString()}
                      </Typography>

                      <Typography variant="subtitle1">
                        Người bán: {requirement.vendor?.username}
                      </Typography>
                    </Paper>

                    <Box
                      dangerouslySetInnerHTML={{ __html: requirement.assetDescription }}
                      sx={{ my: 3 }}
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <ActionButton
                        variant="contained"
                        color="success" // Màu xanh
                        onClick={handleApprove}
                      >
                        Chấp Nhận
                      </ActionButton>
                      <ActionButton
                        variant="outlined"
                        color="error" // Màu đỏ
                        onClick={handleReject}
                      >
                        Từ Chối
                      </ActionButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        ) : (
          <Typography variant="body1" color="error">
            Không có chi tiết nào.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RequirementDetails