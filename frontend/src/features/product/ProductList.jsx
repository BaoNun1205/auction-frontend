import React, { useState } from 'react'
import { Box, Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material'
import { Eye, SlidersHorizontal, Download, MoreVertical, Trash2 } from 'lucide-react'
import TableContainer from '@mui/material/TableContainer'
import SelectComponent from '../../components/SelectComponent/SelectComponent'
import SearchTextField from '../../components/SearchTextFieldComponent/SearchTextField'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import IconButtonComponent from '../../components/IconButtonComponent/IconButtonComponent'
import PaginationControl from '../../components/PanigationControlComponent/PaginationControl'

const products = [
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

export default function ProductListView() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map(product => product.id))
      setShowDeleteButton(true)
    } else {
      setSelectedProducts([])
      setShowDeleteButton(false)
    }
  }

  const handleSelectProduct = (event, productId) => {
    const newSelectedProducts = event.target.checked
      ? [...selectedProducts, productId]
      : selectedProducts.filter(id => id !== productId)

    setSelectedProducts(newSelectedProducts)
    setShowDeleteButton(newSelectedProducts.length > 0)
  }

  const handleDelete = () => {
    console.log('Deleting selected products:', selectedProducts)
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

  const columnNames = ['Product', 'Create At', 'Price', 'Status', 'Vendor', 'Inspector']

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'primary.textMain' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Box sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 1 }}>List</Box>
            <Box sx={{ color: 'primary.textMain' }}>
              Dashboard • Product • <Box component="span" sx={{ color: 'grey.500' }}>List</Box>
            </Box>
          </Box>
          <ButtonComponent
            bgcolor="common.white"
            color="common.black"
            hoverBgcolor="grey.100"
          >
            + NEW PRODUCT
          </ButtonComponent>
        </Box>

        <Box sx={{ bgcolor: 'primary.secondary', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3, px: 3, pt: 3 }}>
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
                  Delete ({selectedProducts.length})
                </Button>
              )}
              <IconButtonComponent startIcon={<Eye size={20} />}>Colums</IconButtonComponent>
              <IconButtonComponent startIcon={<SlidersHorizontal size={20} />}>Filters</IconButtonComponent>
              <IconButtonComponent startIcon={<Download size={20} />}>Export</IconButtonComponent>
            </Box>
          </Box>

          <TableContainer
            sx={{
              maxHeight: 440,
              borderColor: 'primary.border',
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'darkgrey',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'primary.buttonHover'
              }
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: 'primary.buttonHover', position: 'sticky', top: 0, zIndex: 1000 }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{ color: 'primary.textMain', '&.Mui-checked': { color: 'primary.main' } }}
                      checked={selectedProducts.length === products.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {columnNames.map((columnName, index) => {
                    return (
                      <TableCell key={index} sx={{ color: 'primary.textMain', fontWeight: 'normal' }}>
                        {columnName}
                      </TableCell>
                    )
                  })}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      '& td, & th': { borderColor: 'primary.border' } // Màu border của các cell
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: 'primary.textMain', '&.Mui-checked': { color: 'primary.main' } }}
                        checked={selectedProducts.includes(product.id)}
                        onChange={(event) => handleSelectProduct(event, product.id)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={product.image}
                          sx={{ width: 48, height: 48, borderRadius: 1, mr: 2 }}
                        />
                        <Box>
                          <Box sx={{ color: 'primary.textMain' }}>{product.name}</Box>
                          <Box sx={{ color: 'primary.textSecondary' }}>{product.category}</Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ color: 'primary.textMain' }}>{product.createAt}</Box>
                      <Box sx={{ color: 'primary.textSecondary' }}>{product.createTime}</Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ color: 'primary.textMain' }}>${product.price.toFixed(2)}</Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          px: 1,
                          py: 0.5,
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          display: 'inline-block',
                          bgcolor: product.status === 'Published' ? 'success.main' : 'warning.main',
                          color: product.status === 'Published' ? 'success.contrastText' : 'warning.contrastText'
                        }}
                      >
                        {product.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ color: 'primary.textMain' }}>{product.vendor}</Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ color: 'primary.textMain' }}>{product.inspector}</Box>
                    </TableCell>
                    <TableCell>
                      <IconButton sx={{ color: 'primary.textMain' }}>
                        <MoreVertical size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationControl />
        </Box>
      </Box>
    </Box>
  )
}