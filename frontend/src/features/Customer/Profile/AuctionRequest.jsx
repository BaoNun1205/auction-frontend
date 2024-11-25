import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
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
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Chip,
  Card,
  CardContent,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { motion, AnimatePresence } from 'framer-motion';
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

const ImagePreview = styled(Box)({
  position: 'relative',
  height: 200,
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const DeleteImageButton = styled(Button)({
  position: 'absolute',
  top: 5,
  right: 5,
  minWidth: 'auto',
  padding: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

const ImageUploadButton = styled(Button)(({ theme }) => ({
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: primaryColor,
    backgroundColor: theme.palette.action.hover,
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
    status === 'Approved' ? theme.palette.success.main :
    status === 'Rejected' ? theme.palette.error.main :
    theme.palette.warning.main,
}));

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
});

const sampleData = [
  { id: 1, name: 'Vintage Rolex Watch', startingPrice: '5000', status: 'Pending', description: 'A classic Rolex watch from the 1960s in excellent condition.', productImages: ['https://example.com/watch1.jpg', 'https://example.com/watch2.jpg'], documentImages: ['https://example.com/doc1.jpg'], category: 'Watches' },
  { id: 2, name: 'Antique Mahogany Desk', startingPrice: '1200', status: 'Approved', description: 'Beautiful 19th century mahogany writing desk with intricate carvings.', productImages: ['https://example.com/desk1.jpg'], documentImages: ['https://example.com/doc2.jpg'], category: 'Furniture' },
  { id: 3, name: 'First Edition Book Collection', startingPrice: '3000', status: 'Rejected', description: 'A collection of rare first edition books from renowned 20th century authors.', productImages: ['https://example.com/books1.jpg', 'https://example.com/books2.jpg'], documentImages: ['https://example.com/doc4.jpg'], category: 'Books' },
];

const categories = ['Watches', 'Furniture', 'Books', 'Art', 'Jewelry', 'Electronics', 'Other'];

const AuctionRequest = () => {
  const [requirements, setRequirements] = useState(sampleData);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRequirement, setCurrentRequirement] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    productImages: ['', '', '', ''],
    documentImages: ['', ''],
    status: 'Pending',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleImageUpload = (e, type, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...formData[type]];
        newImages[index] = reader.result;
        setFormData({ ...formData, [type]: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (type, index) => {
    const newImages = [...formData[type]];
    newImages[index] = '';
    setFormData({ ...formData, [type]: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentRequirement) {
      setRequirements(requirements.map(req => 
        req.id === currentRequirement.id ? { ...formData, id: req.id } : req
      ));
      setSnackbar({ open: true, message: 'Yêu cầu đã được cập nhật', severity: 'success' });
    } else {
      setRequirements([...requirements, { ...formData, id: Date.now() }]);
      setSnackbar({ open: true, message: 'Yêu cầu mới đã được thêm', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleOpenDialog = (requirement = null) => {
    if (requirement) {
      setCurrentRequirement(requirement);
      setFormData(requirement);
    } else {
      setCurrentRequirement(null);
      setFormData({
        name: '',
        description: '',
        startingPrice: '',
        productImages: ['', '', '', ''],
        documentImages: ['', ''],
        status: 'Pending',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRequirement(null);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  const handleDeleteRequirement = () => {
    setRequirements(requirements.filter(req => req.id !== deleteConfirmation.id));
    setSnackbar({ open: true, message: 'Yêu cầu đã được xóa', severity: 'success' });
    setDeleteConfirmation({ open: false, id: null });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCreateProduct = (id) => {
    console.log(`Creating product for requirement ${id}`);
    setSnackbar({ open: true, message: 'Sản phẩm đã được tạo', severity: 'success' });
  };

  const handleMenuOpen = (event, requirement) => {
    setAnchorEl(event.currentTarget);
    setSelectedRequirement(requirement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRequirement(null);
  };

  const canEdit = (status) => status === 'Rejected';

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color={primaryColor} align="center" mb={4}>
        Yêu cầu Bán đấu giá
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
              Tạo Yêu cầu Mới
            </Button>
          </AnimatedButton>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Tên Sản phẩm</StyledTableCell>
                  <StyledTableCell align="right">Giá khởi điểm</StyledTableCell>
                  <StyledTableCell align="center">Trạng thái</StyledTableCell>
                  {/* Only show Category column for Approved requirements */}
                  <StyledTableCell align="center">Danh mục</StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {requirements.map((req) => (
                    <Fade key={req.id} in={true}>
                      <StyledTableRow>
                        <TableCell>{req.name}</TableCell>
                        <TableCell align="right">{`$${req.startingPrice}`}</TableCell>
                        <TableCell align="center">
                          <StyledChip label={req.status} status={req.status} />
                        </TableCell>
                        {/* Only show Category for Approved requirements */}
                        <TableCell align="center">
                          {req.status === 'Approved' ? req.category : '-'}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={(e) => handleMenuOpen(e, req)}>
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
          handleOpenDialog(selectedRequirement);
          handleMenuClose();
        }}>
          {canEdit(selectedRequirement?.status) ? 'Chỉnh sửa' : 'Xem chi tiết'}
        </MenuItem>
        <MenuItem onClick={() => {
          handleDeleteConfirmation(selectedRequirement?.id);
          handleMenuClose();
        }}>
          Xóa
        </MenuItem>
        {selectedRequirement?.status === 'Approved' && (
          <MenuItem onClick={() => {
            handleCreateProduct(selectedRequirement?.id);
            handleMenuClose();
          }}>
            Tạo sản phẩm
          </MenuItem>
        )}
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: primaryColor, color: 'white' }}>
          {currentRequirement ? (canEdit(currentRequirement.status) ? 'Chỉnh sửa Yêu cầu' : 'Chi tiết Yêu cầu') : 'Tạo Yêu cầu Mới'}
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  disabled={currentRequirement && !canEdit(currentRequirement.status)}
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
                  disabled={currentRequirement && !canEdit(currentRequirement.status)}
                />
              </Grid>
              {currentRequirement && currentRequirement.status === 'Approved' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    
fullWidth
                    label="Danh mục"
                    name="category"
                    value={currentRequirement.category}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Mô tả
                </Typography>
                <ReactQuill
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  theme="snow"
                  style={{ height: '200px', marginBottom: '50px' }}
                  readOnly={currentRequirement && !canEdit(currentRequirement.status)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color={primaryColor}>
                  Hình ảnh sản phẩm
                </Typography>
                <Grid container spacing={2}>
                  {formData.productImages.map((image, index) => (
                    <Grid item xs={12} sm={3} key={`product-${index}`}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`product-image-upload-${index}`}
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'productImages', index)}
                        disabled={currentRequirement && !canEdit(currentRequirement.status)}
                      />
                      <label htmlFor={`product-image-upload-${index}`}>
                        {image ? (
                          <ImagePreview style={{ backgroundImage: `url(${image})` }}>
                            {(!currentRequirement || canEdit(currentRequirement.status)) && (
                              <DeleteImageButton onClick={() => handleDeleteImage('productImages', index)} size="small">
                                <CloseIcon />
                              </DeleteImageButton>
                            )}
                          </ImagePreview>
                        ) : (
                          <ImageUploadButton component="span" disabled={currentRequirement && !canEdit(currentRequirement.status)}>
                            <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                            <Typography variant="body2" color="textSecondary">
                              Thêm ảnh
                            </Typography>
                          </ImageUploadButton>
                        )}
                      </label>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color={primaryColor}>
                  Hình ảnh giấy tờ
                </Typography>
                <Grid container spacing={2}>
                  {formData.documentImages.map((image, index) => (
                    <Grid item xs={12} sm={6} key={`document-${index}`}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`document-image-upload-${index}`}
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'documentImages', index)}
                        disabled={currentRequirement && !canEdit(currentRequirement.status)}
                      />
                      <label htmlFor={`document-image-upload-${index}`}>
                        {image ? (
                          <ImagePreview style={{ backgroundImage: `url(${image})` }}>
                            {(!currentRequirement || canEdit(currentRequirement.status)) && (
                              <DeleteImageButton onClick={() => handleDeleteImage('documentImages', index)} size="small">
                                <CloseIcon />
                              </DeleteImageButton>
                            )}
                          </ImagePreview>
                        ) : (
                          <ImageUploadButton component="span" disabled={currentRequirement && !canEdit(currentRequirement.status)}>
                            <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                            <Typography variant="body2" color="textSecondary">
                              Thêm ảnh
                            </Typography>
                          </ImageUploadButton>
                        )}
                      </label>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: 'grey.500' }}>
            {currentRequirement && !canEdit(currentRequirement.status) ? 'Đóng' : 'Hủy'}
          </Button>
          {(!currentRequirement || canEdit(currentRequirement.status)) && (
            <AnimatedButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
              >
                {currentRequirement ? 'Cập nhật' : 'Tạo Yêu cầu'}
              </Button>
            </AnimatedButton>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmation.open}
        onClose={() => setDeleteConfirmation({ open: false, id: null })}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa yêu cầu này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation({ open: false, id: null })} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteRequirement} color="error" variant="contained">
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
  );
};

export default AuctionRequest;

