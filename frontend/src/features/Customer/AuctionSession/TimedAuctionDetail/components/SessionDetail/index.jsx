import React, { useCallback, useEffect, useState } from 'react'
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
  Alert,
  Avatar,
  Paper,
  createTheme,
  ThemeProvider,
  Container
} from '@mui/material'
import { AccessTime, ChevronRight, EmojiEvents, Lock, Whatshot } from '@mui/icons-material'
import { useTheme, useMediaQuery } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import LoginForm from '~/features/Authentication/components/AuthLogin/Login'
import { useNavigate } from 'react-router-dom'
import { StyledCardMedia, StyledCard, primaryColor } from './style'
import { useCreateAuctionHistory, useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook'
import AppModal from '~/components/Modal/Modal'
import PlaceBidForm from './components/PlaceBidForm'
import VendorInformation from '../VendorInfomation'
import { connectWebSocket, disconnectWebSocket, sendMessage } from '~/service/webSocketService'
import Countdown from 'react-countdown'
import PlaceDepositForm from './components/PlaceDepositForm'
import AuctionHistoryDialog from './components/AuctionHistoryDialog'
import { useCheckDeposit, useCreateDeposit } from '~/hooks/depositHook'

const customTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor
    }
  }
})

const SessionDetail = ({ item, refresh }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { auth } = useAppStore()
  const navigate = useNavigate()
  const [mainImage, setMainImage] = useState(item.asset?.mainImage || 'https://via.placeholder.com/400')
  const [highestBid, setHighestBid] = useState(item?.auctionSessionInfo?.highestBid)
  const [totalBidder, setTotalBidder] = useState(item?.auctionSessionInfo?.totalBidder)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [totalAuctionHistory, setTotalAuctionHistory] = useState(item?.auctionSessionInfo?.totalAuctionHistory)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const { mutate: createAuctionHistory } = useCreateAuctionHistory()
  const { mutate: createDeposit } = useCreateDeposit()
  const { data: isDeposit, refetch: refetchIsDeposit, error: depositError, isLoading: depositLoading } = useCheckDeposit({ userId: auth.user.id, auctionSessionId: item.id })
  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(item.id)
  const auctionHistory = Array.isArray(data) ? data : []


  const placeholderImage = 'https://via.placeholder.com/150'

  const handleThumbnailClick = (image) => {
    setMainImage(image)
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleOpenHistoryDialog = () => {
    setHistoryDialogOpen(true)
  }

  const handleCloseHistoryDialog = () => {
    setHistoryDialogOpen(false)
  }

  const onMessage = useCallback((message) => {
    const response = JSON.parse(message.body)
    if (response.code === 200 && response.result) {
      const { auctionSessionInfo } = response.result
      setTotalBidder(auctionSessionInfo.totalBidder)
      setTotalAuctionHistory(auctionSessionInfo.totalAuctionHistory)
      setHighestBid(auctionSessionInfo.highestBid)

      setSnackbar({
        open: true,
        message: `New bid: ${auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VND`,
        severity: 'info'
      })
    }
  }, [])

  useEffect(() => {
    if (item.status === 'ONGOING') {
      const destination = `/rt-product/bidPrice-update/${item.id}`
      connectWebSocket(auth.token, destination, onMessage)

      return () => {
        disconnectWebSocket()
      }
    }
  }, [auth.token, item.id, onMessage])

  const handleBidPrice = () => {
    sendMessage(`/app/rt-auction/placeBid/${item.id}`, {})
  }

  const handleSubmitPrice = (bidPrice) => {
    const auctionHistory = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      bidPrice: bidPrice,
      bidTime: new Date().toISOString()
    }
    createAuctionHistory(auctionHistory, {
      onSuccess: () => {
        handleBidPrice()
        refresh()
        refreshHistory()
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

  const handleSubmitDeposit = () => {
    const depositAuction = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      depositPrice: item.depositAmount
    }
    createDeposit(depositAuction, {
      onSuccess: () => {
        refetchIsDeposit()
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

  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      refresh()
      return <span>Phiên đấu giá đã kết thúc</span>
    } else {
      return (
        <span>
          {days} ngày {hours} giờ {minutes} phút {seconds} giây
        </span>
      )
    }
  }

  const renderWinnerSection = () => {
    if (item.status !== 'AUCTION_SUCCESS' && item.status !== 'AUCTION_FAILED') return null

    return (
      <>
        <Divider sx={{ my: 3 }} />
        <Fade in={true} style={{ transitionDelay: '700ms' }}>
          <Box sx={{ p: 2, mt: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              {item.status === 'AUCTION_FAILED' ? (
                <Typography variant="h6" color="error" align="center">
                Chưa có người đấu giá
                </Typography>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                  Người Thắng Cuộc
                  </Typography>
                  <Avatar
                    src={item.auctionSessionInfo.user.avatar || placeholderImage}
                    alt="Winner Avatar"
                    sx={{ width: 100, height: 100, mb: 2, border: `4px solid ${primaryColor}` }}
                  />
                  <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    {item.auctionSessionInfo.user.username}
                  </Typography>
                  <Typography variant="h6" align="center" sx={{ mb: 2 }} color="text.secondary">
                  Giá thắng: <span style={{ fontWeight: 'bold', color: primaryColor }}>{highestBid.toLocaleString('vi-VN')} VND</span>
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Chip
                        icon={<Whatshot />}
                        label={`${totalBidder} người tham gia`}
                        color="primary"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <Chip
                        icon={<AccessTime />}
                        label={`${totalAuctionHistory} lượt đấu giá`}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Box>
        </Fade>
      </>
    )
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth="lg">
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
                <StyledCard elevation={3}>
                  <StyledCardMedia
                    component="img"
                    height="400"
                    image={mainImage}
                    alt={item.name}
                  />
                </StyledCard>
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
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {item.name}
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Giá khởi điểm: <span style={{ fontWeight: 'bold', color: primaryColor }}>{item.startingBids.toLocaleString('vi-VN')} VND</span>
                </Typography>
                <Chip
                  icon={<AccessTime />}
                  label={new Date(item.endTime).toLocaleString('vi-VN')}
                  variant="outlined"
                />
              </Box>
              {item.status === 'ONGOING' ? (
                <Fade in={true} style={{ transitionDelay: '500ms' }}>
                  <Card elevation={3} sx={{ bgcolor: theme.palette.background.paper, mb: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="body1">
                          Giá hiện tại ({totalAuctionHistory} lượt)
                          <Typography
                            component="span"
                            sx={{
                              ml: 1,
                              color: isDeposit ? primaryColor : 'gray',
                              cursor: isDeposit ? 'pointer' : 'default',
                              textDecoration: 'underline',
                              opacity: isDeposit ? 1 : 0.5
                            }}
                            onClick={isDeposit ? handleOpenHistoryDialog : undefined}
                          >
                            Xem
                          </Typography>
                        </Typography>
                        <Chip
                          icon={<Lock fontSize="small" />}
                          label="SECURE"
                          color="success"
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
                          fullWidth
                          size="large"
                          sx={{
                            mt: 2,
                            mb: 2,
                            transition: 'all 0.3s ease-in-out',
                            bgcolor: primaryColor,
                            color: 'white',
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
                          !isDeposit ? (
                            <PlaceDepositForm item={item} onSubmit={handleSubmitDeposit} />
                          ) : (
                            <PlaceBidForm item={item} onSubmit={handleSubmitPrice} />
                          )
                        ) : (
                          <LoginForm />
                        )}
                      </AppModal>

                      <AuctionHistoryDialog
                        auctionHistory={auctionHistory}
                        open={historyDialogOpen}
                        onClose={handleCloseHistoryDialog}
                        auctionSessionId={item.id}
                      />
                      <Box display="flex" alignItems="center">
                        <Chip
                          icon={<Whatshot />}
                          label={`${totalBidder} người tham gia`}
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              ) : (
                renderWinnerSection()
              )}

              <Divider sx={{ my: 3 }} />


              <Box display="flex" alignItems="center" justifyContent="center">
                {item.status === 'ONGOING' ? (
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6" mb={1}>
                      Thời gian còn lại:
                    </Typography>
                    <Chip
                      icon={<AccessTime />}
                      label={<Countdown date={new Date(item.endTime)} renderer={renderCountdown} />}
                      color="primary"
                      sx={{ fontSize: '1.2rem', py: 2, px: 3 }}
                    />
                  </Box>
                ) : (
                  <Typography variant="h6" color="error" align="center">
                    Phiên đấu giá đã kết thúc
                  </Typography>
                )}
              </Box>

            </Grid>
          </Grid>
          <Divider sx={{ my: 6 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Mô tả
          </Typography>
          <Box sx={{ p: 3, mb: 1, borderRadius: 2 }}>
            <Typography variant="h6">
              Thông tin phiên
            </Typography>
            <Typography paragraph dangerouslySetInnerHTML={{ __html: item.description }} />
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6">
              Thông tin vật phẩm
            </Typography>
            <Typography paragraph dangerouslySetInnerHTML={{ __html: item.asset.assetDescription }} />
          </Box>

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
      </Container>
    </ThemeProvider>
  )
}

export default SessionDetail