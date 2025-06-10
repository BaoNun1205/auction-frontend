import React from 'react'
import { Box, Skeleton } from '@mui/material'

export function VendorInformationSkeleton() {
  return (
    <Box
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
      }}
    >
      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
        {/* Profile Section */}
        <Box
          display="flex"
          alignItems="flex-start"
          gap={3}
          sx={{
            minWidth: { xs: 'auto', lg: 420 },
            width: { xs: '100%', lg: 'auto' }
          }}
        >
          <Skeleton variant="circular" width={100} height={100} />
          <Box flex={1}>
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />
            <Box display="flex" gap={2}>
              <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>
        </Box>

        {/* Statistics Section */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap={3}
          sx={{ flex: 1 }}
        >
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: { xs: 1, sm: 2 },
                minHeight: 80,
                borderLeft: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={60} height={24} />
              {index === 0 && <Skeleton variant="text" width={100} height={20} sx={{ mt: 0.5 }} />}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
