import React, { useState, useEffect } from 'react'
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
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  AccessTime,
  EmojiEvents,
  Person,
  CheckCircle,
  Warning,
  EventAvailable,
  LocationOn,
  Add,
  AccountBalanceWallet
} from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook'
import { theme, InfoChip } from './style'
import { useParams } from 'react-router-dom'
import { useGetSessionById } from '~/hooks/sessionHook'
import { useCancelPaymentSession, usePaymentSession } from '~/hooks/balanceHistoryHook'
import { ImageCarousel } from './component/ImageCarousel'
import { ImageModal } from './component/ImageModal'
import { BidHistoryItem } from './component/BidHistoryItem'
import { PaymentConfirmDialog } from './component/PaymentConfirmDialog'
import BackButton from '~/components/BackButton'
import { useAppStore } from '~/store/appStore'
import { useGetAddressByUserId } from '~/hooks/addressHook'
import { useCustomNavigate } from '~/utils/navigate'

const Checkout = () => {
  const { id } = useParams()
  const { auth } = useAppStore()
  const { data: auctionData, refetch, isLoading, isError } = useGetSessionById(id)
  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(id)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [cancelPaymentDialog, setCancelPaymentDialog] = useState(false)
  const { mutate: paySession, isPending } = usePaymentSession()
  const { data: addresses } = useGetAddressByUserId(auth.user.id)
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [showAddressSelection, setShowAddressSelection] = useState(false)
  const [insufficientBalanceDialog, setInsufficientBalanceDialog] = useState(false)
  const { handleNavigate } = useCustomNavigate()
  const { mutate: cancelPayment } = useCancelPaymentSession()

  const handleNavigateBack = () => {
    handleNavigate('/profile', { tabSet: 3 })
  }

  const handleConfirmPayment = (item) => {
    paySession(
      {
        buyerId: item?.auctionSessionInfo?.userId,
        sellerId: item?.asset?.vendor?.userId,
        sessionId: item?.id,
        addressId: selectedAddressId
      },
      {
        onSuccess: () => {
          console.log('Thanh toán thành công!')
          handleNavigate(`/payment-success/${item?.id}`)
        },
        onError: (error) => {
          handleCloseConfirmDialog()
          if (error?.response?.data?.code === 1043) {
            setTimeout(() => {
              setInsufficientBalanceDialog(true)
            }, 100)
          }
        }
      }
    )
  }

  const handleConfirmCancelPayment = (item) => {
    cancelPayment(
      {
        sellerId: item?.asset?.vendor?.userId,
        sessionId: item?.id
      },
      {
        onSuccess: () => {
          handleNavigate('/profile/', { tabSet: 3 })
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

  const handleOpenCancelDialog = () => {
    setCancelPaymentDialog(true)
  }

  const handleCloseCancelDialog = () => {
    setCancelPaymentDialog(false)
  }

  const handleConfirmCancel = () => {
    setCancelPaymentDialog(false)
    // Navigate back or handle cancellation logic
    handleNavigateBack()
  }

  const handleCloseInsufficientBalanceDialog = () => {
    setInsufficientBalanceDialog(false)
  }

  const handleNavigateToTopUp = () => {
    handleCloseInsufficientBalanceDialog()
    handleCloseConfirmDialog()
    handleNavigate('/profile', { tabSet: 6 })
  }

  const handleAddressChange = (event) => {
    setSelectedAddressId(event.target.value)
    console.log('Selected address ID:', event.target.value)
  }

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault)
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.addressId)
      } else {
        setSelectedAddressId(addresses[0].addressId)
      }
      // Reset selection view when addresses change
      setShowAddressSelection(false)
    }
  }, [addresses])

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
        <BackButton label="Thanh toán đấu giá" onClick={() => handleNavigateBack()} />

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
                      {/* Address Selection Section */}
                      <Card
                        elevation={0}
                        sx={{ borderRadius: 3, overflow: 'hidden', mb: 3, border: '1px solid #e0e0e0' }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn color="primary" sx={{ mr: 1 }} />
                              <Typography variant="h6" fontWeight="bold">
                                Địa chỉ giao hàng
                              </Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Add />}
                              onClick={() => handleNavigate('/profile', { tabSet: 2 })}
                              sx={{ textTransform: 'none' }}
                            >
                              Thêm địa chỉ
                            </Button>
                          </Box>

                          {addresses && addresses.length > 0 ? (
                            <>
                              {!showAddressSelection ? (
                                // Show default address only
                                (() => {
                                  const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0]
                                  return (
                                    <Box>
                                      <Box
                                        sx={{
                                          p: 2,
                                          border: '2px solid #1976d2',
                                          borderRadius: 2,
                                          backgroundColor: '#f3f7ff',
                                          mb: 2
                                        }}
                                      >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                          <Typography variant="subtitle1" fontWeight="bold">
                                            {defaultAddress.recipientName}
                                          </Typography>
                                          {defaultAddress.isDefault && (
                                            <Typography
                                              variant="caption"
                                              sx={{
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                px: 1,
                                                py: 0.25,
                                                borderRadius: 1,
                                                fontSize: '0.7rem'
                                              }}
                                            >
                                              Mặc định
                                            </Typography>
                                          )}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                          {defaultAddress.phone}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          {defaultAddress.addressDetail}
                                        </Typography>
                                      </Box>

                                      {addresses.length > 1 && (
                                        <Button
                                          variant="text"
                                          color="primary"
                                          size="small"
                                          onClick={() => setShowAddressSelection(true)}
                                          sx={{ textTransform: 'none', fontWeight: 'medium' }}
                                        >
                                          Đổi địa chỉ
                                        </Button>
                                      )}
                                    </Box>
                                  )
                                })()
                              ) : (
                                // Show all addresses for selection
                                <Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      mb: 2
                                    }}
                                  >
                                    <Typography variant="subtitle1" fontWeight="medium">
                                      Chọn địa chỉ giao hàng
                                    </Typography>
                                    <Button
                                      variant="text"
                                      size="small"
                                      onClick={() => setShowAddressSelection(false)}
                                      sx={{ textTransform: 'none' }}
                                    >
                                      Thu gọn
                                    </Button>
                                  </Box>

                                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                                    <RadioGroup
                                      value={selectedAddressId}
                                      onChange={handleAddressChange}
                                      sx={{ gap: 1 }}
                                    >
                                      {addresses.map((address) => (
                                        <FormControlLabel
                                          key={address.addressId}
                                          value={address.addressId}
                                          control={<Radio />}
                                          sx={{
                                            margin: 0,
                                            padding: 2,
                                            border:
                                              selectedAddressId === address.addressId
                                                ? '2px solid #1976d2'
                                                : '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            backgroundColor:
                                              selectedAddressId === address.addressId ? '#f3f7ff' : 'transparent',
                                            '&:hover': {
                                              backgroundColor: '#f5f5f5'
                                            }
                                          }}
                                          label={
                                            <Box sx={{ ml: 1, width: '100%' }}>
                                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                  {address.recipientName}
                                                </Typography>
                                                {address.isDefault && (
                                                  <Typography
                                                    variant="caption"
                                                    sx={{
                                                      bgcolor: 'primary.main',
                                                      color: 'white',
                                                      px: 1,
                                                      py: 0.25,
                                                      borderRadius: 1,
                                                      fontSize: '0.7rem'
                                                    }}
                                                  >
                                                    Mặc định
                                                  </Typography>
                                                )}
                                              </Box>
                                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                {address.phone}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                {address.addressDetail}
                                              </Typography>
                                            </Box>
                                          }
                                        />
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                </Box>
                              )}
                            </>
                          ) : (
                            <Alert
                              severity="warning"
                              sx={{
                                borderRadius: 2,
                                '& .MuiAlert-message': {
                                  width: '100%'
                                }
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                                Chưa có địa chỉ giao hàng
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                Bạn cần thêm ít nhất một địa chỉ giao hàng để có thể tiến hành thanh toán.
                              </Typography>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<Add />}
                                onClick={() => handleNavigate('/profile', { tabSet: 2 })}
                                sx={{ textTransform: 'none' }}
                              >
                                Thêm địa chỉ ngay
                              </Button>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>

                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={!addresses || addresses.length === 0 || !selectedAddressId}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                          '&.Mui-disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e'
                          }
                        }}
                        startIcon={<CheckCircle />}
                        onClick={handleOpenConfirmDialog}
                      >
                        {addresses && addresses.length > 0 ? 'Xác nhận thanh toán' : 'Vui lòng thêm địa chỉ giao hàng'}
                      </Button>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="large"
                          fullWidth
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            borderColor: '#f44336',
                            color: '#f44336',
                            '&:hover': {
                              borderColor: '#d32f2f',
                              backgroundColor: 'rgba(244, 67, 54, 0.04)'
                            }
                          }}
                          startIcon={<Warning />}
                          onClick={handleOpenCancelDialog}
                        >
                          Hủy thanh toán
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          size="large"
                          fullWidth
                          sx={{
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

        {/* Dialog thông báo không đủ tiền */}
        <Dialog
          open={insufficientBalanceDialog}
          onClose={handleCloseInsufficientBalanceDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 2
            }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AccountBalanceWallet sx={{ fontSize: 30, color: '#f44336' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                Tài khoản không đủ tiền
              </Typography>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Số dư trong tài khoản của bạn không đủ để đặt cọc cho phiên đấu giá này.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vui lòng nạp thêm tiền vào tài khoản để tiếp tục tham gia đấu giá.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'center', gap: 2, pt: 1 }}>
            <Button
              onClick={handleCloseInsufficientBalanceDialog}
              variant="outlined"
              sx={{
                borderColor: '#ccc',
                color: '#666',
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Để sau
            </Button>
            <Button
              onClick={handleNavigateToTopUp}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #b41712, #d32f2f)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #8f0e0a, #b71c1c)'
                }
              }}
            >
              Nạp tiền ngay
            </Button>
          </DialogActions>
        </Dialog>
        {/* Cancel Payment Confirmation Dialog */}
        <Dialog
          open={cancelPaymentDialog}
          onClose={handleCloseCancelDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 2
            }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Warning sx={{ fontSize: 30, color: '#f44336' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                Xác nhận hủy thanh toán
              </Typography>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Nếu bạn hủy thanh toán này, bạn sẽ <strong>mất toàn bộ tiền cọc</strong> đã đóng.
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: 'rgba(244, 67, 54, 0.1)',
                borderRadius: 2,
                border: '1px solid rgba(244, 67, 54, 0.3)',
                mb: 2
              }}
            >
              <Typography variant="h6" color="error.main" fontWeight="bold">
                Số tiền cọc sẽ mất: {auctionData.depositAmount.toLocaleString('vi-VN')} VNĐ
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Vật phẩm sẽ được đưa vào phiên đấu giá tiếp theo và bạn không thể hoàn tác quyết định này.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'center', gap: 2, pt: 1 }}>
            <Button
              onClick={handleCloseCancelDialog}
              variant="outlined"
              sx={{
                borderColor: '#ccc',
                color: '#666',
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Không, tiếp tục thanh toán
            </Button>
            <Button
              onClick={() => handleConfirmCancelPayment(auctionData)}
              variant="contained"
              color="error"
              sx={{
                background: 'linear-gradient(135deg, #b41712, #d32f2f)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #8f0e0a, #b71c1c)'
                }
              }}
            >
              Có, hủy thanh toán
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default Checkout
