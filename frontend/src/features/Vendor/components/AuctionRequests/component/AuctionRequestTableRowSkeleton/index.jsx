import React from 'react'
import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(180, 23, 18, 0.08)',
  border: '1px solid rgba(180, 23, 18, 0.1)'
})

const AuctionRequestTableRowSkeleton = () => {
  return (
    <TableRow hover>
      {/* Image skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: '8px' }} animation="wave" />
      </TableCell>

      {/* Request info skeleton */}
      <TableCell sx={{ maxWidth: 350, padding: '16px' }}>
        <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
      </TableCell>

      {/* Starting price skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="text" width={120} height={24} animation="wave" />
      </TableCell>

      {/* Status skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="rounded" width={100} height={24} sx={{ borderRadius: '16px' }} animation="wave" />
      </TableCell>

      {/* Creation date skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="text" width={80} height={20} animation="wave" />
      </TableCell>

      {/* Actions skeleton */}
      <TableCell align="center" sx={{ padding: '16px' }}>
        <Skeleton variant="circular" width={32} height={32} animation="wave" />
      </TableCell>
    </TableRow>
  )
}

const AuctionRequestSkeleton = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '40%', mb: 1 }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: '1.2rem', width: '60%' }} animation="wave" />
      </Box>

      {/* Status chips skeleton */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map((index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={140}
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
            {/* Filter dropdown skeleton */}
            <Skeleton
              variant="rounded"
              width={{ xs: '100%', sm: 200 }}
              height={56}
              sx={{ borderRadius: '12px' }}
              animation="wave"
            />
          </Box>
          {/* Create button skeleton */}
          <Skeleton variant="rounded" width={160} height={48} sx={{ ml: 2, borderRadius: '12px' }} animation="wave" />
        </Box>

        {/* Table skeleton */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            flex: 1,
            overflow: 'auto',
            maxHeight: 'calc(100vh - 350px)',
            borderRadius: '12px',
            border: '1px solid rgba(180, 23, 18, 0.2)'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {['Hình ảnh', 'Thông tin yêu cầu', 'Giá khởi điểm', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map(
                  (header, index) => (
                    <TableCell
                      key={header}
                      align={index === 5 ? 'center' : 'left'}
                      sx={{ fontWeight: '600', fontSize: '0.875rem' }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Render multiple skeleton rows */}
              {[1, 2, 3, 4, 5].map((index) => (
                <AuctionRequestTableRowSkeleton key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </Box>
  )
}

export default AuctionRequestSkeleton
