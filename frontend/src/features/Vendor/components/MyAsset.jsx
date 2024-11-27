import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
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
  Card,
  CardContent,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { motion, AnimatePresence } from 'framer-motion';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const primaryColor = '#b41712';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 50px rgba(180, 23, 18, 0.2)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.common.white,
  backgroundColor: primaryColor,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: 'rgba(180, 23, 18, 0.08)',
  },
  transition: 'background-color 0.3s ease-in-out',
}));

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  color: theme.palette.common.white,
  backgroundColor:
    status === 'Đang đấu giá' ? theme.palette.info.main :
    status === 'Đã đấu giá thành công' ? theme.palette.success.main :
    theme.palette.warning.main,
}));

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
});

const sampleData = [
  { id: 1, name: 'Đồng hồ Rolex cổ', startingPrice: '5000', status: 'Chưa đấu giá', description: 'Đồng hồ Rolex cổ từ những năm 1960, trong tình trạng hoàn hảo.' },
  { id: 2, name: 'Bàn gỗ gụ cổ', startingPrice: '1200', status: 'Đang đấu giá', description: 'Bàn gỗ gụ cổ từ thế kỷ 19 với những đường chạm khắc tinh xảo.' },
  { id: 3, name: 'Bộ sưu tập sách quý', startingPrice: '3000', status: 'Đã đấu giá thành công', description: 'Bộ sưu tập sách quý hiếm của các tác giả nổi tiếng thế kỷ 20.' },
];

