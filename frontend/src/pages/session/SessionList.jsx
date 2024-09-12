import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170 },
  {
    id: 'price',
    label: 'Price Expected',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'vendorId',
    label: 'Vendor ID',
    minWidth: 70,
    align: 'center'
  },
  {
    id: 'inspectorId',
    label: 'Inspector ID',
    minWidth: 70,
    align: 'center'
  }
]

function createData(name, description, price, vendorId, inspectorId) {
  return { name, description, price, vendorId, inspectorId }
}

const rows = [
  createData('Iphone 6 nói anh nghe chuyện gì vừa', 'Bị bể màn hình thật rồi mọi người ơi, sao nó bể vậy', 500000, 1, 1),
  createData('Iphone 6', 'Bị bể màn hình', 500000, 1, 1),
  createData('Iphone 6', 'Bị bể màn hình', 500000, 1, 1),
  createData('Iphone 6', 'Bị bể màn hình', 500000, 1, 1),
  createData('Iphone 6', 'Bị bể màn hình', 500000, 1, 1),
  createData('Iphone 6', 'Bị bể màn hình', 500000, 1, 1),
  createData('Iphone 6', 'Bị bể màn hình', 500000, 1, 1)
]

export default function SessionList() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}