import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Button,
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
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Select,
  CircularProgress,
  Paper,
  Chip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import 'react-quill/dist/quill.snow.css'
import {
  useCreateRequirement,
  useDeleteRequirement,
  useRequirementsByVendorId,
  useupdateRequirement
} from '~/hooks/requirementHook'
import { useAppStore } from '~/store/appStore'
import RequirementFormContent from './RequirementFormContent'
import AuctionRequestSkeleton from './component/AuctionRequestTableRowSkeleton'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(180, 23, 18, 0.08)',
  border: '1px solid rgba(180, 23, 18, 0.1)'
})

const DescriptionCell = styled(Box)({
  maxWidth: '300px',
  '& .description-content': {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.875rem',
    color: '#666',
    lineHeight: 1.4,
    '& p': {
      margin: '0 !important',
      padding: '0 !important',
      fontSize: 'inherit !important',
      color: 'inherit !important'
    },
    '& *': {
      fontSize: 'inherit !important',
      color: 'inherit !important',
      margin: '0 !important',
      padding: '0 !important'
    }
  }
})

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
  const { mutate: deleteRequirement } = useDeleteRequirement()
  const { mutate: createRequirement, isPending: isPendingCreate } = useCreateRequirement()
  const { mutate: updateRequirement, isPending: isPendingUpdate } = useupdateRequirement()
  const { auth } = useAppStore()
  const { data, isLoading, isError, refetch } = useRequirementsByVendorId(auth.user.id)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    productImages: ['', '', '', ''],
    documentImages: ['', ''],
    status: '0'
  })

  const requirements = Array.isArray(data) ? data : []

  const filteredRequirements = useMemo(() => {
    return requirements.filter((req) => {
      const matchesTab =
        activeTab === 0 ||
        (activeTab === 1 && req.status === '1') ||
        (activeTab === 2 && req.status === '0') ||
        (activeTab === 3 && req.status === '2')
      const matchesSearch = req.assetName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = priceFilter === '' || req.assetPrice <= Number.parseInt(priceFilter)
      return matchesTab && matchesSearch && matchesPrice
    })
  }, [requirements, activeTab, searchTerm, priceFilter])

  if (isLoading) {
    return <AuctionRequestSkeleton />
  }

  // Show error state
  if (isError) {
    return (
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
        </Typography>
      </Box>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDescriptionChange = (content) => {
    setFormData({ ...formData, description: content })
  }

  const handleImageUpload = (e, type, index, setFieldValue) => {
    const file = e.target.files[0]
    if (file) {
      const newImages = [...formData[type]]
      newImages[index] = file
      setFormData({ ...formData, [type]: newImages })
      if (setFieldValue) {
        setFieldValue(type, newImages)
      }
    }
  }

  const handleDeleteImage = (type, index) => {
    const newImages = [...formData[type]]
    newImages[index] = ''
    setFormData({ ...formData, [type]: newImages })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsCreating(true)

    const formDataObj = new FormData()
    formDataObj.append('assetName', formData.name)
    const priceAsString = String(formData.startingPrice).replace(/\./g, '')
    formDataObj.append('assetPrice', priceAsString)
    formDataObj.append('assetDescription', formData.description)
    formDataObj.append('status', '0')
    const allImages = [...formData.productImages, ...formData.documentImages]

    allImages.forEach((image) => {
      if (image) {
        formDataObj.append('images', image)
      }
    })

    try {
      if (currentRequirement) {
        updateRequirement(
          { requirementId: currentRequirement.requirementId, payload: formDataObj },
          {
            onSuccess: (response) => {
              console.log('Success:', response)
              setSnackbar({ open: true, message: 'Yêu cầu đã được cập nhật', severity: 'success' })
              refetch()
              handleCloseDialog()
            },
            onError: (error) => {
              console.error('Error:', error)
              setSnackbar({ open: true, message: 'Có lỗi xảy ra khi cập nhật yêu cầu', severity: 'error' })
            }
          }
        )
      } else {
        createRequirement(formDataObj, {
          onSuccess: (response) => {
            console.log('Success:', response)
            setSnackbar({ open: true, message: 'Yêu cầu mới đã được tạo', severity: 'success' })
            refetch()
            handleCloseDialog()
          },
          onError: (error) => {
            console.error('Error:', error)
            setSnackbar({ open: true, message: 'Có lỗi xảy ra khi thêm yêu cầu', severity: 'error' })
            handleCloseDialog()
          }
        })
      }
    } finally {
      setIsCreating(false)
    }
  }

  const handleOpenDialog = (requirement = null) => {
    if (requirement) {
      setCurrentRequirement(requirement)
      setFormData({
        name: requirement.assetName,
        description: requirement.assetDescription,
        startingPrice: requirement.assetPrice,
        productImages: requirement.imageRequirements.slice(0, 4).map((img) => img.image),
        documentImages: requirement.imageRequirements.slice(4, 6).map((img) => img.image),
        status: requirement.status
      })
    } else {
      setCurrentRequirement(null)
      setFormData({
        name: '',
        description: '',
        startingPrice: '',
        productImages: ['', '', '', ''],
        documentImages: ['', ''],
        status: '0'
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentRequirement(null)
  }

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation({ open: true, id })
  }

  const handleDeleteRequirement = () => {
    deleteRequirement(deleteConfirmation.id)
    setSnackbar({ open: true, message: 'Yêu cầu đã được xóa', severity: 'success' })
    setDeleteConfirmation({ open: false, id: null })
  }

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

  const canEdit = (status) => status === '2'
  const canDelete = (status) => status === '0' || status === '2'

  const getStatusLabel = (status) => {
    switch (status) {
    case '0':
      return 'Đang chờ duyệt'
    case '1':
      return 'Đã được duyệt'
    case '2':
      return 'Đã từ chối'
    default:
      return 'Không xác định'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
    case '0':
      return 'warning'
    case '1':
      return 'success'
    case '2':
      return 'error'
    default:
      return 'default'
    }
  }

  const getStatusCount = (status) => {
    if (status === 'ALL') return requirements.length
    return requirements.filter((req) => req.status === status).length
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Yêu cầu bán đấu giá
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Quản lý các yêu cầu bán đấu giá của bạn
        </Typography>
      </Box>

      {/* Status Count Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {[
          { key: 'ALL', label: 'Tất cả', index: 0 },
          { key: '1', label: 'Đã được duyệt', index: 1 },
          { key: '0', label: 'Đang chờ duyệt', index: 2 },
          { key: '2', label: 'Đã từ chối', index: 3 }
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
              placeholder="Tìm kiếm theo tên vật phẩm"
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
                  borderRadius: '12px',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  }
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
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                }
              }}
            >
              <MenuItem value="">Tất cả giá</MenuItem>
              <MenuItem value="200000">Dưới 200.000₫</MenuItem>
              <MenuItem value="500000">Dưới 500.000₫</MenuItem>
              <MenuItem value="1000000">Dưới 1.000.000₫</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              ml: 2,
              backgroundColor: '#b41712',
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              '&:hover': { backgroundColor: '#a01510' },
              whiteSpace: 'nowrap'
            }}
          >
            Tạo Yêu Cầu Mới
          </Button>
        </Box>

        {/* Enhanced Requirements Table với scroll */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            flex: 1,
            overflow: 'auto',
            maxHeight: 'calc(100vh - 350px)',
            borderRadius: '12px',
            border: '1px solid rgba(180, 23, 18, 0.2)'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {['Hình ảnh', 'Thông tin yêu cầu', 'Giá khởi điểm', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map(
                  (header, index) => (
                    <TableCell
                      key={header}
                      align={index === 5 ? 'center' : 'left'}
                      sx={{ fontWeight: '600', fontSize: '0.875rem' }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequirements.map((requirement) => (
                <TableRow
                  key={requirement.requirementId}
                  hover
                  sx={{ '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.05)' } }}
                >
                  <TableCell sx={{ padding: '16px' }}>
                    <Box
                      component="img"
                      src={requirement.imageRequirements?.[0]?.image || '/placeholder.svg?height=80&width=80'}
                      alt={requirement.assetName}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid rgba(180, 23, 18, 0.2)'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 350, padding: '16px' }}>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1, color: '#1a1a1a' }}>
                      {requirement.assetName}
                    </Typography>
                    <DescriptionCell>
                      <div
                        className="description-content"
                        dangerouslySetInnerHTML={{
                          __html: requirement.assetDescription || 'Không có mô tả'
                        }}
                      />
                    </DescriptionCell>
                  </TableCell>
                  <TableCell sx={{ padding: '16px' }}>
                    <Typography variant="body1" fontWeight="600" sx={{ color: '#b41712' }}>
                      {requirement.assetPrice?.toLocaleString('vi-VN')}₫
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '16px' }}>
                    <Chip
                      label={getStatusLabel(requirement.status)}
                      color={getStatusColor(requirement.status)}
                      size="small"
                      variant="filled"
                      sx={{ borderRadius: '16px', fontWeight: '500' }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '16px' }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(requirement.createdAt).toLocaleDateString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '16px' }}>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, requirement)}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(180, 23, 18, 0.1)',
                        color: '#b41712',
                        '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.2)' }
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRequirements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography variant="body1" color="text.secondary">
                      Không tìm thấy yêu cầu nào
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
          onClick={() => {
            handleOpenDialog(selectedRequirement)
            handleMenuClose()
          }}
          sx={{
            borderRadius: '4px',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {canEdit(selectedRequirement?.status) ? (
            <>
              <EditIcon fontSize="small" sx={{ color: '#b41712' }} />
              Chỉnh sửa
            </>
          ) : (
            <>
              <VisibilityIcon fontSize="small" sx={{ color: '#b41712' }} />
              Xem chi tiết
            </>
          )}
        </MenuItem>
        {canDelete(selectedRequirement?.status) && (
          <MenuItem
            onClick={() => {
              handleDeleteConfirmation(selectedRequirement?.requirementId)
              handleMenuClose()
            }}
            sx={{
              borderRadius: '4px',
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DeleteIcon fontSize="small" sx={{ color: '#f44336' }} />
            Xóa
          </MenuItem>
        )}
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid rgba(180, 23, 18, 0.2)'
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: '#b41712',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '12px 12px 0 0'
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {currentRequirement
              ? canEdit(currentRequirement.status)
                ? 'Chỉnh sửa Yêu cầu'
                : 'Chi tiết Yêu cầu'
              : 'Tạo Yêu Cầu Mới'}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <RequirementFormContent
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleDescriptionChange={handleDescriptionChange}
            handleImageUpload={handleImageUpload}
            handleDeleteImage={handleDeleteImage}
            canEdit={canEdit(currentRequirement?.status)}
            currentRequirement={currentRequirement}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderColor: '#b41712',
              color: '#b41712',
              '&:hover': {
                borderColor: '#a01510',
                backgroundColor: 'rgba(180, 23, 18, 0.1)'
              }
            }}
          >
            {currentRequirement && !canEdit(currentRequirement.status) ? 'Đóng' : 'Hủy'}
          </Button>
          {(!currentRequirement || canEdit(currentRequirement.status)) && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isPendingCreate || isPendingUpdate}
              sx={{
                backgroundColor: '#b41712',
                '&:hover': { backgroundColor: '#a01510' },
                minWidth: '120px'
              }}
            >
              {isPendingCreate || isPendingUpdate ? (
                <CircularProgress size={24} color="inherit" />
              ) : currentRequirement ? (
                'Gửi lại'
              ) : (
                'Tạo Yêu cầu'
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmation.open}
        onClose={() => setDeleteConfirmation({ open: false, id: null })}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid rgba(244, 67, 54, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#f44336', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <DeleteIcon />
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa yêu cầu này? Hành động này không thể hoàn tác.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setDeleteConfirmation({ open: false, id: null })}
            variant="outlined"
            sx={{
              borderColor: '#666',
              color: '#666',
              '&:hover': {
                borderColor: '#555',
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleDeleteRequirement}
            variant="contained"
            sx={{
              backgroundColor: '#f44336',
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: '8px',
            '& .MuiAlert-icon': {
              color: snackbar.severity === 'success' ? '#b41712' : undefined
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AuctionRequest
