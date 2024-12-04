import React, { useState, useMemo } from 'react';
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
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useFilterAssets } from '~/hooks/assetHook';
import { useAppStore } from '~/store/appStore';
import AuctionCreationDialog from './AuctionCreationDialog';
import { StyledSpan } from '~/features/style';
import AssetDetailDialog from './AssetDetailDialog';

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#1a1a1a',
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
});

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
}));

const MyAssets = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isAuctionDialogOpen, setIsAuctionDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const { auth } = useAppStore();
  const { data, refetch } = useFilterAssets({ vendorId: auth?.user?.id });
  const assets = Array.isArray(data?.data) ? data.data : [];

  const handleViewDetails = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenAuctionDialog = () => {
    setIsAuctionDialogOpen(true);
  };

  const handleCloseAuctionDialog = () => {
    setIsAuctionDialogOpen(false);
  };

  const handleCreateAuction = (auctionData) => {
    // Handle the creation of the auction with the provided data
    console.log('Creating auction:', auctionData);
    // You would typically send this data to your backend API
    setSnackbar({ open: true, message: 'Phiên đấu giá đã được tạo', severity: 'success' });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleMenuOpen = (event, asset) => {
    setAnchorEl(event.currentTarget);
    setSelectedAsset(asset);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAsset(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'NOT_AUCTIONED':
        return 'Chưa đấu giá';
      case 'ONGOING':
        return 'Đang đấu giá';
      case 'AUCTION_SUCCESS':
        return 'Đã đấu giá thành công';
      case 'AUCTION_FAILED':
        return 'Đấu giá thất bại';
      default:
        return status;
    }
  };

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesTab = activeTab === 0 ||
        (activeTab === 1 && asset.status === 'AUCTION_SUCCESS') ||
        (activeTab === 2 && asset.status === 'ONGOING') ||
        (activeTab === 3 && asset.status === 'NOT_AUCTIONED');
      const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = priceFilter === '' || asset.assetPrice <= parseInt(priceFilter);
      return matchesTab && matchesSearch && matchesPrice;
    });
  }, [assets, activeTab, searchTerm, priceFilter]);

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Tài sản của tôi
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Quản lý thông tin tài sản của bạn
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
            <MenuItem value="1000000">Dưới 1.000.000₫</MenuItem>
            <MenuItem value="5000000">Dưới 5.000.000₫</MenuItem>
            <MenuItem value="10000000">Dưới 10.000.000₫</MenuItem>
          </Select>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Tài sản</StyledTableCell>
                <StyledTableCell>Giá khởi điểm</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Hành động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.map((asset) => (
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
        <MenuItem onClick={handleViewDetails}>
          Xem chi tiết
        </MenuItem>
        {selectedAsset?.status === 'AUCTION_SUCCESS' && (
          <MenuItem onClick={handleMenuClose}>
            Xóa
          </MenuItem>
        )}
        {(selectedAsset?.status === 'NOT_AUCTIONED') && (
          <MenuItem onClick={() => {
            handleOpenAuctionDialog();
            handleMenuClose();
          }}>
            Tạo phiên đấu giá
          </MenuItem>
        )}
      </Menu>

      <AuctionCreationDialog
        open={isAuctionDialogOpen}
        onClose={handleCloseAuctionDialog}
        asset={selectedAsset}
        refresh={refetch}
      />

      <AssetDetailDialog
        open={openDialog}
        onClose={handleCloseDialog}
        asset={selectedAsset}
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyAssets;