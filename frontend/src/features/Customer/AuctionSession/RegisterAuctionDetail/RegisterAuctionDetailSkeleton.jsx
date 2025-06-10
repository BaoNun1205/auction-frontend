import React from 'react'
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  IconButton,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { StyledCard, StyledIconButton } from './style'

const RegisterAuctionDetailSkeleton = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3 }, pt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Breadcrumb Skeleton */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton width={60} height={24} />
            <Typography variant="body2" color="text.secondary">
              /
            </Typography>
            <Skeleton width={120} height={24} />
            <Typography variant="body2" color="text.secondary">
              /
            </Typography>
            <Skeleton width={80} height={24} />
          </Stack>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          {/* Image Gallery Skeleton */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={{ xs: 300, sm: 400, md: 500, lg: 600 }}
                sx={{
                  height: { xs: 300, sm: 400, md: 500, lg: 600 },
                  borderRadius: 1
                }}
              />
            </StyledCard>

            {/* Thumbnail Navigation Skeleton */}
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2 }}
              sx={{ mt: { xs: 2, sm: 4 } }}
              alignItems="center"
              justifyContent="center"
            >
              <StyledIconButton disabled aria-label="Previous image">
                <ArrowBackIosNewIcon />
              </StyledIconButton>

              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={isMobile ? 60 : 80}
                  height={isMobile ? 60 : 80}
                  sx={{ borderRadius: 1 }}
                />
              ))}

              <StyledIconButton disabled aria-label="Next image">
                <ArrowForwardIosIcon />
              </StyledIconButton>
            </Stack>
          </Grid>

          {/* Details Skeleton */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 4 } }}>
              {/* Title and Share Button */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Skeleton
                  variant="text"
                  width="70%"
                  height={60}
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                  }}
                />
                <Stack direction="row" spacing={1}>
                  <IconButton disabled aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Vendor Info Skeleton */}
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width={120} height={32} />
                <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 10 }} />
              </Stack>

              {/* Description Skeleton */}
              <Stack spacing={1} mb={2}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="85%" height={20} />
              </Stack>

              <Divider sx={{ my: 4 }} />

              {/* Price Information Skeleton */}
              <Stack spacing={3}>
                <Box>
                  <Skeleton variant="text" width={80} height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={120} height={32} />
                </Box>

                <Box>
                  <Skeleton variant="text" width={100} height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={150} height={40} />
                </Box>

                {/* Stats Skeleton */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    <Skeleton variant="text" width={120} height={32} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon />
                    <Skeleton variant="text" width={150} height={32} />
                  </Box>
                </Stack>

                {/* Action Button Skeleton */}
                <Box sx={{ mt: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    width={isMobile ? '100%' : 150}
                    height={48}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RegisterAuctionDetailSkeleton
