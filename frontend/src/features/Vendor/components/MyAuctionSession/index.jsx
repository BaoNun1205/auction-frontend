import React, { useState, useMemo, useEffect } from 'react';
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
  styled,
  TablePagination,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useFilterSessions } from '~/hooks/sessionHook';
import { useAppStore } from '~/store/appStore';
import Reauction from './component/Reauction';
import SessionsTable from './component/SessionsTable';
import AuctionModal from './component/AuctionModal'; // Import the AuctionModal component

const primaryColor = '#b41712';

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#1a1a1a',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
});

const AuctionSessions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [priceFilter, setPriceFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isReauctionDialogOpen, setReauctionDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isAuctionModalOpen, setAuctionModalOpen] = useState(false); // State for AuctionModal
  const { auth } = useAppStore();
  const { data, isLoading, isError, refetch } = useFilterSessions({ userId: auth.user.id });

  useEffect(() => {
    if (isError) {
      console.error('Error fetching auction sessions');
    }
  }, [isError]);

  useEffect(() => {
    console.log('Fetching auction sessions');
    refetch();
  }, [refetch]);

  const auctionSessions = Array.isArray(data?.data) ? data.data : [];

  const filteredSessions = useMemo(() => {
    return auctionSessions.filter((session) => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === 0 ||
        (activeTab === 1 && session.status === 'ONGOING') ||
        (activeTab === 2 && session.status === 'UPCOMING') ||
        (activeTab === 3 && session.status === 'AUCTION_SUCCESS') ||
        (activeTab === 4 && session.status === 'AUCTION_FAILED');
      const matchesPrice = !priceFilter || session.startingBids <= parseInt(priceFilter);
      const matchesDateRange =
        (!startDate || new Date(session.startTime) >= startDate) &&
        (!endDate || new Date(session.endTime) <= endDate);

      return matchesSearch && matchesTab && matchesPrice && matchesDateRange;
    });
  }, [searchTerm, activeTab, priceFilter, startDate, endDate, auctionSessions]);

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedSessions = filteredSessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONGOING':
        return 'warning';
      case 'UPCOMING':
        return 'info';
      case 'AUCTION_SUCCESS':
        return 'success';
      case 'AUCTION_FAILED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ONGOING':
        return 'Đang diễn ra';
      case 'UPCOMING':
        return 'Sắp diễn ra';
      case 'AUCTION_SUCCESS':
        return 'Đấu giá thành công';
      case 'AUCTION_FAILED':
        return 'Đấu giá thất bại';
      default:
        return 'Không xác định';
    }
  };

  const handleMenuOpen = (event, session) => {
    setAnchorEl(event.currentTarget);
    setSelectedSession(session);
    console.log('Selected session:', session);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSession(null);
  };

  const handleOpenAuctionDialog = () => {
    setReauctionDialogOpen(true);
  };

  const handleCloseAuctionDialog = () => {
    setReauctionDialogOpen(false);
  };

  const handleViewDetails = () => {
    if (selectedSession?.status === 'AUCTION_SUCCESS') {
      setAuctionModalOpen(true);
    }
    handleMenuClose();
  };

  const handleCloseAuctionModal = () => {
    setAuctionModalOpen(false);
  };

  const handleReauction = () => {
    console.log('Reauction session:', selectedSession);
    handleMenuClose();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Phiên đấu giá của bạn
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Quản lý các phiên đấu giá của bạn
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
                  color: primaryColor,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: primaryColor,
              },
            }}
          >
            <Tab label="TẤT CẢ" />
            <Tab label="ĐANG DIỄN RA" />
            <Tab label="SẮP DIỄN RA" />
            <Tab label="ĐẤU GIÁ THÀNH CÔNG" />
            <Tab label="ĐẤU GIÁ THẤT BẠI" />
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
                  ),
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
            <SessionsTable filteredSessions={paginatedSessions} handleMenuOpen={handleMenuOpen} />
            <TablePagination
              component="div"
              count={filteredSessions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Paper>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewDetails}>Xem chi tiết</MenuItem>
          {selectedSession?.status === 'AUCTION_FAILED' && (
            <MenuItem
              onClick={() => {
                handleOpenAuctionDialog();
                handleMenuClose();
              }}
            >
              Đấu giá lại
            </MenuItem>
          )}
        </Menu>

        <Reauction open={isReauctionDialogOpen} onClose={handleCloseAuctionDialog} session={selectedSession} refresh={refetch} />

        {selectedSession?.status === 'AUCTION_SUCCESS' && (
          <AuctionModal
            open={isAuctionModalOpen}
            handleClose={handleCloseAuctionModal}
            item={selectedSession}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default AuctionSessions;