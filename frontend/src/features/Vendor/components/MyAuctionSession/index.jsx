import React, { useState, useMemo, useEffect } from 'react'
import {
  Box,
  Typography,
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
  Select,
  MenuItem,
  IconButton,
  Menu,
  TablePagination,
  CircularProgress
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RefreshIcon from '@mui/icons-material/Refresh'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useFilterSessions } from '~/hooks/sessionHook'
import { useAppStore } from '~/store/appStore'
import Reauction from './component/Reauction'
import AuctionModal from './component/AuctionModal'
import { useNavigate } from 'react-router-dom'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(180, 23, 18, 0.12)',
  border: '1px solid rgba(180, 23, 18, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #fefefe 100%)',
  backdropFilter: 'blur(10px)'
})

const AuctionSessions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [priceFilter, setPriceFilter] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(5)
  const [isProcessing, setIsProcessing] = useState(false)

  // Tách riêng state cho từng modal/action
  const [isReauctionDialogOpen, setReauctionDialogOpen] = useState(false)
  const [isAuctionModalOpen, setAuctionModalOpen] = useState(false)
  const [reauctionSession, setReauctionSession] = useState(null)
  const [auctionModalSession, setAuctionModalSession] = useState(null)

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)

  const { auth } = useAppStore()
  const { data, isLoading, isError, refetch } = useFilterSessions({ userId: auth.user.id })
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.error('Error fetching auction sessions')
    }
  }, [isError])

  useEffect(() => {
    console.log('Fetching auction sessions')
    refetch()
  }, [refetch])

  const auctionSessions = Array.isArray(data?.data) ? data.data : []

  const getStatusCount = (status) => {
    if (status === 'ALL') return auctionSessions.length
    return auctionSessions.filter((session) => session.status === status).length
  }

  const filteredSessions = useMemo(() => {
    return auctionSessions.filter((session) => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTab =
        activeTab === 0 ||
        (activeTab === 1 && session.status === 'ONGOING') ||
        (activeTab === 2 && session.status === 'UPCOMING') ||
        (activeTab === 3 && session.status === 'AUCTION_SUCCESS') ||
        (activeTab === 4 && session.status === 'AUCTION_FAILED')
      const matchesPrice = !priceFilter || session.startingBids <= Number.parseInt(priceFilter)
      const matchesDateRange =
        (!startDate || new Date(session.startTime) >= startDate) && (!endDate || new Date(session.endTime) <= endDate)

      return matchesSearch && matchesTab && matchesPrice && matchesDateRange
    })
  }, [searchTerm, activeTab, priceFilter, startDate, endDate, auctionSessions])

  const paginatedSessions = filteredSessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

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

  const handleMenuOpen = (event, session) => {
    if (isProcessing) return
    setIsProcessing(true)
    setAnchorEl(event.currentTarget)
    setSelectedSession(session)
    console.log('Selected session:', session)
    setTimeout(() => setIsProcessing(false), 300)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedSession(null)
  }

  // Handlers cho Reauction
  const handleOpenReauctionDialog = () => {
    if (selectedSession && selectedSession.status === 'AUCTION_FAILED') {
      console.log('Opening ReauctionDialog for session:', selectedSession)
      setReauctionSession({ ...selectedSession })
      setReauctionDialogOpen(true)
    } else {
      console.error('Cannot open ReauctionDialog: Invalid session or status', selectedSession)
    }
    handleMenuClose()
  }

  const handleCloseReauctionDialog = () => {
    console.log('Closing ReauctionDialog')
    setReauctionDialogOpen(false)
    setReauctionSession(null)
  }

  // Handlers cho AuctionModal
  const handleOpenAuctionModal = () => {
    if (selectedSession && selectedSession.status === 'AUCTION_SUCCESS') {
      console.log('Opening AuctionModal for session:', selectedSession)
      setAuctionModalSession({ ...selectedSession })
      setAuctionModalOpen(true)
    } else {
      console.error('Cannot open AuctionModal: Invalid session or status', selectedSession)
    }
    handleMenuClose()
  }

  const handleCloseAuctionModal = () => {
    console.log('Closing AuctionModal')
    setAuctionModalOpen(false)
    setAuctionModalSession(null)
  }

  // Main handler cho view details
  const handleViewDetails = () => {
    if (!selectedSession) {
      console.error('No session selected')
      handleMenuClose()
      return
    }

    // Lưu session vào biến local để tránh bị mất khi reset state
    const currentSession = { ...selectedSession }
    console.log('Handling view details for session status:', currentSession.status, currentSession)

    // Xử lý theo status cụ thể
    switch (currentSession.status) {
    case 'AUCTION_SUCCESS':
      console.log('Processing AUCTION_SUCCESS - Opening AuctionModal')
      setAuctionModalSession(currentSession)
      setAuctionModalOpen(true)
      handleMenuClose()
      break

    case 'ONGOING':
      console.log('Processing ONGOING - Navigating to session')
      if (currentSession.auctionSessionId) {
        handleMenuClose()
        navigate(`/session/${currentSession.auctionSessionId}`)
      } else {
        console.error('Invalid auctionSessionId for ONGOING session:', currentSession)
        handleMenuClose()
      }
      break

    case 'AUCTION_FAILED':
      console.log('Processing AUCTION_FAILED - Opening ReauctionDialog')
      navigate(`/session/${currentSession.auctionSessionId}`)
      handleMenuClose()
      break

    case 'UPCOMING':
      navigate(`/session/register/${currentSession.auctionSessionId}`)
      handleMenuClose()
      break

    default:
      console.warn('Unsupported session status:', currentSession.status)
      handleMenuClose()
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#b41712' }} />
      </Box>
    )
  }

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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Phiên đấu giá của bạn
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Quản lý các phiên đấu giá của bạn
          </Typography>
        </Box>

        {/* Status Count Chips */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {[
            { key: 'ALL', label: 'Tất cả', index: 0 },
            { key: 'ONGOING', label: 'Đang diễn ra', index: 1 },
            { key: 'UPCOMING', label: 'Sắp diễn ra', index: 2 },
            { key: 'AUCTION_SUCCESS', label: 'Đấu giá thành công', index: 3 },
            { key: 'AUCTION_FAILED', label: 'Đấu giá thất bại', index: 4 }
          ].map(({ key, label, index }) => (
            <Chip
              key={key}
              label={`${label} (${getStatusCount(key)})`}
              variant={activeTab === index ? 'filled' : 'outlined'}
              onClick={() => setActiveTab(index)}
              sx={{
                cursor: 'pointer',
                borderRadius: '20px',
                backgroundColor: activeTab === index ? '#b41712' : 'transparent',
                color: activeTab === index ? 'white' : '#b41712',
                borderColor: '#b41712',
                '&:hover': {
                  backgroundColor: activeTab === index ? '#a01510' : 'rgba(180, 23, 18, 0.1)'
                }
              }}
            />
          ))}
        </Box>

        <StyledPaper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flex: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                displayEmpty
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
                sx={{
                  minWidth: { xs: '100%', sm: 200 },
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '12px'
                  }
                }}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      minWidth: { xs: '100%', sm: 200 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                )}
              />
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={setEndDate}
                minDate={startDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      minWidth: { xs: '100%', sm: 200 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Enhanced Sessions Table với scroll */}
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
                {paginatedSessions.map((session) => (
                  <TableRow
                    key={session.auctionSessionId}
                    hover
                    sx={{ '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.05)' } }}
                  >
                    <TableCell sx={{ maxWidth: 350, padding: '16px' }}>
                      <Typography variant="subtitle1" fontWeight="600" sx={{ color: '#1a1a1a' }}>
                        {session.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '16px' }}>
                      <Typography variant="body1" fontWeight="600" sx={{ color: '#b41712' }}>
                        {session.startingBids?.toLocaleString('vi-VN')}₫
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '16px' }}>
                      <Chip
                        label={getStatusText(session.status)}
                        color={getStatusColor(session.status)}
                        size="small"
                        variant="filled"
                        sx={{ borderRadius: '16px', fontWeight: '500' }}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '16px' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Bắt đầu: {format(new Date(session.startTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kết thúc: {format(new Date(session.endTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '16px' }}>
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, session)}
                        size="small"
                        disabled={isProcessing}
                        sx={{
                          backgroundColor: 'rgba(180, 23, 18, 0.1)',
                          color: '#b41712',
                          '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.2)' },
                          '&.Mui-disabled': { opacity: 0.5 }
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedSessions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <Typography variant="body1" color="text.secondary">
                        Không tìm thấy phiên đấu giá nào
                      </Typography>
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
            sx={{
              borderTop: '1px solid rgba(180, 23, 18, 0.1)',
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: '#666'
              }
            }}
          />
        </StyledPaper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(180, 23, 18, 0.15)',
              border: '1px solid rgba(180, 23, 18, 0.1)'
            }
          }}
        >
          <MenuItem
            onClick={handleViewDetails}
            sx={{
              borderRadius: '4px',
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <VisibilityIcon fontSize="small" sx={{ color: '#b41712' }} />
            Xem chi tiết
          </MenuItem>
          {selectedSession?.status === 'AUCTION_FAILED' && (
            <MenuItem
              onClick={handleOpenReauctionDialog}
              sx={{
                borderRadius: '4px',
                mx: 1,
                '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <RefreshIcon fontSize="small" sx={{ color: '#b41712' }} />
              Đấu giá lại
            </MenuItem>
          )}
        </Menu>

        {/* Reauction Dialog - Sử dụng state riêng */}
        <Reauction
          open={isReauctionDialogOpen}
          onClose={handleCloseReauctionDialog}
          session={reauctionSession}
          refresh={refetch}
        />

        {/* Auction Modal - Sử dụng state riêng */}
        <AuctionModal open={isAuctionModalOpen} handleClose={handleCloseAuctionModal} item={auctionModalSession} />
      </Box>
    </LocalizationProvider>
  )
}

export default AuctionSessions
