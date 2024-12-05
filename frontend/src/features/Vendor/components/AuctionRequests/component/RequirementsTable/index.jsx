import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { StyledChip, StyledTableCell } from '../../style'

const RequirementsTable = ({ filteredRequirements, handleMenuOpen }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const paginatedRequirements = filteredRequirements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên vật phẩm</StyledTableCell>
              <StyledTableCell>Giá khởi điểm</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRequirements.length > 0 ? (
              paginatedRequirements.map((req) => (
                <TableRow key={req.requirementId}>
                  <TableCell>{req.assetName}</TableCell>
                  <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>{`${req.assetPrice.toLocaleString('vi-VN')}`} ₫</TableCell>
                  <TableCell>
                    <StyledChip
                      label={req.status === '0' ? 'Đang chờ duyệt' : req.status === '1' ? 'Đang xử lý' : 'Đã từ chối'}
                      status={req.status}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, req)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1">Không có yêu cầu nào</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRequirements.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </Box>
  )
}

export default RequirementsTable

