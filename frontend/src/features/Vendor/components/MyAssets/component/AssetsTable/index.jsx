import React, { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TablePagination
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { StyledSpan } from '~/features/style'

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#1a1a1a',
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
})

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  minWidth: 120,
  color: theme.palette.getContrastText(
    status === 'ONGOING' ? theme.palette.warning.main :
      status === 'AUCTION_SUCCESS' ? theme.palette.success.main :
        status === 'AUCTION_FAILED' ? theme.palette.error.main :
          theme.palette.info.main
  ),
  backgroundColor:
    status === 'ONGOING' ? theme.palette.warning.main :
      status === 'AUCTION_SUCCESS' ? theme.palette.success.main :
        status === 'AUCTION_FAILED' ? theme.palette.error.main :
          theme.palette.info.main
}))

const AssetTable = ({ filteredAssets, handleMenuOpen }) => {

  const getStatusLabel = (status) => {
    switch (status) {
    case 'NOT_AUCTIONED':
      return 'Chưa đấu giá'
    case 'ONGOING':
      return 'Đang đấu giá'
    case 'AUCTION_SUCCESS':
      return 'Đã đấu giá thành công'
    case 'AUCTION_FAILED':
      return 'Đấu giá thất bại'
    default:
      return status
    }
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Vật phẩm</StyledTableCell>
              <StyledTableCell>Giá khởi điểm</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.length > 0 ? (
              paginatedAssets.map((asset) => (
                <TableRow key={asset.assetId} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={asset.mainImage}
                        sx={{ width: 48, height: 48, borderRadius: 1, mr: 2 }}
                      />
                      <Box>
                        <StyledSpan>{asset.assetName}</StyledSpan>
                        <Box sx={{ color: '#637381' }}>{asset.type.typeName || 'N/A'}</Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>{asset.assetPrice.toLocaleString('vi-VN')} ₫</TableCell>
                  <TableCell>
                    <StyledChip
                      label={getStatusLabel(asset.status)}
                      status={asset.status}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, asset)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1">Không có vật phẩm nào</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredAssets.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </Box>
  )
}

export default AssetTable