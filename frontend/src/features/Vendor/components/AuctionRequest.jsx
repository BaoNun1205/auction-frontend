import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
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
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  InputAdornment,
  Select,
  CircularProgress
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import { motion } from 'framer-motion'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useCreateRequirement, useDeleteRequirement, useRequirementsByVendorId } from '~/hooks/requirementHook'
import { useAppStore } from '~/store/appStore'

const primaryColor = '#b41712'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  color: theme.palette.getContrastText(
    status === '1' ? theme.palette.success.main :
      status === '2' ? theme.palette.error.main :
        theme.palette.warning.main
  ),
  backgroundColor:
    status === '1' ? theme.palette.success.main :
      status === '2' ? theme.palette.error.main :
        theme.palette.warning.main
}))

const ImagePreview = styled(Box)({
  position: 'relative',
  height: 150,
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  cursor: 'pointer',
  borderRadius: 4,
  '&:hover': {
    opacity: 0.8
  }
})

const ImageUploadButton = styled(Button)(({ theme }) => ({
  height: 150,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: 4,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const AnimatedButton = styled(motion.div)({
  display: 'inline-block'
})

const sampleData = [
  { id: 1, name: 'Đồng hồ Rolex cổ', startingPrice: 5000000, status: 'Pending', description: 'Đồng hồ Rolex cổ từ những năm 1960, trong tình trạng hoàn hảo.', productImages: ['https://example.com/watch1.jpg', 'https://example.com/watch2.jpg'], documentImages: ['https://example.com/doc1.jpg'] },
  { id: 2, name: 'Bàn gỗ gụ cổ', startingPrice: 1200000, status: 'Approved', description: 'Bàn gỗ gụ cổ từ thế kỷ 19 với những đường chạm khắc tinh xảo.', productImages: ['https://example.com/desk1.jpg'], documentImages: ['https://example.com/doc2.jpg'] },
  { id: 3, name: 'Bộ sưu tập sách quý', startingPrice: 3000000, status: 'Rejected', description: 'Bộ sưu tập sách quý hiếm của các tác giả nổi tiếng thế kỷ 20.', productImages: ['https://example.com/books1.jpg', 'https://example.com/books2.jpg'], documentImages: ['https://example.com/doc4.jpg'] }
]

const AuctionRequest = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentRequirement, setCurrentRequirement] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null })
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRequirement, setSelectedRequirement] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const { mutate: deleteRequirement } = useDeleteRequirement();
  const { mutate: createRequirement } = useCreateRequirement()
  const { auth } = useAppStore()
  const { data } = useRequirementsByVendorId(auth.user.id)
  const requirements = Array.isArray(data) ? data : [];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    productImages: ['', '', '', ''],
    documentImages: ['', ''],
    status: 'Pending'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDescriptionChange = (content) => {
    setFormData({ ...formData, description: content })
  }

  const handleImageUpload = (e, type, index) => {
    const file = e.target.files[0]
    if (file) {
      const newImages = [...formData[type]]
      newImages[index] = file
      setFormData({ ...formData, [type]: newImages })
    }
  }

  const handleDeleteImage = (type, index) => {
    const newImages = [...formData[type]]
    newImages[index] = ''
    setFormData({ ...formData, [type]: newImages })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsCreating(true) // Set loading state

    const formDataObj = new FormData()
    formDataObj.append('assetName', formData.name)
    formDataObj.append('assetPrice', formData.startingPrice)
    formDataObj.append('assetDescription', formData.description)

    // Combine productImages and documentImages into a single array
    const allImages = [...formData.productImages, ...formData.documentImages]

    // Append all non-empty images to the FormData
    allImages.forEach((image) => {
      if (image) {
        formDataObj.append('images', image)
      }
    })

    try {
      if (currentRequirement) {
        // setRequirements(requirements.map(req =>
        //   req.requirementId === currentRequirement.requirementId ? { ...formData, requirementId: req.requirementId } : req
        // ));
        setSnackbar({ open: true, message: 'Yêu cầu đã được cập nhật', severity: 'success' });
      } else {
        // setRequirements([...requirements, { ...formData, requirementId: Date.now() }]);
        await createRequirement(formDataObj, {
          onSuccess: (response) => {
            console.log('Success:', response);
            setSnackbar({ open: true, message: 'Yêu cầu mới đã được thêm', severity: 'success' });
          },
          onError: (error) => {
            console.error('Error:', error);
            setSnackbar({ open: true, message: 'Có lỗi xảy ra khi thêm yêu cầu', severity: 'error' });
          }
        });
      }
      handleCloseDialog()
    } finally {
      setIsCreating(false) // Reset loading state
    }
  }

  const handleOpenDialog = (requirement = null) => {
    if (requirement) {
      setCurrentRequirement(requirement);
      setFormData({
        name: requirement.assetName,
        description: requirement.assetDescription,
        startingPrice: requirement.assetPrice,
        productImages: requirement.imageRequirements.map(img => img.image),
        documentImages: ['', ''],
        status: requirement.status
      });
    } else {
      setCurrentRequirement(null);
      setFormData({
        name: '',
        description: '',
        startingPrice: '',
        productImages: ['', '', '', ''],
        documentImages: ['', ''],
        status: 'Pending'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentRequirement(null)
  }

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation({ open: true, id })
  }

  const handleDeleteRequirement = () => {
    deleteRequirement(deleteConfirmation.id)
    setSnackbar({ open: true, message: 'Yêu cầu đã được xóa', severity: 'success' });
    setDeleteConfirmation({ open: false, id: null });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleMenuOpen = (event, requirement) => {
    setAnchorEl(event.currentTarget)
    setSelectedRequirement(requirement)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedRequirement(null)
  }

  const canEdit = (status) => status === '0' || status === 'Pending'

  const filteredRequirements = useMemo(() => {
    return requirements.filter(req => {
      const matchesTab = activeTab === 0 ||
        (activeTab === 1 && req.status === '1') ||
        (activeTab === 2 && req.status === '0') ||
        (activeTab === 3 && req.status === '2');
      const matchesSearch = req.assetName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = priceFilter === '' || req.assetPrice <= parseInt(priceFilter);
      return matchesTab && matchesSearch && matchesPrice;
    });
  }, [requirements, activeTab, searchTerm, priceFilter]);

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color={primaryColor} align="center" mb={4}>
        Yêu cầu Bán đấu giá
      </Typography>
      <StyledPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            sx={{
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
            <Tab label="Tất cả" />
            <Tab label="Đang xử lý" />
            <Tab label="Đang chờ duyệt" />
            <Tab label="Đã từ chối" />
          </Tabs>
          <AnimatedButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
            >
              Tạo Yêu Cầu Mới
            </Button>
          </AnimatedButton>
        </Box>
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
            <MenuItem value="200000">Dưới 200.000₫</MenuItem>
            <MenuItem value="500000">Dưới 500.000₫</MenuItem>
            <MenuItem value="1000000">Dưới 1.000.000₫</MenuItem>
          </Select>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên Sản phẩm</StyledTableCell>
                <StyledTableCell align="right">Giá khởi điểm</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Hành động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequirements.map((req) => (
                <TableRow key={req.requirementId}>
                  <TableCell>{req.assetName}</TableCell>
                  <TableCell align="right">{`${req.assetPrice.toLocaleString()}₫`}</TableCell>
                  <TableCell align="center">
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
        <MenuItem onClick={() => {
          handleOpenDialog(selectedRequirement)
          handleMenuClose()
        }}>
          {canEdit(selectedRequirement?.status) ? 'Chỉnh sửa' : 'Xem chi tiết'}
        </MenuItem>
        {canEdit(selectedRequirement?.status) && (
          <MenuItem onClick={() => {
            handleDeleteConfirmation(selectedRequirement?.requirementId)
            handleMenuClose()
          }}>
            Xóa
          </MenuItem>
        )}
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: primaryColor, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {currentRequirement ? (canEdit(currentRequirement.status) ? 'Chỉnh sửa Yêu cầu' : 'Chi tiết Yêu cầu') : 'Tạo Yêu Cầu Mới'}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
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
                    startAdornment: <Typography color="textSecondary">₫</Typography>
                  }}
                  disabled={currentRequirement && !canEdit(currentRequirement.status)}
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
                          <ImagePreview style={{ backgroundImage: `url(${image instanceof File ? URL.createObjectURL(image) : image})` }}>
                            {(!currentRequirement || canEdit(currentRequirement.status)) && (
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteImage('productImages', index)}
                                sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                              >
                                <CloseIcon />
                              </IconButton>
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
                          <ImagePreview style={{ backgroundImage: `url(${image instanceof File ? URL.createObjectURL(image) : image})` }}>
                            {(!currentRequirement || canEdit(currentRequirement.status)) && (
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteImage('documentImages', index)}
                                sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                              >
                                <CloseIcon />
                              </IconButton>
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
                disabled={isCreating}
                sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
              >
                {isCreating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  currentRequirement ? 'Cập nhật' : 'Tạo Yêu cầu'
                )}
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
  )
}

export default AuctionRequest

