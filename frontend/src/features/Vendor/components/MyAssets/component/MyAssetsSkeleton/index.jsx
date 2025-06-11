import React from 'react'
import { Box, Skeleton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(180, 23, 18, 0.08)',
  border: '1px solid rgba(180, 23, 18, 0.1)'
})

const AssetTableRowSkeleton = () => {
  return (
    <TableRow hover>
      {/* Image skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: '8px' }} animation="wave" />
      </TableCell>

      {/* Asset info skeleton */}
      <TableCell sx={{ maxWidth: 350, padding: '16px' }}>
        <Skeleton variant="text" width="75%" height={28} sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
      </TableCell>

      {/* Price skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="text" width={120} height={24} animation="wave" />
      </TableCell>

      {/* Status skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="rounded" width={110} height={24} sx={{ borderRadius: '16px' }} animation="wave" />
      </TableCell>

      {/* Creation date skeleton */}
      <TableCell sx={{ padding: '16px' }}>
        <Skeleton variant="text" width={90} height={20} animation="wave" />
      </TableCell>

      {/* Actions skeleton */}
      <TableCell align="center" sx={{ padding: '16px' }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ margin: '0 auto' }} animation="wave" />
      </TableCell>
    </TableRow>
  )
}

const MyAssetsSkeleton = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '35%', mb: 1 }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: '1.2rem', width: '55%' }} animation="wave" />
      </Box>

      {/* Status chips skeleton - 10 different status chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {[
          { width: 100 }, // Tất cả
          { width: 140 }, // Chưa đấu giá
          { width: 120 }, // Đang diễn ra
          { width: 160 }, // Đấu giá thành công
          { width: 150 }, // Thanh toán thành công
          { width: 110 }, // Đang giao
          { width: 100 }, // Đã nhận
          { width: 120 }, // Hoàn thành
          { width: 140 }, // Đấu giá thất bại
          { width: 90 } // Đã hủy
        ].map((chip, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={chip.width}
            height={32}
            sx={{ borderRadius: '20px' }}
            animation="wave"
          />
        ))}
      </Box>

      <StyledPaper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Filters skeleton */}
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
          </Box>
        </Box>

        {/* Asset table skeleton */}
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
                {['Hình ảnh', 'Thông tin vật phẩm', 'Giá', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map(
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
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <AssetTableRowSkeleton key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </Box>
  )
}

export default MyAssetsSkeleton
