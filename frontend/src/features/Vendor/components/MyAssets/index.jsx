import React, { useState, useMemo } from 'react'
import { Box, Typography, Snackbar, Alert, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFilterAssets, useUpdateAssetStatus } from '~/hooks/assetHook'
import { useAppStore } from '~/store/appStore'
import AuctionCreationDialog from './component/AuctionCreationDialog'
import AssetDetailDialog from './component/AssetDetailDialog'
import AssetSuccessModal from './component/AssetSuccessModal'
import StatusChips from './component/StatusChips.jsx'
import Filters from './component/Filters'
import AssetTable from './component/AssetTable'
import ActionMenu from './component/ActionMenu'
import DeliveryConfirmationDialog from './component/DeliveryConfirmationDialog'
import ReceivedConfirmationDialog from './component/ReceivedConfirmationDialog'
import DeliveryTrackingDialog from './component/DeliveryTrackingDialog'

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(180, 23, 18, 0.08)',
  border: '1px solid rgba(180, 23, 18, 0.1)'
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
  const [receivedConfirmDialog, setReceivedConfirmDialog] = useState(false)
  const [trackingDialog, setTrackingDialog] = useState(false)
  const { mutate: updateAssetStatus } = useUpdateAssetStatus()
  const { data, refetch } = useFilterAssets({ vendorId: auth?.user?.id })
  const assets = Array.isArray(data?.data) ? data.data : []

  const handleViewDetails = (asset) => {
    console.log('handleViewDetails called with asset:', asset)
    console.log('Asset status:', asset?.status)

    setSelectedAsset(asset)

    if (asset?.status === 'AUCTION_SUCCESS' || asset?.status === 'PAYMENT_SUCCESSFUL') {
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

  const handleConfirmReceived = () => {
    setReceivedConfirmDialog(true)
    handleMenuClose()
  }

  const handleCloseReceivedDialog = () => {
    setReceivedConfirmDialog(false)
  }

  const handleTrackDelivery = () => {
    setTrackingDialog(true)
  }

  const handleCloseTrackingDialog = () => {
    setTrackingDialog(false)
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

  const handleConfirmReceivedAction = () => {
    if (!selectedAsset) return

    updateAssetStatus(
      { assetId: selectedAsset.assetId, status: 'RECEIVED' },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `Đã xác nhận giao hàng thành công vật phẩm "${selectedAsset?.assetName}"`,
            severity: 'success'
          })
          setReceivedConfirmDialog(false)
          setSelectedAsset(null)
          refetch()
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: 'Có lỗi khi cập nhật trạng thái!',
            severity: 'error'
          })
        }
      }
    )
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

  const getStatusCount = (status) => {
    if (status === 'ALL') return assets.length
    return assets.filter((asset) => asset.status === status).length
  }

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesTab =
        activeTab === 0 ||
        (activeTab === 1 && asset.status === 'NOT_AUCTIONED') ||
        (activeTab === 2 && asset.status === 'ONGOING') ||
        (activeTab === 3 && asset.status === 'AUCTION_SUCCESS') ||
        (activeTab === 4 && asset.status === 'PAYMENT_SUCCESSFUL') ||
        (activeTab === 5 && asset.status === 'DELIVERING') ||
        (activeTab === 6 && asset.status === 'RECEIVED') ||
        (activeTab === 7 && asset.status === 'COMPLETED') ||
        (activeTab === 8 && asset.status === 'AUCTION_FAILED') ||
        (activeTab === 9 && asset.status === 'CANCELED')
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

      <StatusChips activeTab={activeTab} setActiveTab={setActiveTab} getStatusCount={getStatusCount} />
      <StyledPaper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />
        <AssetTable filteredAssets={filteredAssets} handleMenuOpen={handleMenuOpen} />
      </StyledPaper>
      <ActionMenu
        anchorEl={anchorEl}
        selectedAsset={selectedAsset}
        handleMenuClose={handleMenuClose}
        handleViewDetails={handleViewDetails}
        handleOpenAuctionDialog={handleOpenAuctionDialog}
        handleConfirmDelivery={handleConfirmDelivery}
        handleConfirmReceived={handleConfirmReceived}
        handleTrackDelivery={handleTrackDelivery}
      />
      <DeliveryConfirmationDialog
        open={deliveryConfirmDialog}
        selectedAsset={selectedAsset}
        handleClose={handleCloseDeliveryDialog}
        handleConfirm={handleConfirmDeliveryAction}
      />
      <ReceivedConfirmationDialog
        open={receivedConfirmDialog}
        selectedAsset={selectedAsset}
        handleClose={handleCloseReceivedDialog}
        handleConfirm={handleConfirmReceivedAction}
      />
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
      <DeliveryTrackingDialog open={trackingDialog} onClose={handleCloseTrackingDialog} asset={selectedAsset} />
    </Box>
  )
}

export default MyAssets
