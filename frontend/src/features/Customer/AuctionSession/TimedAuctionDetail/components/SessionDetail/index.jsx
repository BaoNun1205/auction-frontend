import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
  Box,
  Typography,
  Card,
  Chip,
  Divider,
  Grid,
  CardContent,
  Fade,
  Button,
  Snackbar,
  Alert,
  ThemeProvider,
  Container,
  Tooltip,
  IconButton
} from '@mui/material'
import { AccessTime, Whatshot, AutoAwesome, AutoAwesomeMosaic } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { useAppStore } from '~/store/appStore'
import { useNavigate } from 'react-router-dom'
import { primaryColor } from './style'
import { useCreateAuctionHistory, useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook'
import AppModal from '~/components/Modal/Modal'
import PlaceBidForm from './components/PlaceBidForm'
import VendorInformation from '../VendorInfomation'
import { connectWebSocket, sendMessage } from '~/service/webSocketService'
import Countdown from 'react-countdown'
import PlaceDepositForm from './components/PlaceDepositForm'
import AuctionHistoryDialog from './components/AuctionHistoryDialog'
import { useCheckDeposit, useCreateDeposit } from '~/hooks/depositHook'
import Authentication from '~/features/Authentication'
import AutoBidForm from './components/AutoBidForm'
import { useCreateAutoBid, useCheckAutoBid, useGetAutoBid, useUpdateAutoBid } from '~/hooks/autoBidHook'
import AutoBidDialog from './components/AutoBidDialog'
import Breadcrumb from './components/Breadcrumb'
import ImageGallery from './components/ImageGallery'
import customTheme from './components/theme'
import WinnerSection from './components/WinnerSection'
import DescriptionSection from './components/DescriptionSection'

const SessionDetail = ({ item, refresh }) => {
  const theme = useTheme()
  const { auth } = useAppStore()
  const navigate = useNavigate()
  const [mainImage, setMainImage] = useState(item.asset?.mainImage || 'https://via.placeholder.com/400')
  const [highestBid, setHighestBid] = useState(item?.auctionSessionInfo?.highestBid)
  const [totalBidder, setTotalBidder] = useState(item?.auctionSessionInfo?.totalBidder)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [autoBidDialogOpen, setAutoBidDialogOpen] = useState(false)
  const [totalAuctionHistory, setTotalAuctionHistory] = useState(item?.auctionSessionInfo?.totalAuctionHistory)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const { mutate: createAuctionHistory } = useCreateAuctionHistory()
  const { mutate: createDeposit } = useCreateDeposit()
  const { mutate: createAutoBid } = useCreateAutoBid()
  const { mutate: updateAutoBid } = useUpdateAutoBid()
  const {
    data: isDeposit,
    refetch: refetchIsDeposit,
    error: depositError,
    isLoading: depositLoading
  } = useCheckDeposit({ userId: auth.user.id, auctionSessionId: item.id })
  const {
    data: isAutoBid,
    refetch: refetchAutoBid,
    error: autoBidError,
    isLoading: autoBidLoading
  } = useCheckAutoBid({ userId: auth.user.id, auctionSessionId: item.id })
  const { data: autoBidData, refetch: refetchAutoBidData } = useGetAutoBid({
    userId: auth.user.id,
    auctionSessionId: item.id
  })

  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(item.id)
  const auctionHistory = Array.isArray(data) ? data : []

  const isVendor = item.asset.vendor.userId === auth.user.id
  const [openModal, setOpenModal] = React.useState(false)
  const [openAutoBidModal, setOpenAutoBidModal] = React.useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleOpenAutoBidModal = () => setOpenAutoBidModal(true)
  const handleCloseAutoBidModal = () => setOpenAutoBidModal(false)

  const placeholderImage = 'https://via.placeholder.com/150'

  const handleThumbnailClick = (image) => {
    setMainImage(image)
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleOpenHistoryDialog = () => {
    console.log('History dialog opened')
    setHistoryDialogOpen(true)
  }

  const handleCloseHistoryDialog = () => {
    setHistoryDialogOpen(false)
  }

  const handleOpenAutoBidDialog = () => {
    setAutoBidDialogOpen(true)
  }

  const handleCloseAutoBidDialog = () => {
    setAutoBidDialogOpen(false)
  }

  const cleanupRef = useRef(null)

  useEffect(() => {
    if (item.status !== 'ONGOING') {
      refetchIsDeposit()
      refetchAutoBid()
    }
  }, [item.status])

  const onMessage = useCallback((message) => {
    const response = JSON.parse(message.body)
    if (response.code === 200 && response.result) {
      const { auctionSessionInfo } = response.result
      setTotalBidder(auctionSessionInfo.totalBidder)
      setTotalAuctionHistory(auctionSessionInfo.totalAuctionHistory)
      setHighestBid(auctionSessionInfo.highestBid)

      refreshHistory()
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const destination = `/rt-product/bidPrice-update/${item.id}`

    // Nếu không còn ONGOING thì cleanup và return sớm
    if (item.status !== 'ONGOING') {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
      return
    }

    // Cleanup trước khi kết nối mới
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }

    // Kết nối WebSocket và lưu cleanup function khi thành công
    connectWebSocket(auth.token, destination, onMessage)
      .then((cleanup) => {
        if (isMounted && typeof cleanup === 'function') {
          cleanupRef.current = cleanup
        }
      })
      .catch((error) => {
        console.error('WebSocket connection error:', error)
      })

    // Cleanup khi component unmount hoặc dependencies thay đổi
    return () => {
      isMounted = false
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [auth.token, item.id, item.status, onMessage])

  const handleBidPrice = () => {
    if (item.status === 'ONGOING') {
      sendMessage(`/app/rt-auction/placeBid/${item.id}`, {})
    }
  }

  const handleSubmitPrice = (bidPrice) => {
    const auctionHistory = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      bidPrice: bidPrice
    }
    createAuctionHistory(auctionHistory, {
      onSuccess: (data) => {
        if (data?.code === 400) {
          // Kiểm tra lỗi API
          setSnackbar({
            open: true,
            message: data.message,
            severity: 'error'
          })
          return
        }

        handleBidPrice()
        refresh()
        refreshHistory()
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: error.message,
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

  const handleSubmitAutoBid = (maxBid, bidIncre) => {
    var autoBid = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      maxBidPrice: maxBid,
      bidIncrement: bidIncre
    }
    createAutoBid(autoBid, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: 'Create auto bid successfully.',
          severity: 'info'
        })
        handleCloseAutoBidModal()
        refetchAutoBid()
        refetchAutoBidData()
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: 'Error create auto bid. Please try again.',
          severity: 'error'
        })
      }
    })
  }

  const handleUpdateAutoBid = (maxBid, bidIncre, status) => {
    var autoBid = {
      maxBidPrice: maxBid,
      bidIncrement: bidIncre,
      status: status
    }
    updateAutoBid(
      { id: autoBidData.autoBidId, payload: autoBid },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: 'Update auto bid successfully.',
            severity: 'info'
          })
          handleCloseAutoBidDialog()
          refetchAutoBid()
          refetchAutoBidData()
        },
        onError: (error) => {
          setSnackbar({
            open: true,
            message: 'Error update auto bid. Please try again.',
            severity: 'error'
          })
        }
      }
    )
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth="lg">
        <Box mb={6}>
          <Breadcrumb item={item} />
          <Grid container spacing={4}>
            <ImageGallery
              mainImage={mainImage}
              images={item.asset?.listImages}
              itemName={item.name}
              onThumbnailClick={handleThumbnailClick}
            />

            <Grid item xs={12} md={5}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {item.name}
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Giá khởi điểm:{' '}
                  <span style={{ fontWeight: 'bold', color: primaryColor }}>
                    {item.startingBids.toLocaleString('vi-VN')} VND
                  </span>
                </Typography>
                <Chip icon={<AccessTime />} label={new Date(item.endTime).toLocaleString('vi-VN')} variant="outlined" />
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
                              color: isDeposit || isVendor ? primaryColor : 'gray',
                              cursor: isDeposit || isVendor ? 'pointer' : 'default',
                              textDecoration: 'underline',
                              opacity: isDeposit || isVendor ? 1 : 0.5
                            }}
                            onClick={isDeposit || isVendor ? handleOpenHistoryDialog : undefined}
                          >
                            Xem
                          </Typography>
                        </Typography>
                      </Box>
                      <Typography variant="h4" component="div" gutterBottom>
                        {highestBid.toLocaleString('vi-VN')} VND
                      </Typography>
                      {!isVendor && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
                          <AppModal
                            trigger={
                              <Button
                                variant="contained"
                                fullWidth
                                size="medium"
                                sx={{
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
                            }
                          >
                            {auth.isAuth ? (
                              !isDeposit ? (
                                <PlaceDepositForm item={item} onSubmit={handleSubmitDeposit} />
                              ) : (
                                <PlaceBidForm item={item} onSubmit={handleSubmitPrice} currentPrice={highestBid} />
                              )
                            ) : (
                              <Authentication />
                            )}
                          </AppModal>

                          <Tooltip title={isAutoBid ? 'Chỉnh sửa đấu giá tự động' : 'Thiết lập đấu giá tự động'}>
                            <Box
                              sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <IconButton
                                onClick={isAutoBid ? handleOpenAutoBidDialog : handleOpenAutoBidModal}
                                sx={{
                                  bgcolor: isAutoBid ? 'rgba(76, 175, 80, 0.1)' : 'rgba(233, 30, 99, 0.1)',
                                  color: isAutoBid ? '#4caf50' : primaryColor,
                                  border: `2px solid ${isAutoBid ? '#4caf50' : primaryColor}`,
                                  p: 1.5,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: isAutoBid ? 'rgba(76, 175, 80, 0.2)' : 'rgba(233, 30, 99, 0.2)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                  }
                                }}
                              >
                                <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>AA</Typography>
                              </IconButton>

                              {isAutoBid && (
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: -5,
                                    right: -5,
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    bgcolor: '#4caf50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid white'
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}
                                  >
                                    ✓
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Tooltip>
                        </Box>
                      )}

                      <AppModal open={openAutoBidModal} onClose={handleCloseAutoBidModal}>
                        {auth.isAuth ? (
                          !isDeposit ? (
                            <PlaceDepositForm item={item} onSubmit={handleSubmitDeposit} />
                          ) : (
                            <AutoBidForm
                              item={item}
                              onSubmit={handleSubmitAutoBid}
                              onCloseSession={handleCloseAutoBidModal}
                              flagEdit={false}
                            />
                          )
                        ) : (
                          <Authentication />
                        )}
                      </AppModal>

                      {autoBidData && (
                        <AutoBidDialog
                          autoBid={autoBidData}
                          open={autoBidDialogOpen}
                          onClose={handleCloseAutoBidDialog}
                          onEdit={handleUpdateAutoBid}
                        />
                      )}
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
                <WinnerSection
                  item={item}
                  isDeposit={isDeposit}
                  isVendor={isVendor}
                  handleOpenHistoryDialog={handleOpenHistoryDialog}
                />
              )}

              <AuctionHistoryDialog
                auctionHistory={auctionHistory}
                open={historyDialogOpen}
                onClose={handleCloseHistoryDialog}
              />

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

          <DescriptionSection item={item} />

          <VendorInformation vendorId={item.asset.vendor.userId} />
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
