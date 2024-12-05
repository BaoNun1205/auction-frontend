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
  styled,
  TablePagination
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#1a1a1a',
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
})

const SessionsTable = ({ filteredSessions, handleMenuOpen }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const paginatedSessions = filteredSessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
    case 'ONGOING':
      return 'warning'
    case 'UPCOMING':
      return 'info'
    case 'AUCTION_SUCCESS':
      return 'success'
    case 'AUCTION_FAILED':
      return 'error'
    default:
      return 'default'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
    case 'ONGOING':
      return 'Đang diễn ra'
    case 'UPCOMING':
      return 'Sắp diễn ra'
    case 'AUCTION_SUCCESS':
      return 'Đấu giá thành công'
    case 'AUCTION_FAILED':
      return 'Đấu giá thất bại'
    default:
      return 'Không xác định'
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên phiên đấu giá</StyledTableCell>
                <StyledTableCell>Thời gian bắt đầu</StyledTableCell>
                <StyledTableCell>Thời gian kết thúc</StyledTableCell>
                <StyledTableCell>Giá khởi điểm</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Hành động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSessions.length > 0 ? (
                paginatedSessions.map((session) => (
                  <TableRow key={session.auctionSessionId}>
                    <TableCell>{session.name}</TableCell>
                    <TableCell>
                      {format(new Date(session.startTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </TableCell>
                    <TableCell>
                      {format(new Date(session.endTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </TableCell>
                    <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>
                      {session.startingBids.toLocaleString('vi-VN')} ₫
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(session.status)}
                        color={getStatusColor(session.status)}
                        sx={{
                          '& .MuiChip-label': {
                            fontWeight: 500
                          },
                          minWidth: 120
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleMenuOpen(e, session)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1">Không có phiên đấu giá nào</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredSessions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </LocalizationProvider>
  )
}

export default SessionsTable