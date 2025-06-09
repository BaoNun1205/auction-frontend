import React from 'react'
import { Box, Container, Typography, Card, CardContent, Skeleton, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

function AuctionCategoriesSkeleton() {
  return (
    <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: 300 }} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              disabled
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                opacity: 0.6
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              disabled
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                opacity: 0.6
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'hidden'
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 180,
                textAlign: 'center',
                flexShrink: 0
              }}
            >
              {/* Image Skeleton */}
              <Skeleton variant="rectangular" width="100%" height={120} sx={{ bgcolor: 'grey.200' }} />

              <CardContent>
                {/* Category Name Skeleton */}
                <Skeleton
                  variant="text"
                  width="80%"
                  height={28}
                  sx={{
                    mb: 1,
                    mx: 'auto'
                  }}
                />

                {/* Item Count Skeleton */}
                <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto' }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default AuctionCategoriesSkeleton
