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
  Snackbar,
  Alert,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  InputAdornment,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useFilterAssets, useUpdateAssetStatus } from '~/hooks/assetHook'
import { useAppStore } from '~/store/appStore'
import AuctionCreationDialog from './component/AuctionCreationDialog'
import AssetDetailDialog from './component/AssetDetailDialog'
import AssetSuccessModal from './component/AssetSuccessModal'

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

const MyAssets = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isAuctionDialogOpen, setIsAuctionDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const { auth } = useAppStore()
  const [isAssetSuccessModalOpen, setAssetSuccessModalOpen] = useState(false)
  const [selectedAssetForSuccess, setSelectedAssetForSuccess] = useState(null)
  const [deliveryConfirmDialog, setDeliveryConfirmDialog] = useState(false)
  const { mutate: updateAssetStatus } = useUpdateAssetStatus()
  const { data, refetch } = useFilterAssets({ vendorId: auth?.user?.id })
  const assets = Array.isArray(data?.data) ? data.data : []

  const handleViewDetails = (asset) => {
    console.log('handleViewDetails called with asset:', asset)
    console.log('Asset status:', asset?.status)

    setSelectedAsset(asset)

    if (asset?.status === 'AUCTION_SUCCESS') {
      console.log('Opening AssetSuccessModal')
      setSelectedAssetForSuccess(asset)
      setAssetSuccessModalOpen(true)
    } else {
      console.log('Opening AssetDetailDialog')
      setOpenDialog(true)
    }
    handleMenuClose()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAsset(null)
  }

  const handleOpenAuctionDialog = () => {
    setIsAuctionDialogOpen(true)
  }

  const handleCloseAuctionDialog = () => {
    setIsAuctionDialogOpen(false)
  }

  const handleCloseAssetSuccessModal = () => {
    console.log('Closing AssetSuccessModal')
    setAssetSuccessModalOpen(false)
    setSelectedAssetForSuccess(null)
  }

  const handleConfirmDelivery = () => {
    setDeliveryConfirmDialog(true)
    handleMenuClose()
  }

  const handleCloseDeliveryDialog = () => {
    setDeliveryConfirmDialog(false)
  }

  const handleConfirmDeliveryAction = () => {
    if (!selectedAsset) return

    updateAssetStatus(
      { assetId: selectedAsset.assetId, status: 'DELIVERING' },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `Đã xác nhận giao hàng cho vật phẩm "${selectedAsset?.assetName}"`,
            severity: 'success'
          })
          setDeliveryConfirmDialog(false)
          setSelectedAsset(null)
          refetch()
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: 'Có lỗi khi cập nhật trạng thái giao hàng!',
            severity: 'error'
          })
        }
      }
    )
  }

  const handleCreateAuction = (auctionData) => {
    console.log('Creating auction:', auctionData)
    setSnackbar({ open: true, message: 'Phiên đấu giá đã được tạo', severity: 'success' })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleMenuOpen = (event, asset) => {
    setAnchorEl(event.currentTarget)
    setSelectedAsset(asset)
    console.log('Selected asset:', asset)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getStatusLabel = (status) => {
    switch (status) {
    case 'NOT_AUCTIONED':
      return 'Chưa đấu giá'
    case 'ONGOING':
      return 'Đang đấu giá'
    case 'AUCTION_SUCCESS':
      return 'Đấu giá thành công'
    case 'AUCTION_FAILED':
      return 'Đấu giá thất bại'
    case 'DELIVERING':
      return 'Đang giao hàng'
    case 'RECEIVED':
      return 'Đã nhận hàng'
    case 'COMPLETED':
      return 'Hoàn thành'
    default:
      return status
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
    case 'NOT_AUCTIONED':
      return 'default'
    case 'ONGOING':
      return 'warning'
    case 'AUCTION_SUCCESS':
      return 'success'
    case 'AUCTION_FAILED':
      return 'error'
    case 'DELIVERING':
      return 'info'
    case 'RECEIVED':
      return 'success'
    case 'COMPLETED':
      return 'success'
    default:
      return 'default'
    }
  }

  const getStatusCount = (status) => {
    if (status === 'ALL') return assets.length
    if (status === 'COMPLETED_ALL')
      return assets.filter((asset) => ['RECEIVED', 'COMPLETED'].includes(asset.status)).length
    return assets.filter((asset) => asset.status === status).length
  }

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesTab =
        activeTab === 0 ||
        (activeTab === 1 && asset.status === 'NOT_AUCTIONED') ||
        (activeTab === 2 && asset.status === 'ONGOING') ||
        (activeTab === 3 && asset.status === 'AUCTION_SUCCESS') ||
        (activeTab === 4 && asset.status === 'AUCTION_FAILED') ||
        (activeTab === 5 && asset.status === 'DELIVERING') ||
        (activeTab === 6 && ['RECEIVED', 'COMPLETED'].includes(asset.status))
      const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = priceFilter === '' || asset.assetPrice <= Number.parseInt(priceFilter)
      return matchesTab && matchesSearch && matchesPrice
    })
  }, [assets, activeTab, searchTerm, priceFilter])

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Vật phẩm của tôi
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Quản lý thông tin vật phẩm của bạn
        </Typography>
      </Box>

      {/* Status Count Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {[
          { key: 'ALL', label: 'Tất cả', index: 0 },
          { key: 'NOT_AUCTIONED', label: 'Chưa đấu giá', index: 1 },
          { key: 'ONGOING', label: 'Đang đấu giá', index: 2 },
          { key: 'AUCTION_SUCCESS', label: 'Thành công', index: 3 },
          { key: 'AUCTION_FAILED', label: 'Thất bại', index: 4 },
          { key: 'DELIVERING', label: 'Đang giao', index: 5 },
          { key: 'COMPLETED_ALL', label: 'Hoàn thành', index: 6 }
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
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                borderRadius: '12px'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              }
            }}
          >
            <MenuItem value="">Tất cả giá</MenuItem>
            <MenuItem value="1000000">Dưới 1.000.000₫</MenuItem>
            <MenuItem value="5000000">Dưới 5.000.000₫</MenuItem>
            <MenuItem value="10000000">Dưới 10.000.000₫</MenuItem>
          </Select>
        </Box>

        {/* Enhanced Asset Table với scroll */}
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
                {['Hình ảnh', 'Thông tin vật phẩm', 'Giá khởi điểm', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map(
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
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.05)' } }}>
                  <TableCell sx={{ padding: '16px' }}>
                    <Box
                      component="img"
                      src={asset.mainImage || '/placeholder.svg?height=80&width=80'}
                      alt={asset.assetName}
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
                      {asset.assetName}
                    </Typography>
                    <DescriptionCell>
                      <div
                        className="description-content"
                        dangerouslySetInnerHTML={{
                          __html: asset.assetDescription || 'Không có mô tả'
                        }}
                      />
                    </DescriptionCell>
                  </TableCell>
                  <TableCell sx={{ padding: '16px' }}>
                    <Typography variant="body1" fontWeight="600" sx={{ color: '#b41712' }}>
                      {asset.assetPrice?.toLocaleString('vi-VN')}₫
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '16px' }}>
                    <Chip
                      label={getStatusLabel(asset.status)}
                      color={getStatusColor(asset.status)}
                      size="small"
                      variant="filled"
                      sx={{ borderRadius: '16px', fontWeight: '500' }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '16px' }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(asset.createdAt).toLocaleDateString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '16px' }}>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, asset)}
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
              {filteredAssets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography variant="body1" color="text.secondary">
                      Không tìm thấy vật phẩm nào
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
          onClick={() => handleViewDetails(selectedAsset)}
          sx={{
            borderRadius: '4px',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' }
          }}
        >
          Xem chi tiết
        </MenuItem>

        {selectedAsset?.status === 'NOT_AUCTIONED' && (
          <MenuItem
            onClick={() => {
              handleOpenAuctionDialog()
              handleMenuClose()
            }}
            sx={{
              borderRadius: '4px',
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' }
            }}
          >
            Tạo phiên đấu giá
          </MenuItem>
        )}

        {selectedAsset?.status === 'AUCTION_SUCCESS' && (
          <MenuItem
            onClick={handleConfirmDelivery}
            sx={{
              borderRadius: '4px',
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <LocalShippingIcon fontSize="small" sx={{ color: '#b41712' }} />
            Xác nhận đã giao hàng
          </MenuItem>
        )}

        {selectedAsset?.status === 'DELIVERING' && (
          <MenuItem
            onClick={() => handleMenuClose()}
            sx={{
              borderRadius: '4px',
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' }
            }}
          >
            Cập nhật trạng thái giao hàng
          </MenuItem>
        )}

        {selectedAsset?.status === 'AUCTION_FAILED' && (
          <MenuItem
            onClick={() => {
              handleOpenAuctionDialog()
              handleMenuClose()
            }}
            sx={{
              borderRadius: '4px',
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' }
            }}
          >
            Tạo phiên đấu giá mới
          </MenuItem>
        )}
      </Menu>

      {/* Delivery Confirmation Dialog */}
      <Dialog
        open={deliveryConfirmDialog}
        onClose={handleCloseDeliveryDialog}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: '1px solid rgba(180, 23, 18, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#b41712', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingIcon />
          Xác nhận giao hàng
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Bạn có chắc chắn muốn xác nhận rằng vật phẩm{' '}
            <strong style={{ color: '#b41712' }}>"{selectedAsset?.assetName}"</strong> đang được giao hàng không?
          </DialogContentText>
          <Box
            sx={{
              p: 2,
              backgroundColor: 'rgba(180, 23, 18, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(180, 23, 18, 0.2)'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Lưu ý:</strong> Sau khi xác nhận, trạng thái vật phẩm sẽ được chuyển thành "Đang giao hàng" và
              người mua sẽ được thông báo về việc giao hàng.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCloseDeliveryDialog}
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
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDeliveryAction}
            variant="contained"
            startIcon={<CheckCircleIcon />}
            sx={{
              backgroundColor: '#b41712',
              '&:hover': {
                backgroundColor: '#a01510'
              }
            }}
          >
            Xác nhận giao hàng
          </Button>
        </DialogActions>
      </Dialog>

      <AuctionCreationDialog
        open={isAuctionDialogOpen}
        onClose={handleCloseAuctionDialog}
        asset={selectedAsset}
        refresh={refetch}
      />

      <AssetDetailDialog open={openDialog} onClose={handleCloseDialog} asset={selectedAsset} />

      <AssetSuccessModal
        open={isAssetSuccessModalOpen}
        handleClose={handleCloseAssetSuccessModal}
        asset={selectedAssetForSuccess}
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MyAssets
