import React, { useState } from 'react'
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

  const handleCreateAuctionSession = (item) => {
    navigate(`/session/create/${item.assetId}`)
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

  const stockMenuItems = [
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'low_stock', label: 'Low Stock' }
  ]

  const publishMenuItems = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' }
  ]

  const columnNames = ['Asset', 'Create At', 'Price', 'Status', 'Vendor', 'Inspector']

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Asset List</StyledTitleBox>
            <StyledSubtitleBox>
              Dashboard • asset • <Box component="span" sx={{ color: 'primary.disable' }}>List</Box>
            </StyledSubtitleBox>
          </Box>
        </StyledHeaderBox>

        <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
          <StyledControlBox>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SelectComponent
                defaultValue=""
                displayEmpty
                menuItems={publishMenuItems}
                placeholder="Publish"
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
              <IconButtonComponent startIcon={<Eye size={20} />}>Colums</IconButtonComponent>
              <IconButtonComponent startIcon={<SlidersHorizontal size={20} />}>Filters</IconButtonComponent>
              <IconButtonComponent startIcon={<Download size={20} />}>Export</IconButtonComponent>
            </Box>
          </StyledControlBox>
        </StyledSecondaryBox>

        {assets.length > 0 ? (
          <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
            <StyledTableContainer>
              <Table>
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
                            <StyledSpan>{date}</StyledSpan>
                            <StyledSpan>{time}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>${asset.assetPrice.toFixed(2)}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledStatusBox
                              sx={(theme) => {
                                if (asset.status === '1') {
                                  return {
                                    bgcolor: theme.palette.success.main,
                                    color: theme.palette.success.contrastText
                                  }
                                } else if (asset.status === '2') {
                                  return {
                                    bgcolor: theme.palette.error.main,
                                    color: theme.palette.error.contrastText
                                  }
                                } else {
                                  return {
                                    bgcolor: theme.palette.warning.main,
                                    color: theme.palette.warning.contrastText
                                  }
                                }
                              }}
                            >
                              {asset.status === '0' ? 'Not yet auctioned' : asset.status === '1' ? 'Being auctioned' : 'Was auctioned'}
                            </StyledStatusBox>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{asset.vendor.username || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{asset.inspector.user.username || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <ActionMenu>
                              {<MuiMenuItem onClick={() => handleCreateAuctionSession(asset)}>Create Auction Session</MuiMenuItem>}
                            </ActionMenu>
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
            <ListEmpty nameList="assets" />
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