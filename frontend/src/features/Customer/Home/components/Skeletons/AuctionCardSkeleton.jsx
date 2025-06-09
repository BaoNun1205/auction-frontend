import React from 'react'
import { Box, Card, CardContent, Skeleton, Divider } from '@mui/material'

function AuctionCardSkeleton() {
  return (
    <Card
      sx={{
        position: 'relative',
        minWidth: 300,
        maxWidth: 300,
        flexShrink: 0
      }}
    >
      {/* Status chips skeleton */}
      <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
        <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 12 }} />
      </Box>

      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
      </Box>

      {/* Image skeleton */}
      <Skeleton variant="rectangular" height={200} />

      <CardContent>
        {/* Title skeleton */}
        <Box sx={{ mb: 1 }}>
          <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 0.5 }} />
          <Skeleton variant="text" sx={{ fontSize: '1.25rem', width: '70%' }} />
        </Box>

        {/* Time info skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Skeleton variant="circular" width={16} height={16} sx={{ mr: 0.5 }} />
          <Skeleton variant="text" width={120} />
        </Box>

        {/* Progress bar skeleton */}
        <Skeleton variant="rectangular" height={6} sx={{ mb: 2, borderRadius: 3 }} />

        <Divider sx={{ mb: 2 }} />

        {/* Price info skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Skeleton variant="text" width={80} />
          <Skeleton variant="text" width={100} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton variant="text" width={90} />
          <Skeleton variant="text" width={120} />
        </Box>

        {/* Button skeleton */}
        <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 1 }} />
      </CardContent>
    </Card>
  )
}

export default AuctionCardSkeleton
