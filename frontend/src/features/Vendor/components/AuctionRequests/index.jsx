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
  Tab,
  Tabs,
  InputAdornment,
  Select,
  CircularProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import 'react-quill/dist/quill.snow.css'
import { useCreateRequirement, useDeleteRequirement, useRequirementsByVendorId, useupdateRequirement } from '~/hooks/requirementHook'
import { useAppStore } from '~/store/appStore'
import RequirementFormContent from './RequirementFormContent'
import { AnimatedButton, StyledChip, StyledPaper, StyledTableCell } from './style'
import RequirementsTable from './component/RequirementsTable'

const primaryColor = '#b41712'

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
  const { data, refetch } = useRequirementsByVendorId(auth.user.id)
  const requirements = Array.isArray(data) ? data : []

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    productImages: ['', '', '', ''],
    documentImages: ['', ''],
    status: '0'
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
    setIsCreating(true)

    const formDataObj = new FormData()
    formDataObj.append('assetName', formData.name)
    formDataObj.append('assetPrice', formData.startingPrice.replace(/\./g, ''))
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
        updateRequirement({ requirementId: currentRequirement.requirementId, payload: formDataObj }, {
          onSuccess: (response) => {
            console.log('Success:', response)
            setSnackbar({ open: true, message: 'Yêu cầu đã được cập nhật', severity: 'success' })
            refetch()
          },
          onError: (error) => {
            console.error('Error:', error)
            setSnackbar({ open: true, message: 'Có lỗi xảy ra khi cập nhật yêu cầu', severity: 'error' })
          }
        })

        console.log(currentRequirement)


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
        productImages: requirement.imageRequirements.slice(0, 4).map(img => img.image),
        documentImages: requirement.imageRequirements.slice(4, 6).map(img => img.image),
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

  const filteredRequirements = useMemo(() => {
    return requirements.filter(req => {
      const matchesTab = activeTab === 0 ||
        (activeTab === 1 && req.status === '1') ||
        (activeTab === 2 && req.status === '0') ||
        (activeTab === 3 && req.status === '2')
      const matchesSearch = req.assetName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = priceFilter === '' || req.assetPrice <= parseInt(priceFilter)
      return matchesTab && matchesSearch && matchesPrice
    })
  }, [requirements, activeTab, searchTerm, priceFilter])

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Yêu cầu bán đấu giá
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Quản lý các yêu cầu bán đấu giá của bạn
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
        <RequirementsTable filteredRequirements={filteredRequirements} handleMenuOpen={handleMenuOpen} />
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
        {canDelete(selectedRequirement?.status) && (
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
          <RequirementFormContent
            formData={formData}
            handleInputChange={handleInputChange}
            handleDescriptionChange={handleDescriptionChange}
            handleImageUpload={handleImageUpload}
            handleDeleteImage={handleDeleteImage}
            canEdit={canEdit(currentRequirement?.status)}
            currentRequirement={currentRequirement}
          />
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
                disabled={isPendingCreate}
                sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#8B110E' } }}
              >
                {isPendingCreate ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  currentRequirement ? 'Gửi lại' : 'Tạo Yêu cầu'
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AuctionRequest

