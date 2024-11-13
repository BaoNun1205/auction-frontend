import React, { useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableRow, Popover, CircularProgress, Typography, MenuItem as MuiMenuItem } from '@mui/material'
import { Eye, SlidersHorizontal, Download, Trash2 } from 'lucide-react'
import SelectComponent from '~/components/SelectComponent/SelectComponent'
import SearchTextField from '~/components/SearchTextFieldComponent/SearchTextField'
import IconButtonComponent from '~/components/IconButtonComponent/IconButtonComponent'
import PaginationControl from '~/components/PanigationControlComponent/PaginationControl'
import { useFilterSessions } from '~/hooks/sessionHook'
import { useNavigate } from 'react-router-dom'
import parseToken from '~/utils/parseToken'
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
import splitDateTime from '~/utils/SplitDateTime'
import ActionMenu from '~/components/IconMenuComponent/IconMenuComponent'
import ListEmpty from '~/components/ListEmpty/ListEmpty'

const SessionList = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [status, setStatus] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const { data, error, isLoading, refetch } = useFilterSessions(status, fromDate, toDate, keyword, page, rowsPerPage)
  const items = Array.isArray(data?.data) ? data.data : []

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(items.map(item => item.auctionSessionId))
      setShowDeleteButton(true)
    } else {
      setSelectedItems([])
      setShowDeleteButton(false)
    }
  }

  const handleSelectItem = (event, itemId) => {
    const newSelectedItems = event.target.checked
      ? [...selectedItems, itemId]
      : selectedItems.filter(id => id !== itemId)

    setSelectedItems(newSelectedItems)
    setShowDeleteButton(newSelectedItems.length > 0)
  }

  const handleDelete = () => {
    console.log('Deleting selected auction sessions:', selectedItems)
  }

  const publishMenuItems = [
    { value: '0', label: 'Not Appoved' },
    { value: '1', label: 'Approved' },
    { value: '2', label: 'Rejected' }
  ]

  const columnNames = ['Name', 'Start Time', 'End Time', 'Start Bid', 'Increment', 'Status']

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Session List</StyledTitleBox>
            <StyledSubtitleBox>
              Dashboard • Session • <Box component="span" sx={{ color: 'primary.disable' }}>List</Box>
            </StyledSubtitleBox>
          </Box>
        </StyledHeaderBox>

        <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
          <StyledControlBox>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SelectComponent
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                defaultValue=""
                displayEmpty
                menuItems={publishMenuItems}
                placeholder="Status"
              />
              <SearchTextField
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, color: 'primary.textMain' }}>
              {showDeleteButton && (
                <Button
                  startIcon={<Trash2 size={20} />}
                  sx={{ color: 'error.main' }}
                  onClick={handleDelete}
                >
                  Delete ({selectedItems.length})
                </Button>
              )}
              <IconButtonComponent startIcon={<Eye size={20} />} disabled={items.length === 0}>Colums</IconButtonComponent>
              <IconButtonComponent startIcon={<SlidersHorizontal size={20} />} disabled={items.length === 0}>Filters</IconButtonComponent>
              <IconButtonComponent startIcon={<Download size={20} />} disabled={items.length === 0}>Export</IconButtonComponent>
            </Box>
          </StyledControlBox>
        </StyledSecondaryBox>

        {items.length > 0 ? (
          <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
            <StyledTableContainer>
              <Table>
                <StyledTableHead sx={(theme) => ({ bgcolor: theme.palette.primary.buttonHover })}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <StyledCheckbox
                        checked={selectedItems.length === items.length}
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
                        <Typography color="error">Error fetching sessions</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => {
                      const { date: fromDate, time: fromTime } = splitDateTime(item.startTime)
                      const { date: toDate, time: toTime } = splitDateTime(item.endTime)
                      return (
                        <StyledTableRow key={item.auctionSessionId}>
                          <TableCell padding="checkbox">
                            <StyledCheckbox
                              checked={selectedItems.includes(item.auctionSessionId)}
                              onChange={(event) => handleSelectItem(event, item.auctionSessionId)}
                              onClick={(event) => event.stopPropagation()}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                component="img"
                                src={item.image}
                                sx={{ width: 48, height: 48, borderRadius: 1, mr: 2 }}
                              />
                              <Box>
                                <StyledSpan>{item.auctionSessionId}</StyledSpan>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{fromDate} </StyledSpan>
                            <StyledSpan>{fromTime}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{toDate} </StyledSpan>
                            <StyledSpan>{toTime}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>${item.startingBids.toFixed(2)}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>${item.bidIncrement.toFixed(2)}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledStatusBox
                              sx={(theme) => {
                                if (item.status === '1') {
                                  return {
                                    bgcolor: theme.palette.success.main,
                                    color: theme.palette.success.contrastText
                                  }
                                } else if (item.status === '2') {
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
                              {item.status === '1' ? 'Approved' : item.status === '2' ? 'Reject' : 'Not Approved'}
                            </StyledStatusBox>
                          </TableCell>
                          <TableCell>
                            <ActionMenu>
                              {item.status === '0' ? (
                                <>
                                </>
                              ) : item.status === '1' ? (
                                <>
                                </>
                              ) : item.status === '2' ? (
                                {/* <MuiMenuItem onClick={() => handleDeleteRequirement(item)}>Delete</MuiMenuItem> */}
                              ) : null}
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
              rowsPerPage={rowsPerPage}
              totalItems={data?.total}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </StyledSecondaryBox>
        ) : (
          <StyledSecondaryBox>
            <ListEmpty nameList="sessions" />
            <PaginationControl
              page={page}
              rowsPerPage={rowsPerPage}
              totalItems={data?.total}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </StyledSecondaryBox>
        )}
      </StyledInnerBox>
    </StyledContainer>
  )
}

export default SessionList