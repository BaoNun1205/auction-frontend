import React from 'react'
import { IconButton, Menu, MenuItem, Box } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningIcon from '@mui/icons-material/Warning'
import GavelIcon from '@mui/icons-material/Gavel'
import { useTranslation } from 'react-i18next'

const ActionMenu = ({
  selectedAsset,
  handleDeleteAsset,
  handleOpenEditDialog,
  handleOpenViewDialog,
  handleOpenAuctionDialog,
  isAuctionAvailable
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            handleOpenViewDialog()
            handleMenuClose()
          }}
          sx={{
            borderRadius: '4px',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(3, 172, 14, 0.1)' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <VisibilityIcon fontSize="small" sx={{ color: '#03ac0e' }} />
          {t('view')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenEditDialog()
            handleMenuClose()
          }}
          sx={{
            borderRadius: '4px',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(249, 168, 37, 0.1)' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <EditIcon fontSize="small" sx={{ color: '#f9a825' }} />
          {t('edit')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteAsset()
            handleMenuClose()
          }}
          sx={{
            borderRadius: '4px',
            mx: 1,
            '&:hover': { backgroundColor: 'rgba(233, 30, 99, 0.1)' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <DeleteIcon fontSize="small" sx={{ color: '#e91e63' }} />
          {t('delete')}
        </MenuItem>
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
            <WarningIcon fontSize="small" sx={{ color: '#b41712' }} />
            Tạo lại phiên đấu giá
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
    </Box>
  )
}

export default ActionMenu