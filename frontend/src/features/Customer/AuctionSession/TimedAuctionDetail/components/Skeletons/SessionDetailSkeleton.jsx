import React from 'react'
import { Box, Container, Skeleton, Grid, Card, CardContent, Divider, Typography } from '@mui/material'
import { VendorInformationSkeleton } from './VendorInformationSkeleton'

export function SessionDetailSkeleton() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box py={4}>
          {/* Breadcrumb skeleton */}
          <Box display="flex" gap={1} mb={4} alignItems="center">
            <Skeleton width={60} height={24} />
            <Skeleton width={10} height={24} />
            <Skeleton width={120} height={24} />
            <Skeleton width={10} height={24} />
            <Skeleton width={80} height={24} />
          </Box>

          <Grid container spacing={4}>
            {/* Image gallery skeleton */}
            <Grid item xs={12} md={7}>
              <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2, mb: 2 }} />
              <Box display="flex" gap={2} mt={2} overflow="hidden">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
                ))}
              </Box>
            </Grid>

            {/* Auction details skeleton */}
            <Grid item xs={12} md={5}>
              <Skeleton variant="text" width="80%" height={40} sx={{ mb: 1 }} />
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Skeleton variant="text" width="40%" height={30} />
                <Skeleton variant="rectangular" width="30%" height={30} sx={{ borderRadius: 16 }} />
              </Box>

              <Card elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Skeleton variant="text" width="60%" height={24} />
                  </Box>
                  <Skeleton variant="text" width="70%" height={40} sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
                    <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Skeleton variant="rectangular" width={150} height={32} sx={{ borderRadius: 16 }} />
                  </Box>
                </CardContent>
              </Card>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" alignItems="center" justifyContent="center">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Skeleton variant="text" width={180} height={30} sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" width={200} height={50} sx={{ borderRadius: 16 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Description section skeleton */}
          <Box mt={6}>
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 4 }} />
          </Box>

          {/* Vendor information skeleton */}
          <VendorInformationSkeleton />

          {/* Related paintings skeleton */}
          <Box my={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold" mb={3}>
              Có thể bạn quan tâm
            </Typography>
            <Grid container spacing={3}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Card>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <CardContent>
                      <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />
                      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="40%" height={24} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
