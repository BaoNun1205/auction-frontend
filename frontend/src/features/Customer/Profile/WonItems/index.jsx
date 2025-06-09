import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Chip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Payment, CheckCircle, Cancel, Timer, LocalShipping, Beenhere } from '@mui/icons-material'
import { useGetWinSessionsByUserId, useUpdateSessionWinnerStatus } from '~/hooks/sessionHook'
import { useAppStore } from '~/store/appStore'
import { useNavigate } from 'react-router-dom'
import { useCompletedPaymentSession } from '~/hooks/balanceHistoryHook'
import DeliveryTrackingDialog from '~/features/Vendor/components/MyAssets/component/DeliveryTrackingDialog'

const StyledCard = styled(Paper)({
  display: 'flex',
  marginBottom: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(180, 23, 18, 0.08)',
  border: '1px solid rgba(180, 23, 18, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(180, 23, 18, 0.15)',
    transform: 'translateY(-2px)'
  }
})

const InfoChip = styled(Chip)({
  borderRadius: '16px',
  fontWeight: '500'
})

const AnimatedButton = styled(Button)({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  backgroundColor: '#b41712',
  '&:hover': {
    backgroundColor: '#a01510',
    transform: 'translateY(-1px)'
  }
})

const WonItems = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [receivedConfirmDialog, setReceivedConfirmDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [trackingDialog, setTrackingDialog] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const { mutate: completedPaymentSession, isPending } = useCompletedPaymentSession()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const navigate = useNavigate()
  const { auth } = useAppStore()
  const { data, refetch } = useGetWinSessionsByUserId(auth.user.id)
  const { mutate: updateStatus, isLoading: isUpdating } = useUpdateSessionWinnerStatus()
  const wonItems = Array.isArray(data) ? data : []

  const getStatusCount = (status) => {
    if (status === 'ALL') return wonItems.length
    const statusKeys = ['PENDING_PAYMENT', 'PAYMENT_SUCCESSFUL', 'DELIVERING', 'RECEIVED', 'CANCELED']
    const statusKey = statusKeys.find((key) => key === status)
    return wonItems.filter((item) => item.status === statusKey).length
  }

  const handleOpenDetails = (item) => {
    if (item.status === 'PAYMENT_SUCCESSFUL') {
      navigate(`/invoice/${item.auctionSession.auctionSessionId}`, {
        state: { tabSet: 3 }
      })
    } else if (item.status === 'DELIVERING') {
      setSelectedAsset(item.auctionSession.asset)
      setTrackingDialog(true)
    } else if (item.status === 'RECEIVED') {
      navigate(`/invoice/${item.auctionSession.auctionSessionId}`)
    } else {
      navigate(`/checkout/${item.auctionSession.auctionSessionId}`)
    }
  }

  const handleConfirmReceived = (item) => {
    setSelectedItem(item)
    setReceivedConfirmDialog(true)
  }

  const handleCloseReceivedDialog = () => {
    setReceivedConfirmDialog(false)
    setSelectedItem(null)
  }

  const handleConfirmReceivedAction = () => {
    console.log('Confirming received for item:', selectedItem)
    if (!selectedItem) return

    const { auctionSession } = selectedItem
    const buyerId = selectedItem.user.userId
    const sellerId = auctionSession?.asset?.vendor?.userId
    const sessionId = auctionSession?.auctionSessionId

    if (!buyerId || !sellerId || !sessionId) {
      setSnackbar({
        open: true,
        message: 'Không đủ thông tin để xác nhận nhận hàng!',
        severity: 'error'
      })
      return
    }

    completedPaymentSession(
      { buyerId, sellerId, sessionId },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `Đã xác nhận nhận hàng và hoàn tất thanh toán cho "${selectedItem.auctionSession.asset.assetName}"`,
            severity: 'success'
          })
          setReceivedConfirmDialog(false)
          setSelectedItem(null)
          refetch()
        },
        onError: (error) => {
          setSnackbar({
            open: true,
            message: 'Có lỗi khi xác nhận nhận hàng và hoàn tất thanh toán!',
            severity: 'error'
          })
          console.error('Error completing payment session:', error)
        }
      }
    )
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleCloseTrackingDialog = () => {
    setTrackingDialog(false)
    setSelectedAsset(null)
  }

  const getStatusChip = (status) => {
    const statusConfig = {
      PENDING_PAYMENT: { icon: <Payment />, label: 'Chờ thanh toán', color: 'warning' },
      PAYMENT_SUCCESSFUL: { icon: <CheckCircle />, label: 'Đã thanh toán', color: 'success' },
      DELIVERING: { icon: <LocalShipping />, label: 'Đang giao hàng', color: 'info' },
      RECEIVED: { icon: <Beenhere />, label: 'Đã nhận', color: 'success' },
      CANCELED: { icon: <Cancel />, label: 'Đã hủy', color: 'error' }
    }
    const config = statusConfig[status] || statusConfig.CANCELED

    return <InfoChip icon={config.icon} label={config.label} color={config.color} size="small" />
  }

  const getButtonText = (status) => {
    switch (status) {
    case 'PENDING_PAYMENT':
      return 'Thanh toán'
    case 'PAYMENT_SUCCESSFUL':
    case 'DELIVERING':
    case 'RECEIVED':
    case 'CANCELED':
    default:
      return 'Xem chi tiết'
    }
  }

  const filteredData = useMemo(() => {
    if (activeTab === 0) return wonItems // Tab "Tất cả"
    const statusKeys = ['PENDING_PAYMENT', 'PAYMENT_SUCCESSFUL', 'DELIVERING', 'RECEIVED', 'CANCELED']
    return wonItems.filter((item) => item.status === statusKeys[activeTab - 1])
  }, [activeTab, wonItems])

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Vật phẩm đã thắng
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Lưu trữ các vật phẩm đã thắng trong các phiên đấu giá
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          {/* Status Count Chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {[
              { key: 'ALL', label: 'Tất cả', index: 0 },
              { key: 'PENDING_PAYMENT', label: 'Chờ thanh toán', index: 1 },
              { key: 'PAYMENT_SUCCESSFUL', label: 'Đã thanh toán', index: 2 },
              { key: 'DELIVERING', label: 'Đang giao hàng', index: 3 },
              { key: 'RECEIVED', label: 'Đã nhận', index: 4 },
              { key: 'CANCELED', label: 'Đã hủy', index: 5 }
            ].map(({ key, label, index }) => (
              <Chip
                key={key}
                label={`${label} (${getStatusCount(key)})`}
                variant={activeTab === index ? 'filled' : 'outlined'}
                onClick={() => setActiveTab(index)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '20px',
                  backgroundColor: activeTab === index ? '#b41712' : 'transparent',
                  color: activeTab === index ? 'white' : '#b41712',
                  borderColor: '#b41712',
                  '&:hover': {
                    backgroundColor: activeTab === index ? '#a01510' : 'rgba(180, 23, 18, 0.1)'
                  }
                }}
              />
            ))}
          </Box>
        </Paper>

        <Box sx={{ mt: 3, maxHeight: '600px', overflowY: 'auto' }}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <StyledCard key={item.sessionWinnerId}>
                <Box sx={{ position: 'relative', width: 208, height: 208, m: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    image={item.auctionSession.asset.mainImage || '/placeholder.svg?height=200&width=200'}
                    alt={item.auctionSession.asset.assetName}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                  <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {item.auctionSession.asset.assetName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      Giá thắng: {item.price.toLocaleString('vi-VN')} ₫
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Timer color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        Thời gian đấu giá: {new Date(item.victoryTime).toLocaleString('vi-VN')}
                      </Typography>
                    </Box>
                    {getStatusChip(item.status)}
                  </CardContent>
                  <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end', p: 0, gap: 1 }}>
                    {item.status === 'DELIVERING' && (
                      <AnimatedButton
                        variant="outlined"
                        onClick={() => handleConfirmReceived(item)}
                        disabled={isUpdating}
                        sx={{
                          mt: 2,
                          borderColor: '#b41712',
                          color: '#b41712',
                          backgroundColor: 'transparent',
                          '&:hover': {
                            borderColor: '#a01510',
                            backgroundColor: 'rgba(180, 23, 18, 0.1)',
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        {isUpdating ? 'Đang xử lý...' : 'Đã nhận'}
                      </AnimatedButton>
                    )}
                    {item.status !== 'CANCELED' && (
                      <AnimatedButton variant="contained" onClick={() => handleOpenDetails(item)} sx={{ mt: 2 }}>
                        {getButtonText(item.status)}
                      </AnimatedButton>
                    )}
                  </CardActions>
                </Box>
              </StyledCard>
            ))
          ) : (
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ py: 4 }}>
              Không có vật phẩm nào
            </Typography>
          )}
        </Box>
      </Box>

      {/* Received Confirmation Dialog */}
      <Dialog
        open={receivedConfirmDialog}
        onClose={handleCloseReceivedDialog}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid rgba(180, 23, 18, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#b41712', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Beenhere />
          Xác nhận đã nhận hàng
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Bạn có chắc chắn đã nhận được vật phẩm{' '}
            <strong style={{ color: '#b41712' }}>"{selectedItem?.auctionSession?.asset?.assetName}"</strong> không?
          </DialogContentText>
          <Box
            sx={{
              p: 2,
              backgroundColor: 'rgba(180, 23, 18, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(180, 23, 18, 0.2)'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Lưu ý:</strong> Sau khi xác nhận, trạng thái sẽ được cập nhật thành "Đã nhận" và bạn không thể
              thay đổi lại.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCloseReceivedDialog}
            variant="outlined"
            sx={{
              borderColor: '#b41712',
              color: '#b41712',
              '&:hover': {
                borderColor: '#a01510',
                backgroundColor: 'rgba(180, 23, 18, 0.1)'
              }
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmReceivedAction}
            variant="contained"
            startIcon={<CheckCircle />}
            disabled={isUpdating}
            sx={{
              backgroundColor: '#b41712',
              '&:hover': {
                backgroundColor: '#a01510'
              }
            }}
          >
            {isUpdating ? 'Đang xử lý...' : 'Xác nhận đã nhận'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <DeliveryTrackingDialog
        open={trackingDialog}
        onClose={handleCloseTrackingDialog}
        asset={selectedAsset}
      />
    </Container>
  )
}

export default WonItems
