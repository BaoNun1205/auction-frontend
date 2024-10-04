import React, { useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableRow, IconButton, Popover } from '@mui/material'
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
  StyledTitleBox } from '~/features/style'

const assets = [
  {
    id: 1,
    name: 'Classic Leather Loafers',
    category: 'Shoes',
    createAt: '19 Aug 2024',
    createTime: '12:54 am',
    price: 97.14,
    status: 'Published',
    vendor: 'ShoeMax',
    inspector: 'John Doe',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 2,
    name: 'Mountain Trekking Boots',
    category: 'Apparel',
    createAt: '17 Aug 2024',
    createTime: '11:54 pm',
    price: 68.71,
    status: 'Published',
    vendor: 'OutdoorGear',
    inspector: 'Jane Smith',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 3,
    name: 'Elegance Stiletto Heels',
    category: 'Shoes',
    createAt: '16 Aug 2024',
    createTime: '10:54 pm',
    price: 85.21,
    status: 'Draft',
    vendor: 'LuxuryFootwear',
    inspector: 'Alice Johnson',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 4,
    name: 'Comfy Running Shoes',
    category: 'Apparel',
    createAt: '15 Aug 2024',
    createTime: '9:54 pm',
    price: 52.17,
    status: 'Published',
    vendor: 'SportySteps',
    inspector: 'Bob Williams',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 5,
    name: 'Chic Ballet Flats',
    category: 'Shoes',
    createAt: '14 Aug 2024',
    createTime: '8:54 pm',
    price: 45.99,
    status: 'Published',
    vendor: 'DancersDream',
    inspector: 'Carol Brown',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 5,
    name: 'Chic Ballet Flats',
    category: 'Shoes',
    createAt: '14 Aug 2024',
    createTime: '8:54 pm',
    price: 45.99,
    status: 'Published',
    vendor: 'DancersDream',
    inspector: 'Carol Brown',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 5,
    name: 'Chic Ballet Flats',
    category: 'Shoes',
    createAt: '14 Aug 2024',
    createTime: '8:54 pm',
    price: 45.99,
    status: 'Published',
    vendor: 'DancersDream',
    inspector: 'Carol Brown',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 5,
    name: 'Chic Ballet Flats',
    category: 'Shoes',
    createAt: '14 Aug 2024',
    createTime: '8:54 pm',
    price: 45.99,
    status: 'Published',
    vendor: 'DancersDream',
    inspector: 'Carol Brown',
    image: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 5,
    name: 'Chic Ballet Flats',
    category: 'Shoes',
    createAt: '14 Aug 2024',
    createTime: '8:54 pm',
    price: 45.99,
    status: 'Published',
    vendor: 'DancersDream',
    inspector: 'Carol Brown',
    image: '/placeholder.svg?height=80&width=80'
  }
]



const AssetList = () => {
  const [selectedAssets, setSelectedAssets] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedAssets(assets.map(asset => asset.id))
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
            <StyledTitleBox>List</StyledTitleBox>
            <StyledSubtitleBox>
              Dashboard • asset • <Box component="span" sx={{ color: 'primary.disable' }}>List</Box>
            </StyledSubtitleBox>
          </Box>
          <ButtonComponent
            bgcolor={(theme) => (theme.palette.primary.textMain)}
            color={(theme) => (theme.palette.primary.textExtra)}
            hoverBgcolor={(theme) => (theme.palette.primary.light)}
            onClick={handleOpenPopover}
          >
            + NEW ASSET
          </ButtonComponent>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              mt: 2
            }}
          >
            <CreateCategory onClose={handleClosePopover} />
          </Popover>

        </StyledHeaderBox>

        <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
          <StyledControlBox>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SelectComponent
                defaultValue=""
                displayEmpty
                menuItems={stockMenuItems}
                placeholder="Stock"
              />
              <SelectComponent
                defaultValue=""
                displayEmpty
                menuItems={publishMenuItems}
                placeholder="Publish"
              />
              <SearchTextField />
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
                {assets.map((asset) => (
                  <StyledTableRow key={asset.id}>
                    <TableCell padding="checkbox">
                      <StyledCheckbox
                        checked={selectedAssets.includes(asset.id)}
                        onChange={(event) => handleSelectAsset(event, asset.id)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={asset.image}
                          sx={{ width: 48, height: 48, borderRadius: 1, mr: 2 }}
                        />
                        <Box>
                          <StyledSpan>{asset.name}</StyledSpan>
                          <Box sx={{ color: 'primary.textSecondary' }}>{asset.category}</Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StyledSpan>{asset.createAt}</StyledSpan>
                      <StyledSpan>{asset.createTime}</StyledSpan>
                    </TableCell>
                    <TableCell>
                      <StyledSpan>${asset.price.toFixed(2)}</StyledSpan>
                    </TableCell>
                    <TableCell>
                      <StyledStatusBox
                        sx={(theme) => ({
                          bgcolor: asset.status === 'Published' ? theme.palette.success.main : theme.palette.warning.main,
                          color: asset.status === 'Published' ? theme.palette.success.contrastText : theme.palette.warning.contrastText
                        })}
                      >
                        {asset.status}
                      </StyledStatusBox>
                    </TableCell>
                    <TableCell>
                      <StyledSpan>{asset.vendor}</StyledSpan>
                    </TableCell>
                    <TableCell>
                      <StyledSpan>{asset.inspector}</StyledSpan>
                    </TableCell>
                    <TableCell>
                      <IconButton sx={(theme) => ({ color: theme.palette.primary.textMain })}>
                        <MoreVertical size={20} />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          <PaginationControl />
        </StyledSecondaryBox>
      </StyledInnerBox>
    </StyledContainer>
  )
}

export default AssetList