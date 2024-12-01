import React, { useState, useMemo } from 'react';
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
  Tabs,
  Tab,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const primaryColor = '#b41712';

// Mock data for demonstration
const mockAuctionSessions = [
  {
    id: 1,
    name: 'Đấu giá xe cổ',
    startTime: new Date('2023-06-01T10:00:00'),
    endTime: new Date('2023-06-01T18:00:00'),
    startingPrice: 100000000,
    status: 'ongoing',
  },
  {
    id: 2,
    name: 'Đấu giá tranh nghệ thuật',
    startTime: new Date('2023-06-05T14:00:00'),
    endTime: new Date('2023-06-05T20:00:00'),
    startingPrice: 50000000,
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Đấu giá đồ cổ',
    startTime: new Date('2023-05-20T09:00:00'),
    endTime: new Date('2023-05-20T17:00:00'),
    startingPrice: 75000000,
    status: 'ended',
  },
];

const AuctionSessions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [priceFilter, setPriceFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredSessions = useMemo(() => {
    return mockAuctionSessions.filter(session => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 0 ||
        (activeTab === 1 && session.status === 'ongoing') ||
        (activeTab === 2 && session.status === 'upcoming') ||
        (activeTab === 3 && session.status === 'ended');
      const matchesPrice = !priceFilter || session.startingPrice <= parseInt(priceFilter);
      const matchesDateRange = (!startDate || new Date(session.startTime) >= startDate) &&
        (!endDate || new Date(session.endTime) <= endDate);

      return matchesSearch && matchesTab && matchesPrice && matchesDateRange;
    });
  }, [searchTerm, activeTab, priceFilter, startDate, endDate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'ended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ongoing':
        return 'Đang diễn ra';
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'ended':
        return 'Đã kết thúc';
      default:
        return 'Không xác định';
    }
  };

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
            <Tab label="ĐANG XỬ LÝ" />
            <Tab label="ĐANG CHỜ DUYỆT" />
            <Tab label="ĐÃ TỪ CHỐI" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12} md={2}>
                <Select
                  fullWidth
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  displayEmpty
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
              </Grid>
              <Grid item xs={12} md={2}>
                <DatePicker
                  label="Từ ngày"
                  value={startDate}
                  onChange={setStartDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  format="dd/MM/yyyy"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <DatePicker
                  label="Đến ngày"
                  value={endDate}
                  onChange={setEndDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  format="dd/MM/yyyy"
                  minDate={startDate}
                />
              </Grid>
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên phiên đấu giá</TableCell>
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                    <TableCell>Giá khởi điểm</TableCell>
                    <TableCell>Trạng thái</TableCell>
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
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default AuctionSessions;