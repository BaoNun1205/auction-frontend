import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import GavelIcon from '@mui/icons-material/Gavel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ActionMenu = ({
  anchorEl,
  selectedAsset,
  handleMenuClose,
  handleViewDetails,
  handleOpenAuctionDialog,
  handleConfirmDelivery,
  handleConfirmReceived,
  handleTrackDelivery
}) => (
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
        '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <VisibilityIcon fontSize="small" sx={{ color: '#b41712' }} />
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
          '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <GavelIcon fontSize="small" sx={{ color: '#b41712' }} />
        Tạo phiên đấu giá
      </MenuItem>
    )}
    {selectedAsset?.status === 'PAYMENT_SUCCESSFUL' && (
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
        Xác nhận giao hàng
      </MenuItem>
    )}
    {selectedAsset?.status === 'DELIVERING' && (
      <>
        <MenuItem
          onClick={() => {
            handleTrackDelivery() // Gọi hàm mở dialog theo dõi
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
          <LocalShippingIcon fontSize="small" sx={{ color: '#b41712' }} />
          Theo dõi giao hàng
        </MenuItem>
        <MenuItem
          onClick={handleConfirmReceived}
          sx={{
            borderRadius: '4px',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <CheckCircleIcon fontSize="small" sx={{ color: '#b41712' }} />
          Đã giao hàng
        </MenuItem>
      </>
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
          '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.1)' },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <GavelIcon fontSize="small" sx={{ color: '#b41712' }} />
        Tạo phiên đấu giá mới
      </MenuItem>
    )}
    {selectedAsset?.status === 'CANCELED' && (
      <MenuItem
        onClick={() => {
          handleOpenAuctionDialog()
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
        <GavelIcon fontSize="small" sx={{ color: '#b41712' }} />
          Tạo phiên đấu giá mới
      </MenuItem>
    )}
  </Menu>
)

export default ActionMenu
