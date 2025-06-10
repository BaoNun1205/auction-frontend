import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Skeleton } from '@mui/material'

export function RelatedPaintingsSkeleton() {
  return (
    <Box my={6}>
      <Skeleton variant="text" sx={{ fontSize: '2rem', width: 400 }} />
      <Box position="relative">
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card sx={{ height: '100%' }}>
                <Box position="relative">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={24}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      borderRadius: 4
                    }}
                  />
                </Box>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
                  <Box mt={2}>
                    <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="50%" height={24} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
