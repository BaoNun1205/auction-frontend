import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  InputAdornment,
  Select,
  Tabs,
  Tab,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
})

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#1a1a1a',
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
})

const StyledChip = styled(Chip)(({ status }) => {
  let backgroundColor = '#ff9800' // Default orange for "Chưa đấu giá"
  let color = '#fff'

  if (status === 'bidding') {
    backgroundColor = '#2196f3' // Blue for "Đang đấu giá"
  } else if (status === 'completed') {
    backgroundColor = '#4caf50' // Green for "Đã đấu giá thành công"
  }

  return {
    fontWeight: 'bold',
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: '16px',
    padding: '0 12px'
  }
})

const sampleData = [
  { id: 1, name: 'Đồng hồ Rolex cổ', startingPrice: 5000, status: 'pending' },
  { id: 2, name: 'Bàn gỗ gụ cổ', startingPrice: 1200, status: 'bidding' },
  { id: 3, name: 'Bộ sưu tập sách quý', startingPrice: 3000, status: 'completed' }
]

const MyAssets = () => {
  const [assets, setAssets] = useState(sampleData)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [activeTab, setActiveTab] = useState(0);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleMenuOpen = (event, asset) => {
    setAnchorEl(event.currentTarget)
    setSelectedAsset(asset)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedAsset(null)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chưa đấu giá'
      case 'bidding':
        return 'Đang đấu giá'
      case 'completed':
        return 'Đã đấu giá thành công'
      default:
        return status
    }
  }

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesTab = activeTab === 0 ||
        (activeTab === 1 && asset.status === 'completed') ||
        (activeTab === 2 && asset.status === 'bidding') ||
        (activeTab === 3 && asset.status === 'pending');
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = priceFilter === '' || asset.startingPrice <= parseInt(priceFilter);
      return matchesTab && matchesSearch && matchesPrice;
    })
  }, [assets, activeTab, searchTerm, priceFilter])

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="#b41712" align="center" mb={4}>
        Tài sản của tôi
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              color: '#1a1a1a',
              '&.Mui-selected': {
                color: '#b41712'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#b41712'
            }
          }}
        >
          <Tab label="TẤT CẢ" />
          <Tab label="ĐÃ ĐẤU GIÁ THÀNH CÔNG" />
          <Tab label="ĐANG ĐẤU GIÁ" />
          <Tab label="CHƯA ĐẤU GIÁ" />
        </Tabs>
      </Box>
      <StyledPaper>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm theo tên sản phẩm"
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
            variant="outlined"
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            }
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Tất cả giá</MenuItem>
            <MenuItem value="1000">Dưới $1,000</MenuItem>
            <MenuItem value="5000">Dưới $5,000</MenuItem>
            <MenuItem value="10000">Dưới $10,000</MenuItem>
          </Select>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b41712' }}>
                <StyledTableCell sx={{ color: 'white' }}>Tên Tài sản</StyledTableCell>
                <StyledTableCell align="right" sx={{ color: 'white' }}>Giá khởi điểm</StyledTableCell>
                <StyledTableCell align="center" sx={{ color: 'white' }}>Trạng thái</StyledTableCell>
                <StyledTableCell align="center" sx={{ color: 'white' }}>Hành động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell align="right">${asset.startingPrice.toLocaleString()}</TableCell>
                  <TableCell align="center">
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          Xem chi tiết
        </MenuItem>
        {selectedAsset?.status === 'pending' && (
          <MenuItem onClick={handleMenuClose}>
            Chỉnh sửa
          </MenuItem>
        )}
      </Menu>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MyAssets

