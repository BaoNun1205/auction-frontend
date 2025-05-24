import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  Divider,
  Avatar,
  Button,
  Card,
  CardContent,
  Alert
} from '@mui/material'
import {
  AccessTime,
  EmojiEvents,
  Person,
  CheckCircle,
  Warning,
  EventAvailable
} from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook'
import { theme, InfoChip } from './style'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSessionById } from '~/hooks/sessionHook'
import { usePaymentSession } from '~/hooks/balanceHistoryHook'
import { ImageCarousel } from './component/ImageCarousel'
import { ImageModal } from './component/ImageModal'
import { BidHistoryItem } from './component/BidHistoryItem'
import { PaymentConfirmDialog } from './component/PaymentConfirmDialog'
import BackButton from '~/components/BackButton'

const Checkout = () => {
  const { id } = useParams()
  const { data: auctionData, refetch, isLoading, isError } = useGetSessionById(id)
  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(id)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const { mutate: paySession, isPending } = usePaymentSession()

  const navigate = useNavigate()

  const handleNavigateBack = () => {
    navigate('/profile', { state: { tabSet: 3 } })
  }

  const handleConfirmPayment = (item) => {
    paySession(
      { buyerId: item?.auctionSessionInfo?.userId, sellerId: item?.asset?.vendor?.userId, sessionId: item?.id },
      {
        onSuccess: () => {
          console.log('Thanh toán thành công!')
          navigate(`/payment-success/${item?.id}`)
        },
        onError: (error) => {
          console.error('Thanh toán thất bại:', error)
        }
      }
    )
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
        <BackButton label='Thanh toán đấu giá' onClick={() => handleNavigateBack()} />

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
                            . Vật phẩm sẽ được đưa vào phiên đấu giá tiếp theo.
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
          handleConfirm={() => handleConfirmPayment(auctionData)}
          amount={remainingAmount}
        />
      </Box>
    </ThemeProvider>
  )
}

export default Checkout
