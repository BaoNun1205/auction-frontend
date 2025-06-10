import React from 'react'
import { Box, Container, Paper, Skeleton } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Paper)({
  display: 'flex',
  marginBottom: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(180, 23, 18, 0.08)',
  border: '1px solid rgba(180, 23, 18, 0.1)'
})

const WonItemsSkeleton = () => {
  // Create array for skeleton items
  const skeletonItems = Array.from({ length: 4 }, (_, index) => index)
  const skeletonTabs = Array.from({ length: 6 }, (_, index) => index)

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', py: 4 }}>
        {/* Header Section Skeleton */}
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={300} height={48} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={400} height={24} />
        </Box>

        {/* Filter Tabs Skeleton */}
        <Paper elevation={0} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {skeletonTabs.map((index) => (
              <Skeleton key={index} variant="rectangular" width={120} height={32} sx={{ borderRadius: '20px' }} />
            ))}
          </Box>
        </Paper>

        {/* Items List Skeleton */}
        <Box sx={{ mt: 3, maxHeight: '600px', overflowY: 'auto' }}>
          {skeletonItems.map((index) => (
            <StyledCard key={index}>
              {/* Image Skeleton */}
              <Box sx={{ position: 'relative', width: 208, height: 208, m: 1 }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 2
                  }}
                />
              </Box>

              {/* Content Skeleton */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                <Box sx={{ flex: '1 0 auto', p: 0 }}>
                  {/* Title Skeleton */}
                  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />

                  {/* Price Skeleton */}
                  <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />

                  {/* Time Skeleton */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width="70%" height={20} />
                  </Box>

                  {/* Status Chip Skeleton */}
                  <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: '16px' }} />
                </Box>

                {/* Action Buttons Skeleton */}
                <Box sx={{ mt: 'auto', justifyContent: 'flex-end', p: 0, gap: 1, display: 'flex' }}>
                  <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: '8px', mt: 2 }} />
                  <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: '8px', mt: 2 }} />
                </Box>
              </Box>
            </StyledCard>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default WonItemsSkeleton
