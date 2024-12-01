import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
  Box,
  Typography,
  Card,
  Breadcrumbs,
  Chip,
  Divider,
  Grid,
  CardContent,
  Fade,
  Zoom,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import { ChevronRight, Lock, LocalShipping, Whatshot } from '@mui/icons-material'
import { useTheme, useMediaQuery } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import LoginForm from '~/features/Authentication/components/AuthLogin/Login'
import { useNavigate } from 'react-router-dom'
import { StyledCardMedia, StyledCard } from './style'
import { useCreateAuctionHistory } from '~/hooks/auctionHistoryHook'
import AppModal from '~/components/Modal/Modal'
import PlaceBidForm from './components/PlaceBidForm/PlaceBidForm'
import VendorInformation from '../VendorInfomation'
import { connectWebSocket, disconnectWebSocket, sendMessage } from '~/service/webSocketService'

const AssetDetail = ({ item }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { auth } = useAppStore()
  const navigate = useNavigate()
  const [mainImage, setMainImage] = useState(item.asset?.mainImage || 'https://via.placeholder.com/400')
  const [highestBid, setHighestBid] = useState(item?.auctionSessionInfo?.highestBid)
  const [totalBidder, setTotalBidder] = useState(item?.auctionSessionInfo?.totalBidder)
  const [totalAuctionHistory, setTotalAuctionHistory] = useState(item?.auctionSessionInfo?.totalAuctionHistory)
  const [bidPrice, setBidPrice] = useState('')
  const [error, setError] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const { mutate: createAuctionHistory } = useCreateAuctionHistory()
  const depositRate = 0.23
  const minBidIncrement = item.bidIncrement

  const placeholderImage = 'https://via.placeholder.com/150'

  const handleThumbnailClick = (image) => {
    setMainImage(image)
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  const onMessage = useCallback((message) => {
    const response = JSON.parse(message.body)
    if (response.code === 200 && response.result) {
      const { auctionSessionInfo } = response.result
      setTotalBidder(auctionSessionInfo.totalBidder)
      setTotalAuctionHistory(auctionSessionInfo.totalAuctionHistory)
      setHighestBid(auctionSessionInfo.highestBid)

      // Display a snackbar notification for the new bid
      setSnackbar({
        open: true,
        message: `New bid: ${auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VND`,
        severity: 'info'
      })
    }
  }, [])

  useEffect(() => {
    const destination = `/rt-product/bidPrice-update/${item.id}`
    connectWebSocket(auth.token, destination, onMessage)

    return () => {
      disconnectWebSocket()
    }
  }, [auth.token, item.id, onMessage])

  const handleBidPrice = () => {
    sendMessage(`/app/rt-auction/placeBid/${item.id}`, {})
  }

  const currentPrice = item?.auctionSessionInfo?.highestBid || 0
  const minNextBid = currentPrice + minBidIncrement

  useEffect(() => {
    setBidPrice(minNextBid.toString())
  }, [minNextBid])

  const handleSubmit = (bidPrice) => {
    const auctionHistory = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      bidPrice: bidPrice,
      bidTime: new Date().toISOString()
    }
    console.log('Submitting auction history:', auctionHistory)
    createAuctionHistory(auctionHistory, {
      onSuccess: () => {
        console.log('Auction history submitted successfully')
        const bidRequest = {
          auctionSessionId: item.id,
          userId: auth.user.id,
          bidPrice: bidPrice,
          bidTime: new Date().toISOString()
        }
        handleBidPrice()
      },
      onError: (error) => {
        console.error('Error submitting auction history:', error)
        setSnackbar({
          open: true,
          message: 'Error placing bid. Please try again.',
          severity: 'error'
        })
      }
    })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box mb={6}>
      <Breadcrumbs separator={<ChevronRight fontSize="small" />} aria-label="breadcrumb" mb={3}>
        <Typography
          color="inherit"
          onClick={() => handleNavigate('/')}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Trang chủ
        </Typography>
        <Typography
          color="inherit"
          onClick={() => handleNavigate('/art')}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Phiên đấu giá đang diễn ra
        </Typography>
        <Typography color="text.primary">Chi tiết</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Card elevation={3}>
              <StyledCardMedia
                component="img"
                height="400"
                image={mainImage}
                alt="European School, Floral Still Life"
              />
            </Card>
          </Zoom>
          <Grid container spacing={2} mt={2}>
            {item.asset?.listImages.slice(0, 4).map((image, i) => (
              <Grid item xs={3} key={i}>
                <Fade in={true} style={{ transitionDelay: `${i * 100}ms` }}>
                  <StyledCard
                    onClick={() => handleThumbnailClick(image.imageAsset || placeholderImage)}
                  >
                    <StyledCardMedia
                      component="img"
                      height="100"
                      image={image.imageAsset || placeholderImage}
                      alt={`Thumbnail ${i}`}
                    />
                  </StyledCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            {item.asset.assetName}
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Giá khởi điểm: {item.startingBids} VND
            </Typography>
            {(() => {
              return (
                <Typography variant="subtitle1" color="text.secondary">
                  {new Date(item.endTime).toLocaleString('vi-VN')}
                </Typography>
              )
            })()}
          </Box>

          <Fade in={true} style={{ transitionDelay: '500ms' }}>
            <Card elevation={3} sx={{ bgcolor: 'background.default', mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2">Giá hiện tại ({totalAuctionHistory} lượt)</Typography>
                  <Chip
                    icon={<Lock fontSize="small" />}
                    label="SECURE"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {highestBid.toLocaleString('vi-VN')} VND
                </Typography>
                <AppModal trigger={
                  <Button
                    variant="contained"
                    sx={{
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: '#b41712',
                      color: 'white',
                      px: 4,
                      '&:hover': {
                        bgcolor: '#8B0000',
                        transform: 'translateY(-3px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    Đặt giá
                  </Button>
                }>
                  {auth.isAuth ? (
                    <PlaceBidForm item={item} onSubmit={handleSubmit} />
                  ) : (
                    <LoginForm />
                  )}
                </AppModal>
                <Box display="flex" alignItems="center" mt={2}>
                  <Whatshot color="error" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {totalBidder} người tham gia
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
          <Divider />

          <Box display="flex" alignItems="center" mt={3}>
            <LocalShipping color="action" />
            <Typography variant="body2" color="text.secondary" ml={1}>
              Xem chính sách vận chuyển
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 6 }} />
      <Typography variant="h5" gutterBottom>
        Thông tin chi tiết
      </Typography>
      <Typography variant="h6" gutterBottom>
        Mô tả
      </Typography>
      <Typography paragraph dangerouslySetInnerHTML={{ __html: item.description }} />
      <Typography variant="h6" gutterBottom>
        Thông tin giá cọc
      </Typography>
      <Typography>25%</Typography>
      <Divider sx={{ my: 6 }} />

      <VendorInformation />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AssetDetail