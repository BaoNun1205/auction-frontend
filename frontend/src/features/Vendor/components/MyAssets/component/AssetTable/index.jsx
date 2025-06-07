import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const DescriptionCell = styled(Box)({
  maxWidth: '300px',
  '& .description-content': {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.875rem',
    color: '#666',
    lineHeight: 1.4,
    '& p': {
      margin: '0 !important',
      padding: '0 !important',
      fontSize: 'inherit !important',
      color: 'inherit !important'
    },
    '& *': {
      fontSize: 'inherit !important',
      color: 'inherit !important',
      margin: '0 !important',
      padding: '0 !important'
    }
  }
})

const getStatusLabel = (status) => {
  switch (status) {
  case 'NOT_AUCTIONED':
    return 'Chưa đấu giá'
  case 'ONGOING':
    return 'Đang đấu giá'
  case 'AUCTION_SUCCESS':
    return 'Đấu giá thành công'
  case 'PAYMENT_SUCCESSFUL':
    return 'Đã thanh toán'
  case 'DELIVERING':
    return 'Đang giao hàng'
  case 'RECEIVED':
    return 'Đã nhận hàng'
  case 'COMPLETED':
    return 'Hoàn thành'
  case 'AUCTION_FAILED':
    return 'Đấu giá thất bại'
  case 'CANCELED':
    return 'Đã hủy'
  default:
    return status
  }
}

const getStatusColor = (status) => {
  switch (status) {
  case 'NOT_AUCTIONED':
    return 'default'
  case 'ONGOING':
    return 'warning'
  case 'AUCTION_SUCCESS':
    return 'success'
  case 'PAYMENT_SUCCESSFUL':
    return 'info'
  case 'DELIVERING':
    return 'primary'
  case 'RECEIVED':
    return 'success'
  case 'COMPLETED':
    return 'success'
  case 'AUCTION_FAILED':
    return 'error'
  case 'CANCELED':
    return 'error'
  default:
    return 'default'
  }
}

const AssetTable = ({ filteredAssets, handleMenuOpen }) => (
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
          {['Hình ảnh', 'Thông tin vật phẩm', 'Giá khởi điểm', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map((header, index) => (
            <TableCell
              key={header}
              align={index === 5 ? 'center' : 'left'}
              sx={{ fontWeight: '600', fontSize: '0.875rem' }}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredAssets.map((asset) => (
          <TableRow key={asset.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.05)' } }}>
            <TableCell sx={{ padding: '16px' }}>
              <Box
                component="img"
                src={asset.mainImage || '/placeholder.svg?height=80&width=80'}
                alt={asset.assetName}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid rgba(180, 23, 18, 0.2)'
                }}
              />
            </TableCell>
            <TableCell sx={{ maxWidth: 350, padding: '16px' }}>
              <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1, color: '#1a1a1a' }}>
                {asset.assetName}
              </Typography>
              <DescriptionCell>
                <div
                  className="description-content"
                  dangerouslySetInnerHTML={{
                    __html: asset.assetDescription || 'Không có mô tả'
                  }}
                />
              </DescriptionCell>
            </TableCell>
            <TableCell sx={{ padding: '16px' }}>
              <Typography variant="body1" fontWeight="600" sx={{ color: '#b41712' }}>
                {asset.assetPrice?.toLocaleString('vi-VN')}₫
              </Typography>
            </TableCell>
            <TableCell sx={{ padding: '16px' }}>
              <Chip
                label={getStatusLabel(asset.status)}
                color={getStatusColor(asset.status)}
                size="small"
                variant="filled"
                sx={{ borderRadius: '16px', fontWeight: '500' }}
              />
            </TableCell>
            <TableCell sx={{ padding: '16px' }}>
              <Typography variant="body2" color="text.secondary">
                {new Date(asset.createdAt).toLocaleDateString('vi-VN')}
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px' }}>
              <IconButton
                onClick={(e) => handleMenuOpen(e, asset)}
                size="small"
                sx={{
                  backgroundColor: 'rgba(180, 23, 18, 0.1)',
                  color: '#b41712',
                  '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.2)' }
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        {filteredAssets.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
              <Typography variant="body1" color="text.secondary">
                Không tìm thấy vật phẩm nào
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

export default AssetTable