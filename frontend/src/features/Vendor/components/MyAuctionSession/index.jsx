import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Select,
  MenuItem,
  IconButton,
  Menu,
  styled
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useFilterSessions } from '~/hooks/sessionHook'

const primaryColor = '#b41712'

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#1a1a1a',
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
})

// Mock data for demonstration
const mockAuctionSessions = [
  {
    id: 1,
    name: 'Đấu giá xe cổ',
    startTime: new Date('2023-06-01T10:00:00'),
    endTime: new Date('2023-06-01T18:00:00'),
    startingPrice: 100000000,
    status: 'ongoing'
  },
  {
    id: 2,
    name: 'Đấu giá tranh nghệ thuật',
    startTime: new Date('2023-06-05T14:00:00'),
    endTime: new Date('2023-06-05T20:00:00'),
    startingPrice: 50000000,
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Đấu giá đồ cổ',
    startTime: new Date('2023-05-20T09:00:00'),
    endTime: new Date('2023-05-20T17:00:00'),
    startingPrice: 75000000,
    status: 'ended'
  }
]

const AuctionSessions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [priceFilter, setPriceFilter] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  const { data: auctionSessions } = useFilterSessions()

  const filteredSessions = useMemo(() => {
    return mockAuctionSessions.filter(session => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTab = activeTab === 0 ||
        (activeTab === 1 && session.status === 'ongoing') ||
        (activeTab === 2 && session.status === 'upcoming') ||
        (activeTab === 3 && session.status === 'ended')
      const matchesPrice = !priceFilter || session.startingPrice <= parseInt(priceFilter)
      const matchesDateRange = (!startDate || new Date(session.startTime) >= startDate) &&
        (!endDate || new Date(session.endTime) <= endDate)

      return matchesSearch && matchesTab && matchesPrice && matchesDateRange
    })
  }, [searchTerm, activeTab, priceFilter, startDate, endDate])

  const getStatusColor = (status) => {
    switch (status) {
    case 'ongoing':
      return 'success'
    case 'upcoming':
      return 'warning'
    case 'ended':
      return 'error'
    default:
      return 'default'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
    case 'ongoing':
      return 'Đang diễn ra'
    case 'upcoming':
      return 'Sắp diễn ra'
    case 'ended':
      return 'Đã kết thúc'
    default:
      return 'Không xác định'
    }
  }

  const handleMenuOpen = (event, session) => {
    setAnchorEl(event.currentTarget)
    setSelectedSession(session)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedSession(null)
  }

  const handleViewDetails = () => {
    // Implement view details functionality
    console.log('View details for session:', selectedSession)
    handleMenuClose()
  }

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit session:', selectedSession)
    handleMenuClose()
  }

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete session:', selectedSession)
    handleMenuClose()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Phiên đấu giá của bạn
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                color: 'inherit',
                '&.Mui-selected': {
                  color: primaryColor
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: primaryColor
              }
            }}
          >
            <Tab label="TẤT CẢ" />
            <Tab label="ĐANG DIỄN RA" />
            <Tab label="SẮP DIỄN RA" />
            <Tab label="ĐÃ KẾT THÚC" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm phiên đấu giá"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                displayEmpty
                sx={{ minWidth: 200 }}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Tất cả giá</MenuItem>
                <MenuItem value="50000000">Dưới 50 triệu</MenuItem>
                <MenuItem value="100000000">Dưới 100 triệu</MenuItem>
                <MenuItem value="200000000">Dưới 200 triệu</MenuItem>
              </Select>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
              />
            </Box>

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
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.name}</TableCell>
                      <TableCell>
                        {format(session.startTime, 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </TableCell>
                      <TableCell>
                        {format(session.endTime, 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </TableCell>
                      <TableCell>
                        {session.startingPrice.toLocaleString('vi-VN')} ₫
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {selectedSession && (selectedSession.status === 'ongoing' || selectedSession.status === 'upcoming') && (
            <MenuItem onClick={handleViewDetails}>Xem chi tiết</MenuItem>
          )}
          {selectedSession && (selectedSession.status === 'ongoing' || selectedSession.status === 'upcoming') && (
            <MenuItem onClick={handleEdit}>Chỉnh sửa</MenuItem>
          )}
          {selectedSession && selectedSession.status === 'ended' && (
            <MenuItem onClick={handleDelete}>Xóa</MenuItem>
          )}
        </Menu>
      </Box>
    </LocalizationProvider>
  )
}

export default AuctionSessions

