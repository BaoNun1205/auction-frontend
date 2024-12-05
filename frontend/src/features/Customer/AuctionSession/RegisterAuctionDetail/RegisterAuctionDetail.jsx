import React, { useEffect, useState } from 'react'
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
  Skeleton
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { StyledCard, ThumbnailImage, StyledButton, StyledIconButton } from './style'
import { useGetSessionById } from '~/hooks/sessionHook'
import { useParams } from 'react-router-dom'

const RegisterAuctionDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { id } = useParams()
  const { data: session, refetch, isLoading, isError } = useGetSessionById(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading session</Typography>;
  }

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
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(',', '');
  };

  const handleRegisterClick = () => {
    // Add your registration logic here
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
                transition: 'all 0.3s ease',
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
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                {session.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    sx={{ color: isFavorite ? '#B41712' : 'inherit' }}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
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
              <Chip
                label="Đã kiểm duyệt"
                sx={{ backgroundColor: '#B41712', color: 'white' }}
                size="small"
              />
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
                  <Typography variant="h6">{session.biddersCount || 8} bidders</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon />
                  <Typography variant="h6">{formatDateTime(session.endTime)}</Typography>
                </Box>
              </Stack>

              <StyledButton onClick={handleRegisterClick} sx={{ width: { xs: '100%', sm: 'auto' }, padding: '8px 16px', fontSize: '0.875rem', alignSelf: 'flex-start' }}>
                Đăng ký
              </StyledButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterAuctionDetail

