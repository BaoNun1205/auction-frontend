import React, { useState, useEffect } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableRow, CircularProgress, Typography, Popover, MenuItem as MuiMenuItem } from '@mui/material'
import { Eye, SlidersHorizontal, Download, MoreVertical, Trash2 } from 'lucide-react'
import SelectComponent from '~/components/SelectComponent/SelectComponent'
import SearchTextField from '~/components/SearchTextFieldComponent/SearchTextField'
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent'
import IconButtonComponent from '~/components/IconButtonComponent/IconButtonComponent'
import PaginationControl from '~/components/PanigationControlComponent/PaginationControl'
import CreateCategory from '~/features/Category/AddCategory/AddCategory'
import {
  StyledContainer,
  StyledCheckbox,
  StyledControlBox,
  StyledHeaderBox,
  StyledInnerBox,
  StyledSecondaryBox,
  StyledSpan,
  StyledStatusBox,
  StyledSubtitleBox,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
  StyledTitleBox
} from '~/features/style'
import { useFilterAssets } from '~/hooks/assetHook'
import splitDateTime from '~/utils/SplitDateTime'
import ListEmpty from '~/components/ListEmpty/ListEmpty'
import ActionMenu from '~/components/IconMenuComponent/IconMenuComponent'
import { useNavigate } from 'react-router-dom'

const AssetList = () => {
  const [selectedAssets, setSelectedAssets] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [vendorId, setVendorId] = useState('')
  const [assetName, setAssetName] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(9999999999999)
  const [inspectorId, setInspectorId] = useState('')
  const [typeId, setTypeId] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const payload = {
    vendorId,
    assetName,
    minPrice,
    maxPrice,
    inspectorId,
    typeId,
    status,
    page,
    size
  }


  const { data, error, isLoading, refetch } = useFilterAssets(payload)
  const assets = Array.isArray(data?.data) ? data.data : []

  console.log('data: ', assets[0]?.assetPrice)

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedAssets(assets.map(asset => asset.assetId))
      setShowDeleteButton(true)
    } else {
      setSelectedAssets([])
      setShowDeleteButton(false)
    }
  }

  const handleSelectAsset = (event, assetId) => {
    const newSelectedAssets = event.target.checked
      ? [...selectedAssets, assetId]
      : selectedAssets.filter(id => id !== assetId)

    setSelectedAssets(newSelectedAssets)
    setShowDeleteButton(newSelectedAssets.length > 0)
  }

  const handleDelete = () => {
    console.log('Deleting selected assets:', selectedAssets)
    // Implement delete logic here
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleSizeChange = (newSize) => {
    setSize(newSize)
    setPage(0)
  }

  const publishMenuItems = [
    { value: 'NOT_AUCTIONED', label: 'Chưa đấu giá' },
    { value: 'ONGOING', label: 'Đang đấu giá' },
    { value: 'AUCTION_SUCCESS', label: 'Đấu giá thành công' },
    { value: 'AUCTION_FAILED', label: 'Đấu giá thất bại' }
  ]

  const columnNames = ['Tên vật phẩm', 'Ngày tạo', 'Giá khởi điểm', 'Trạng thái', 'Người bán', 'Người kiểm duyệt']

  useEffect(() => {
    refetch(); // Trigger refetch when status changes
  }, [status, page, size])

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Danh sách vật phẩm</StyledTitleBox>
            <StyledSubtitleBox>
              Vật phẩm • <Box component="span" sx={{ color: 'primary.disable' }}>Danh sách</Box>
            </StyledSubtitleBox>
          </Box>
        </StyledHeaderBox>

        <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
          <StyledControlBox>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SelectComponent
                value={status} 
                onChange={(event) => setStatus(event.target.value)}
                // defaultValue=""
                displayEmpty
                menuItems={publishMenuItems}
                placeholder="Tất cả"
              />
              <SearchTextField
                value={assetName}
                onChange={(event) => setAssetName(event.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, color: 'primary.textMain' }}>
              {showDeleteButton && (
                <Button
                  startIcon={<Trash2 size={20} />}
                  sx={{ color: 'error.main' }}
                  onClick={handleDelete}
                >
                  Delete ({selectedAssets.length})
                </Button>
              )}
            </Box>
          </StyledControlBox>
        </StyledSecondaryBox>

        {assets.length > 0 ? (
          <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
            <StyledTableContainer sx={{ maxHeight: rowsPerPage === 5 ? 500 : 'auto', overflowY: rowsPerPage === 5 ? 'auto' : 'visible',}}>
              <Table stickyHeader>
                <StyledTableHead sx={(theme) => ({ bgcolor: theme.palette.primary.buttonHover })}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <StyledCheckbox
                        checked={selectedAssets.length === assets.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    {columnNames.map((columnName, index) => (
                      <StyledTableCell key={index}>
                        {columnName}
                      </StyledTableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={columnNames.length + 2}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={columnNames.length + 2}>
                        <Typography color="error">Error fetching assets</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    assets.map((asset) => {
                      const { date, time } = splitDateTime(asset.createdAt)
                      return (
                        <StyledTableRow key={asset.assetId}>
                          <TableCell padding="checkbox">
                            <StyledCheckbox
                              checked={selectedAssets.includes(asset.assetId)}
                              onChange={(event) => handleSelectAsset(event, asset.assetId)}
                              onClick={(event) => event.stopPropagation()}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                component="img"
                                src={asset.mainImage}
                                sx={{ width: 48, height: 48, borderRadius: 1, mr: 2 }}
                              />
                              <Box>
                                <StyledSpan>{asset.assetName}</StyledSpan>
                                <Box sx={{ color: 'primary.textSecondary' }}>{asset.type.typeName || 'N/A'}</Box>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{date} </StyledSpan>
                            <StyledSpan>{time}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(asset.assetPrice)}
                            </StyledSpan>
                          </TableCell>
                          <TableCell>
                          <StyledStatusBox
                              sx={() => {
                                if (asset.status === 'NOT_AUCTIONED') {
                                  return {
                                    bgcolor: '#B0BEC5',  // Gray for inactive state (light gray)
                                    color: '#000000'  // Black text
                                  }
                                } else if (asset.status === 'ONGOING') {
                                  return {
                                    bgcolor: '#1E88E5',  // Blue for ongoing state
                                    color: '#ffffff'  // White text
                                  }
                                } else if (asset.status === 'AUCTION_FAILED') {
                                  return {
                                    bgcolor: '#F44336',  // Red for failed auction
                                    color: '#ffffff'  // White text
                                  }
                                }
                                return {
                                  bgcolor: '#00C853',  // Green for successful auction
                                  color: '#ffffff'  // White text
                                }
                              }}
                            >
                              {asset.status === 'NOT_AUCTIONED'
                                ? 'Chưa đấu giá'
                                : asset.status === 'ONGOING'
                                  ? 'Đang đấu giá'
                                  : asset.status === 'AUCTION_SUCCESS'
                                    ? 'Đấu giá thành công'
                                    : 'Đấu giá thất bại'}
                            </StyledStatusBox>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{asset.vendor.username || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{asset.inspector.user.username || 'N/A'}</StyledSpan>
                          </TableCell>
                        </StyledTableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <PaginationControl
              page={page}
              rowsPerPage={size}
              totalItems={data?.total}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleSizeChange}
            />
          </StyledSecondaryBox>
        ) : (
          <StyledSecondaryBox>
            <ListEmpty nameList="vật phẩm" />
            <PaginationControl
              page={page}
              rowsPerPage={size}
              totalItems={data?.total}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleSizeChange}
            />
          </StyledSecondaryBox>
        )}
      </StyledInnerBox>
    </StyledContainer>
  )
}

export default AssetList