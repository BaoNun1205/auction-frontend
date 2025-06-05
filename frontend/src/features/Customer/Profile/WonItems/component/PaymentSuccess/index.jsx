import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Chip,
  Paper,
  Container,
  CardMedia
} from '@mui/material'
import {
  CheckCircle,
  Home,
  ArrowForward,
  LocalShipping,
  EventAvailable,
  Download,
  ContentCopy,
  Share,
  Phone,
  LocationOn,
  Person
} from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './style'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSessionById } from '~/hooks/sessionHook'
// import confetti from 'canvas-confetti'

const PaymentSuccess = () => {
  const { id } = useParams()
  const { data: auctionData, isLoading, isError } = useGetSessionById(id)
  const navigate = useNavigate()
  const [transactionId, setTransactionId] = useState('')

  // Mock shipping information - in a real app, this would come from the user's profile or form input
  const shippingInfo = {
    recipientName: 'Nguyễn Văn A',
    phone: '0912345678',
    address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'
  }

  // Generate a random transaction ID
  useEffect(() => {
    const generateTransactionId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let result = 'TX'
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setTransactionId(result)
    }

    generateTransactionId()
  }, [])

  // Trigger confetti effect on component mount
  // useEffect(() => {
  //   const duration = 3 * 1000
  //   const animationEnd = Date.now() + duration
  //   const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  //   function randomInRange(min, max) {
  //     return Math.random() * (max - min) + min
  //   }

  //   const interval = setInterval(() => {
  //     const timeLeft = animationEnd - Date.now()

  //     if (timeLeft <= 0) {
  //       return clearInterval(interval)
  //     }

  //     const particleCount = 50 * (timeLeft / duration)
  //     // since particles fall down, start a bit higher than random
  //     confetti(
  //       Object.assign({}, defaults, {
  //         particleCount,
  //         origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  //         colors: ['#1976d2', '#4caf50', '#ff9800']
  //       })
  //     )
  //     confetti(
  //       Object.assign({}, defaults, {
  //         particleCount,
  //         origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  //         colors: ['#1976d2', '#4caf50', '#ff9800']
  //       })
  //     )
  //   }, 250)

  //   return () => clearInterval(interval)
  // }, [])

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
  const paymentDate = new Date()
  const estimatedDeliveryDate = new Date()
  estimatedDeliveryDate.setDate(paymentDate.getDate() + 7) // Estimate delivery in 7 days

  const handleCopyTransactionId = () => {
    navigator.clipboard.writeText(transactionId)
    alert('Đã sao chép mã giao dịch!')
  }

  const handleDownloadReceipt = () => {
    alert('Tính năng tải hóa đơn sẽ được cập nhật trong thời gian tới!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Thanh toán đấu giá thành công',
          text: `Tôi đã thanh toán thành công vật phẩm đấu giá: ${auctionData.asset.assetName}`,
          url: window.location.href
        })
        .catch((error) => console.log('Lỗi chia sẻ:', error))
    } else {
      alert('Trình duyệt của bạn không hỗ trợ tính năng chia sẻ!')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 6
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <CheckCircle sx={{ fontSize: 50, color: 'white' }} />
          </Box>
          <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
            Thanh toán thành công!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 3 }}>
            Cảm ơn bạn đã hoàn tất thanh toán. Chúng tôi đã ghi nhận giao dịch của bạn và sẽ tiến hành các bước tiếp
            theo để giao vật phẩm đến bạn.
          </Typography>
          <Chip
            label={`Mã giao dịch: ${transactionId}`}
            color="primary"
            variant="outlined"
            deleteIcon={<ContentCopy />}
            onDelete={handleCopyTransactionId}
            sx={{ py: 1.5, px: 1, '& .MuiChip-label': { px: 1, fontSize: '1rem' } }}
          />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Chi tiết thanh toán
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Ngày thanh toán
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {paymentDate.toLocaleString('vi-VN')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Phương thức thanh toán
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          Chuyển khoản ngân hàng
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Trạng thái
                        </Typography>
                        <Chip label="Đã thanh toán" color="success" size="small" sx={{ fontWeight: 'medium', px: 1 }} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Mã giao dịch
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="medium">
                            {transactionId}
                          </Typography>
                          <IconButton size="small" onClick={handleCopyTransactionId} sx={{ ml: 0.5 }}>
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">Giá thắng cuộc:</Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {auctionData.auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">Tiền cọc đã đóng:</Typography>
                      <Typography variant="body1" fontWeight="medium" color="success.main">
                        - {auctionData.depositAmount.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" fontWeight="bold">
                        Đã thanh toán:
                      </Typography>
                      <Typography variant="h6" color="success.main" fontWeight="bold">
                        {remainingAmount.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Shipping Information Card */}
            <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Thông tin giao hàng
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: '#f5f5f5',
                          mb: 3
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                              <Person color="primary" sx={{ mr: 1, mt: 0.5 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Người nhận
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {shippingInfo.recipientName}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                              <Phone color="primary" sx={{ mr: 1, mt: 0.5 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Số điện thoại
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {shippingInfo.phone}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <LocationOn color="primary" sx={{ mr: 1, mt: 0.5 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Địa chỉ giao hàng
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {shippingInfo.address}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'primary.light',
                          color: 'white',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocalShipping sx={{ mr: 1 }} />
                          <Typography variant="subtitle1" fontWeight="bold">
                            Dự kiến giao hàng
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {estimatedDeliveryDate.toLocaleDateString('vi-VN')}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                          (Trong vòng 7 ngày làm việc)
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: '#f5f5f5',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EventAvailable sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="subtitle1" fontWeight="bold">
                            Trạng thái đơn hàng
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          Đang xử lý
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin giao hàng
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={handleDownloadReceipt}
                      sx={{ borderRadius: 2 }}
                    >
                      Tải hóa đơn
                    </Button>
                    <Button variant="outlined" startIcon={<Share />} onClick={handleShare} sx={{ borderRadius: 2 }}>
                      Chia sẻ
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      auctionData.asset.mainImage ||
                      (auctionData.asset.listImages && auctionData.asset.listImages[0]?.imageAsset) ||
                      '/placeholder.svg?height=200&width=400'
                    }
                    alt={auctionData.asset.assetName}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))'
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="white">
                      {auctionData.asset.assetName}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      Giá thắng cuộc:
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {auctionData.auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VNĐ
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Thông tin vật phẩm
                  </Typography>

                  {/* HTML formatted description */}
                  <Box
                    sx={{
                      mb: 3,
                      maxHeight: 200,
                      overflow: 'auto',
                      '& img': { maxWidth: '100%', height: 'auto' },
                      '& table': { width: '100%', borderCollapse: 'collapse' },
                      '& td, & th': { border: '1px solid #ddd', padding: '8px' }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: auctionData.asset.assetDescription || 'Không có thông tin chi tiết.'
                    }}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowForward />}
                    onClick={() => navigate(`/session/${id}`)}
                    sx={{ borderRadius: 2, mb: 2 }}
                  >
                    Xem chi tiết vật phẩm
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', p: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Bạn cần hỗ trợ?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Nếu bạn có bất kỳ câu hỏi nào về đơn hàng hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: 2, mb: 2 }}
                  onClick={() => navigate('/contact')}
                >
                  Liên hệ hỗ trợ
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                  onClick={() => navigate('/')}
                >
                  Về trang chủ
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default PaymentSuccess
