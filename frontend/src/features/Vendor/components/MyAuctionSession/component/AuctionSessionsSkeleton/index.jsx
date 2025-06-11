import React from 'react'
import { Box, Skeleton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { vi } from 'date-fns/locale'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(180, 23, 18, 0.12)',
  border: '1px solid rgba(180, 23, 18, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #fefefe 100%)',
  backdropFilter: 'blur(10px)'
})

const AuctionSessionsTableRowSkeleton = () => {
  return (
    <TableRow hover>
      {/* Session info skeleton */}
      <TableCell sx={{ maxWidth: 350, padding: '16px' }}>
        <Skeleton variant="text" width="80%" height={28} animation="wave" />
      </TableCell>

      {/* Starting price skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="text" width={120} height={24} animation="wave" />
      </TableCell>

      {/* Status skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="rounded" width={100} height={24} sx={{ borderRadius: '16px' }} animation="wave" />
      </TableCell>

      {/* Time skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} animation="wave" />
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
      </TableCell>

      {/* Actions skeleton */}
      <TableCell align="center" sx={{ padding: '16px' }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ margin: '0 auto' }} animation="wave" />
      </TableCell>
    </TableRow>
  )
}

const AuctionSessionsSkeleton = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box
        sx={{
          maxWidth: 1200,
          margin: 'auto',
          padding: 3,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
          minHeight: '100vh'
        }}
      >
        {/* Header skeleton */}
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '50%', mb: 1 }} animation="wave" />
          <Skeleton variant="text" sx={{ fontSize: '1.2rem', width: '70%' }} animation="wave" />
        </Box>

        {/* Status chips skeleton */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={index === 1 ? 120 : index === 2 ? 140 : index === 3 ? 180 : index === 4 ? 160 : 100}
              height={32}
              sx={{ borderRadius: '20px' }}
              animation="wave"
            />
          ))}
        </Box>

        <StyledPaper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Search and filter controls skeleton */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flex: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
              {/* Search field skeleton */}
              <Skeleton variant="rounded" height={56} sx={{ flex: 1, borderRadius: '12px' }} animation="wave" />

              {/* Price filter skeleton */}
              <Skeleton
                variant="rounded"
                width={{ xs: '100%', sm: 200 }}
                height={56}
                sx={{ borderRadius: '12px' }}
                animation="wave"
              />

              {/* Date pickers skeleton */}
              <Skeleton
                variant="rounded"
                width={{ xs: '100%', sm: 200 }}
                height={56}
                sx={{ borderRadius: '12px' }}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={{ xs: '100%', sm: 200 }}
                height={56}
                sx={{ borderRadius: '12px' }}
                animation="wave"
              />
            </Box>
          </Box>

          {/* Table skeleton */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              flex: 1,
              overflow: 'auto',
              maxHeight: 'calc(100vh - 400px)',
              borderRadius: '12px',
              border: '1px solid rgba(180, 23, 18, 0.2)'
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['Thông tin phiên', 'Giá khởi điểm', 'Trạng thái', 'Thời gian', 'Thao tác'].map((header, index) => (
                    <TableCell
                      key={header}
                      align={index === 4 ? 'center' : 'left'}
                      sx={{ fontWeight: '600', fontSize: '0.875rem' }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render multiple skeleton rows */}
                {[1, 2, 3, 4, 5].map((index) => (
                  <AuctionSessionsTableRowSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination skeleton */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderTop: '1px solid rgba(180, 23, 18, 0.1)',
              py: 2
            }}
          >
            <Skeleton variant="text" width={100} height={20} sx={{ mr: 2 }} animation="wave" />
            <Skeleton variant="rounded" width={160} height={32} animation="wave" />
          </Box>
        </StyledPaper>
      </Box>
    </LocalizationProvider>
  )
}

export default AuctionSessionsSkeleton
