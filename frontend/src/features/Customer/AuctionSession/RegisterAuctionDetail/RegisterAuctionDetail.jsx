import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Tooltip,
  Chip,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { StyledCard, ThumbnailImage, StyledButton, StyledIconButton } from './style'
import {
  useCheckRegisted,
  useGetSessionById,
  useGetUsersRegisted,
  useRegisterSession,
  useUnregisterSession
} from '~/hooks/sessionHook'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '~/store/appStore'
import Breadcrumb from '~/components/Customer/BreadcrumbComponent'
import Authentication from '~/features/Authentication'
import AppModal from '~/components/Modal/Modal'

const RegisterAuctionDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [optimisticUserCount, setOptimisticUserCount] = useState(0)
  const [optimisticIsChecked, setOptimisticIsChecked] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { auth } = useAppStore()
  const currentUserId = auth.user?.id
  const { id } = useParams()
  const navigate = useNavigate() // Khởi tạo useNavigate
  const authModalRef = useRef(null)
  const { data: session, refetch, isLoading, isError } = useGetSessionById(id)
  const { data: usersRegisted } = useGetUsersRegisted(id)
  const { mutate: registerSession } = useRegisterSession()
  const { mutate: unregisterSession } = useUnregisterSession()
  const { data: isChecked } = useCheckRegisted({ auctionSessionId: id, userId: currentUserId })

  // Đồng bộ optimisticUserCount với dữ liệu từ server khi usersRegisted thay đổi
  useEffect(() => {
    if (Array.isArray(usersRegisted)) {
      setOptimisticUserCount(usersRegisted.length)
    }
  }, [usersRegisted])

  // Đồng bộ optimisticIsChecked với isChecked từ server
  useEffect(() => {
    setOptimisticIsChecked(!!isChecked)
  }, [isChecked])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (isError) {
    return <Typography>Error loading session</Typography>
  }

  const listUser = Array.isArray(usersRegisted) ? usersRegisted : []
  const listImages = Array.isArray(session.asset.listImages) ? session.asset.listImages : []

  const handleThumbnailClick = (index) => {
    setSelectedImage(index)
  }

  const handlePrevClick = () => {
    setSelectedImage((prevSelected) =>
      prevSelected > 0 ? prevSelected - 1 : listImages.length - 1
    )
  }

  const handleNextClick = () => {
    setSelectedImage((prevSelected) =>
      prevSelected < listImages.length - 1 ? prevSelected + 1 : 0
    )
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(',', '')
  }

  const handleRegisterClick = () => {
    if (!auth.isAuth || !auth.user?.id) {
      authModalRef.current?.click()
      return
    }
    
    setOptimisticUserCount((prev) => prev + 1)
    setOptimisticIsChecked(true)
    setSnackbar({ open: true, message: 'Đang xử lý đăng ký...', severity: 'info' })

    registerSession(
      { userId: currentUserId, auctionSessionId: session.id },
      {
        onSuccess: () => {
          refetch()
          setSnackbar({ open: true, message: 'Đăng ký phiên đấu giá thành công', severity: 'success' })
        },
        onError: (error) => {
          setOptimisticUserCount((prev) => prev - 1)
          setOptimisticIsChecked(false)
          console.error('Error registering session:', error)
          setSnackbar({ open: true, message: 'Đăng ký phiên đấu giá thất bại', severity: 'error' })
        }
      }
    )
  }

  const handleUnregisterClick = () => {
    setOptimisticUserCount((prev) => Math.max(0, prev - 1))
    setOptimisticIsChecked(false)
    setSnackbar({ open: true, message: 'Đang xử lý hủy đăng ký...', severity: 'info' })

    unregisterSession(
      { userId: currentUserId, auctionSessionId: session.id },
      {
        onSuccess: () => {
          refetch()
          setSnackbar({ open: true, message: 'Hủy đăng ký phiên đấu giá thành công', severity: 'success' })
        },
        onError: (error) => {
          setOptimisticUserCount((prev) => prev + 1)
          setOptimisticIsChecked(true)
          console.error('Error unregistering session:', error)
          setSnackbar({ open: true, message: 'Hủy đăng ký phiên đấu giá thất bại', severity: 'error' })
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

  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Phiên đấu giá sắp diễn ra', path: '/upcoming' },
    { label: 'Chi tiết' }
  ]

  return (
    <>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3 }, pt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <Box
                component="img"
                src={session.asset.listImages[selectedImage].imageAsset}
                alt={`${session.name} - Image ${selectedImage + 1}`}
                sx={{
                  width: '100%',
                  height: { xs: 300, sm: 400, md: 500, lg: 600 },
                  objectFit: 'cover',
                  transition: 'all 0.3s ease'
                }}
              />
            </StyledCard>

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2 }}
              sx={{ mt: { xs: 2, sm: 4 } }}
              alignItems="center"
              justifyContent="center"
            >
              <StyledIconButton onClick={handlePrevClick} aria-label="Previous image">
                <ArrowBackIosNewIcon />
              </StyledIconButton>
              {session.asset.listImages.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image.imageAsset}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(index)}
                  selected={selectedImage === index}
                  aria-label={`Select image ${index + 1}`}
                />
              ))}
              <StyledIconButton onClick={handleNextClick} aria-label="Next image">
                <ArrowForwardIosIcon />
              </StyledIconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 4 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
                >
                  {session.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {/* <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                    <IconButton
                      onClick={() => setIsFavorite(!isFavorite)}
                      sx={{ color: isFavorite ? '#B41712' : 'inherit' }}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip> */}
                  <Tooltip title="Share">
                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Box
                  component="img"
                  src={session.asset.vendor.avatar || '/placeholder-avatar.jpg'}
                  alt={session.asset.vendor.username}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <Typography variant="h6" color="text.secondary">
                  {session.asset.vendor.username}
                </Typography>
                <Chip label="Đã kiểm duyệt" sx={{ backgroundColor: '#B41712', color: 'white' }} size="small" />
              </Stack>

              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                dangerouslySetInnerHTML={{ __html: session.description }}
              />

              <Divider sx={{ my: 4 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Giá cọc
                  </Typography>
                  <Typography variant="h5" fontWeight="medium">
                    {session.depositAmount.toLocaleString('vi-VN')} ₫
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Giá khởi điểm
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#B41712' }} fontWeight="bold">
                    {session.startingBids.toLocaleString('vi-VN')} ₫
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    <Typography variant="h6">{optimisticUserCount} người đăng ký</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon />
                    <Typography variant="h6">{formatDateTime(session.endTime)}</Typography>
                  </Box>
                </Stack>

                {auth.user?.id && currentUserId !== session.asset.vendor.userId && (
                  <StyledButton
                    onClick={optimisticIsChecked ? handleUnregisterClick : handleRegisterClick}
                    sx={{ width: { xs: '100%', sm: 'auto' }, alignSelf: 'flex-start' }}
                  >
                    {optimisticIsChecked ? 'Hủy đăng ký' : 'Đăng ký'}
                  </StyledButton>
                )}

                {!auth.user?.id && (
                  <StyledButton
                    onClick={handleRegisterClick}
                    sx={{ width: { xs: '100%', sm: 'auto' }, alignSelf: 'flex-start' }}
                  >
                    Đăng ký
                  </StyledButton>
                )}

                {/* Authentication Modal */}
                <AppModal
                  trigger={
                    <div ref={authModalRef} style={{ display: 'none' }}>
                      Hidden Trigger
                    </div>
                  }
                  maxWidth="500px"
                >
                  <Box sx={{ pt: 2 }}>
                    <Authentication />
                  </Box>
                </AppModal>

                <Snackbar
                  open={snackbar.open}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                  </Alert>
                </Snackbar>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RegisterAuctionDetail