import React, { useState } from 'react'
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Grid,
  useMediaQuery,
  Divider,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Modal,
  Fade,
  Backdrop,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import {
  AccessTime,
  EmojiEvents,
  Person,
  ArrowBackIos,
  ArrowForwardIos,
  ArrowBack,
  CheckCircle,
  Close,
  CalendarToday,
  Gavel,
  Warning,
  EventAvailable
} from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook'
import { theme, InfoChip } from './style'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSessionById } from '~/hooks/sessionHook'

const ImageCarousel = ({ images, openImageModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, md: 450 },
        mb: 2,
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 2
      }}
      onClick={() => openImageModal(currentIndex)}
    >
      <CardMedia
        component="img"
        height="100%"
        image={images[currentIndex].imageAsset || '/placeholder.svg?height=450&width=450'}
        alt={`Image ${currentIndex + 1}`}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2
        }}
        onClick={handlePrev}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2
        }}
        onClick={handleNext}
      >
        <ArrowForwardIos />
      </IconButton>
      <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <Typography
          variant="caption"
          sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', px: 2, py: 0.8, borderRadius: 4 }}
        >
          {currentIndex + 1} / {images.length}
        </Typography>
      </Box>
    </Box>
  )
}

const ImageModal = ({ open, handleClose, images, currentIndex, setCurrentIndex }) => {
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none'
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <Close />
          </IconButton>

          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={images[currentIndex].imageAsset || '/placeholder.svg?height=800&width=800'}
              alt={`Full size image ${currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
              }}
            />

            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 16,
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <Typography
                variant="caption"
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', px: 2, py: 0.8, borderRadius: 4 }}
              >
                {currentIndex + 1} / {images.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

const BidHistoryItem = ({ bid, isWinner }) => {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 2,
        bgcolor: isWinner ? 'rgba(25, 118, 210, 0.05)' : '#f5f5f5',
        border: isWinner ? '1px solid rgba(25, 118, 210, 0.2)' : 'none',
        overflow: 'visible'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: isWinner ? 'primary.main' : 'grey.400',
                boxShadow: isWinner ? '0 2px 8px rgba(25, 118, 210, 0.3)' : 'none',
                mr: 2
              }}
            >
              {bid.user.name?.charAt(0) || bid.user.username[0]}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {bid.user.name || bid.user.username}
                </Typography>
                {isWinner && (
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.3,
                      borderRadius: 5
                    }}
                  >
                    Thắng cuộc
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <CalendarToday fontSize="small" sx={{ color: 'text.secondary', fontSize: 14, mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(bid.bidTime).toLocaleString('vi-VN')}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Gavel sx={{ color: isWinner ? 'primary.main' : 'text.secondary', mr: 1 }} />
              <Typography
                variant="h6"
                color={isWinner ? 'primary.main' : 'text.primary'}
                fontWeight={isWinner ? 'bold' : 'medium'}
              >
                {bid.bidPrice.toLocaleString('vi-VN')} VNĐ
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

// Payment confirmation dialog component
const PaymentConfirmDialog = ({ open, handleClose, handleConfirm, amount }) => {
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

const Checkout = () => {
  const { id } = useParams()
  const { data: auctionData, refetch, isLoading, isError } = useGetSessionById(id)
  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(id)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const navigate = useNavigate()

  const handleNavigateBack = () => {
    navigate('/profile', { state: { tabSet: 3 } })
  }

  const auctionHistories = Array.isArray(data) ? data : []
  const images = Array.isArray(auctionData?.asset?.listImages)
    ? auctionData?.asset.listImages
    : [{ imageAsset: auctionData?.asset?.mainImage }]

  const openImageModal = (index) => {
    setCurrentImageIndex(index)
    setImageModalOpen(true)
  }

  const closeImageModal = () => {
    setImageModalOpen(false)
  }

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true)
  }

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false)
  }

  const handleConfirmPayment = () => {
    // Process payment logic here
    setConfirmDialogOpen(false)
    // Redirect to success page
    window.location.href = '/payment-success'
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Đang tải...</Typography>
      </Box>
    )
  }

  if (isError || !auctionData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Không tìm thấy thông tin</Typography>
      </Box>
    )
  }

  const remainingAmount = auctionData.auctionSessionInfo.highestBid - auctionData.depositAmount

  // Calculate payment deadline (3 days from auction end)
  const auctionEndDate = new Date(auctionData.endTime)
  const paymentDeadline = new Date(auctionEndDate)
  paymentDeadline.setDate(auctionEndDate.getDate() + 3)

  return (
    <ThemeProvider theme={theme}>
      <Box maxWidth="xl" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, mx: 'auto' }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleNavigateBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Thanh toán đấu giá
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: '100%', py: { xs: 2, md: 5 }, px: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7} lg={8}>
              <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
                <ImageCarousel images={images} openImageModal={openImageModal} />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">
                    {auctionData.asset.assetName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <InfoChip icon={<EmojiEvents />} label="Đã kết thúc" />
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                      <AccessTime color="action" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(auctionData.endTime).toLocaleString('vi-VN')}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Giá khởi điểm
                        </Typography>
                        <Typography variant="h6" color="primary.main" fontWeight="bold">
                          {auctionData.startingBids.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Tiền cọc
                        </Typography>
                        <Typography variant="h6" fontWeight="medium">
                          {auctionData.depositAmount.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Bước nhảy
                        </Typography>
                        <Typography variant="h6" fontWeight="medium">
                          {auctionData.bidIncrement.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Thông tin vật phẩm
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                      paragraph
                      dangerouslySetInnerHTML={{
                        __html: auctionData.asset.assetDescription || 'Không có thông tin chi tiết.'
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Lịch sử đấu giá
                  </Typography>
                  <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
                    {auctionHistories.map((bid, index) => (
                      <BidHistoryItem key={bid.id} bid={bid} isWinner={index === 0} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 20 } }}>
                <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Người thắng cuộc
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          mr: 2,
                          width: 56,
                          height: 56,
                          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
                        }}
                      >
                        <Person sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {auctionData.auctionSessionInfo.user.name || auctionData.auctionSessionInfo.user.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Thời gian: {new Date(auctionData.endTime).toLocaleString('vi-VN')}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
                      Tổng kết thanh toán
                    </Typography>

                    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2, mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body1">Giá thắng cuộc:</Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {auctionData.auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body1">Tiền cọc đã đóng:</Typography>
                        <Typography variant="body1" fontWeight="medium" color="success.main">
                          - {auctionData.depositAmount.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold">
                          Cần thanh toán:
                        </Typography>
                        <Typography variant="h5" color="error.main" fontWeight="bold">
                          {remainingAmount.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                    </Box>


                    {/* Payment Deadline Warning */}
                    <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <EventAvailable color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6" fontWeight="bold">
                      Thời hạn thanh toán
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Box
                            sx={{
                              p: 2,
                              bgcolor: 'primary.light',
                              color: 'white',
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                              width: 80,
                              height: 80,
                              mr: 2
                            }}
                          >
                            <Typography variant="h4" fontWeight="bold">
                        3
                            </Typography>
                            <Typography variant="caption">ngày</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                        Vui lòng thanh toán trước{' '}
                              <Typography component="span" fontWeight="bold" color="primary.main">
                                {paymentDeadline.toLocaleString('vi-VN', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </Typography>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        (3 ngày kể từ thời điểm kết thúc đấu giá)
                            </Typography>
                          </Box>
                        </Box>

                        <Alert
                          severity="warning"
                          icon={<Warning />}
                          sx={{
                            borderRadius: 2,
                            '& .MuiAlert-message': {
                              width: '100%'
                            }
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight="bold">
                            Lưu ý quan trọng:
                          </Typography>
                          <Typography variant="body2">
                            Nếu không thanh toán đúng hạn, bạn sẽ bị hủy kết quả đấu giá và mất toàn bộ tiền cọc{' '}
                            <Typography component="span" fontWeight="bold">
                              {auctionData.depositAmount.toLocaleString('vi-VN')} VNĐ
                            </Typography>
                            . Vật phẩm sẽ được chuyển cho người đặt giá cao thứ hai hoặc đưa vào phiên đấu giá tiếp theo.
                          </Typography>
                        </Alert>
                      </CardContent>
                    </Card>

                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)'
                        }}
                        startIcon={<CheckCircle />}
                        onClick={handleOpenConfirmDialog}
                      >
                        Xác nhận thanh toán
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        size="large"
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                        onClick={handleNavigateBack}
                      >
                        Quay lại
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Image Modal */}
        <ImageModal
          open={imageModalOpen}
          handleClose={closeImageModal}
          images={images}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
        />

        {/* Payment Confirmation Dialog */}
        <PaymentConfirmDialog
          open={confirmDialogOpen}
          handleClose={handleCloseConfirmDialog}
          handleConfirm={handleConfirmPayment}
          amount={remainingAmount}
        />
      </Box>
    </ThemeProvider>
  )
}

export default Checkout
