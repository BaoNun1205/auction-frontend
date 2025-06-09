import React from 'react'
import { Box, Container, Skeleton } from '@mui/material'
import AuctionCardSkeleton from './AuctionCardSkeleton'

function UpcomingAuctionsSkeleton() {
  return (
    <Box sx={{ py: 6, bgcolor: '#fef7f7' }}>
      <Container maxWidth="lg">
        {/* Header skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: 200, mr: 2 }} />
            <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: 12 }} />
          </Box>
          <Skeleton variant="text" width={100} />
        </Box>

        {/* Cards skeleton */}
        <Box sx={{ position: 'relative' }}>
          {/* Navigation buttons skeleton */}
          <Skeleton
            variant="circular"
            width={48}
            height={48}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}
          />

          <Skeleton
            variant="circular"
            width={48}
            height={48}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}
          />

          {/* Scrollable cards container skeleton */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'hidden',
              pb: 2,
              mx: 2
            }}
          >
            {/* Render 4 skeleton cards */}
            {Array.from({ length: 4 }).map((_, index) => (
              <AuctionCardSkeleton key={index} />
            ))}
          </Box>
        </Box>

        {/* Mobile scroll indicator skeleton */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            mt: 2
          }}
        >
          <Skeleton variant="text" width={150} />
        </Box>
      </Container>
    </Box>
  )
}

export default UpcomingAuctionsSkeleton
