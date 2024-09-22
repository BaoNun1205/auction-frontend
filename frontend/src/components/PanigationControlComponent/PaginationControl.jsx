import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  MenuItem
} from '@mui/material'
import { CustomSelect } from './style'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

export default function PaginationControl() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const totalItems = 20 // This should be the actual total number of items

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      p: 2,
      bgcolor: 'primary.secondary',
      color: 'primary.textMain',
      borderTop: '1px solid',
      borderColor: 'primary.border'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Rows per page:
        </Typography>
        <CustomSelect
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </CustomSelect>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalItems)} of ${totalItems}`}
        </Typography>
        <IconButton
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
          sx={{
            color: 'primary.textMain',
            '&.Mui-disabled': { color: 'primary.disable' } // Màu khi không click được
          }}
        >
          <ChevronLeft size={20} />
        </IconButton>
        <IconButton
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= Math.ceil(totalItems / rowsPerPage) - 1}
          sx={{
            color: 'primary.textMain',
            '&.Mui-disabled': { color: 'primary.disable' } // Màu khi không click được
          }}
        >
          <ChevronRight size={20} />
        </IconButton>
      </Box>
    </Box>
  )
}