const MyAssets = () => {
  const [assets, setAssets] = useState(sampleData);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [auctionDialog, setAuctionDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    status: 'Chưa đấu giá',
  });

  const [auctionData, setAuctionData] = useState({
    startTime: null,
    endTime: null,
    auctionType: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuctionInputChange = (e) => {
    const { name, value } = e.target;
    setAuctionData({ ...auctionData, [name]: value });
  };

  const handleDescriptionChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleAuctionDescriptionChange = (content) => {
    setAuctionData({ ...auctionData, description: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAsset) {
      setAssets(assets.map(asset => 
        asset.id === currentAsset.id ? { ...formData, id: asset.id } : asset
      ));
      setSnackbar({ open: true, message: 'Tài sản đã được cập nhật', severity: 'success' });
    } else {
      setAssets([...assets, { ...formData, id: Date.now() }]);
      setSnackbar({ open: true, message: 'Tài sản mới đã được thêm', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleAuctionSubmit = (e) => {
    e.preventDefault();
    const updatedAsset = { ...selectedAsset, ...auctionData, status: 'Đang đấu giá' };
    setAssets(assets.map(asset => 
      asset.id === selectedAsset.id ? updatedAsset : asset
    ));
    setSnackbar({ open: true, message: 'Phiên đấu giá đã được tạo', severity: 'success' });
    handleCloseAuctionDialog();
  };

  const handleOpenDialog = (asset = null) => {
    if (asset) {
      setCurrentAsset(asset);
      setFormData(asset);
    } else {
      setCurrentAsset(null);
      setFormData({
        name: '',
        description: '',
        startingPrice: '',
        status: 'Chưa đấu giá',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAsset(null);
  };

  const handleOpenAuctionDialog = (asset) => {
    setSelectedAsset(asset);
    setAuctionData({
      startTime: null,
      endTime: null,
      auctionType: '',
      description: '',
    });
    setAuctionDialog(true);
  };

  const handleCloseAuctionDialog = () => {
    setAuctionDialog(false);
    setSelectedAsset(null);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  const handleDeleteAsset = () => {
    setAssets(assets.filter(asset => asset.id !== deleteConfirmation.id));
    setSnackbar({ open: true, message: 'Tài sản đã được xóa', severity: 'success' });
    setDeleteConfirmation({ open: false, id: null });
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color={primaryColor} align="center" mb={4}>
          Tài sản của tôi
        </Typography>
        <StyledCard>
          <CardContent>
            <AnimatedButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ mb: 3, bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
              >
                Thêm Tài sản Mới
              </Button>
            </AnimatedButton>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tên Tài sản</StyledTableCell>
                    <StyledTableCell align="right">Giá khởi điểm</StyledTableCell>
                    <StyledTableCell align="center">Trạng thái</StyledTableCell>
                    <StyledTableCell align="center">Hành động</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {assets.map((asset) => (
                      <Fade key={asset.id} in={true}>
                        <StyledTableRow>
                          <TableCell>{asset.name}</TableCell>
                          <TableCell align="right">{`$${asset.startingPrice}`}</TableCell>
                          <TableCell align="center">
                            <StyledChip label={asset.status} status={asset.status} />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton onClick={(e) => handleMenuOpen(e, asset)}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      </Fade>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </StyledCard>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => {
            handleOpenDialog(selectedAsset);
            handleMenuClose();
          }}>
            Xem chi tiết
          </MenuItem>
          {selectedAsset?.status === 'Chưa đấu giá' && (
            <>
              <MenuItem onClick={() => {
                handleDeleteConfirmation(selectedAsset?.id);
                handleMenuClose();
              }}>
                Xóa
              </MenuItem>
              <MenuItem onClick={() => {
                handleOpenAuctionDialog(selectedAsset);
                handleMenuClose();
              }}>
                Tạo phiên đấu giá
              </MenuItem>
            </>
          )}
          {selectedAsset?.status === 'Đang đấu giá' && (
            <MenuItem onClick={() => {
              // Implement view auction details logic here
              handleMenuClose();
            }}>
              Xem chi tiết phiên đấu giá
            </MenuItem>
          )}
        </Menu>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle sx={{ bgcolor: primaryColor, color: 'white' }}>
            {currentAsset ? 'Chi tiết Tài sản' : 'Thêm Tài sản Mới'}
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tên tài sản"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    disabled={currentAsset}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giá khởi điểm"
                    name="startingPrice"
                    type="number"
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Typography color="textSecondary">$</Typography>,
                    }}
                    disabled={currentAsset}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Mô tả
                  </Typography>
                  <ReactQuill
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                    readOnly={currentAsset}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: 'grey.500' }}>
              Đóng
            </Button>
            {!currentAsset && (
              <AnimatedButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleSubmit} 
                  variant="contained" 
                  sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
                >
                  Thêm Tài sản
                </Button>
              </AnimatedButton>
            )}
          </DialogActions>
        </Dialog>

        <Dialog open={auctionDialog} onClose={handleCloseAuctionDialog} fullWidth maxWidth="md">
          <DialogTitle sx={{ bgcolor: primaryColor, color: 'white' }}>
            Tạo Phiên Đấu giá
          </DialogTitle
>
          <DialogContent dividers>
            <form onSubmit={handleAuctionSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tên tài sản"
                    value={selectedAsset?.name || ''}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giá khởi điểm"
                    value={selectedAsset?.startingPrice || ''}
                    variant="outlined"
                    disabled
                    InputProps={{
                      startAdornment: <Typography color="textSecondary">$</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Thời gian bắt đầu"
                    value={auctionData.startTime}
                    onChange={(newValue) => setAuctionData({ ...auctionData, startTime: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Thời gian kết thúc"
                    value={auctionData.endTime}
                    onChange={(newValue) => setAuctionData({ ...auctionData, endTime: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="auction-type-label">Loại phiên đấu giá</InputLabel>
                    <Select
                      labelId="auction-type-label"
                      id="auction-type"
                      value={auctionData.auctionType}
                      onChange={handleAuctionInputChange}
                      label="Loại phiên đấu giá"
                      name="auctionType"
                    >
                      <MenuItem value="Timed Auction">Timed Auction</MenuItem>
                      <MenuItem value="Live Auction">Live Auction</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Mô tả phiên đấu giá
                  </Typography>
                  <ReactQuill
                    value={auctionData.description}
                    onChange={handleAuctionDescriptionChange}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAuctionDialog} sx={{ color: 'grey.500' }}>
              Hủy
            </Button>
            <AnimatedButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleAuctionSubmit} 
                variant="contained" 
                sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
              >
                Tạo Phiên Đấu giá
              </Button>
            </AnimatedButton>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteConfirmation.open}
          onClose={() => setDeleteConfirmation({ open: false, id: null })}
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <Typography>Bạn có chắc chắn muốn xóa tài sản này?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation({ open: false, id: null })} color="primary">
              Hủy
            </Button>
            <Button onClick={handleDeleteAsset} color="error" variant="contained">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default MyAssets;