import React, { useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableRow, Popover, CircularProgress, Typography, MenuItem as MuiMenuItem } from '@mui/material'
import { Eye, SlidersHorizontal, Download, Trash2 } from 'lucide-react'
import SelectComponent from '~/components/SelectComponent/SelectComponent'
import SearchTextField from '~/components/SearchTextFieldComponent/SearchTextField'
import IconButtonComponent from '~/components/IconButtonComponent/IconButtonComponent'
import PaginationControl from '~/components/PanigationControlComponent/PaginationControl'
import { useApprovedRequirement, useFilterRequirements, useRejectedRequirement } from '~/hooks/requirementHook'
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

const RequirementList = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [status, setStatus] = useState(0)
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

  const { data, error, isLoading, refetch } = useFilterRequirements(status, keyword, page, rowsPerPage)
  const items = Array.isArray(data?.data) ? data.data : []

  const { mutate: approvedRequirement } = useApprovedRequirement()
  const { mutate: rejectedRequirement } = useRejectedRequirement()

  console.log('items:', items)

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const handleApprovedRequirement = (item) => {
    const decodedToken = parseToken()
    console.log('inspectorId:', decodedToken.sub)
    approvedRequirement({ requirementId: item.requirementId, inspectorId: decodedToken.sub }, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleRejectedRequirement = (item) => {
    rejectedRequirement(item.requirementId, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleCreateAsset = (item) => {
    navigate(`/asset/create/${item.requirementId}`)
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(items.map(item => item.requirementId))
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
    console.log('Deleting selected requirements:', selectedItems)
  }

  const publishMenuItems = [
    { value: '0', label: 'Not Appoved' },
    { value: '1', label: 'Approved' },
    { value: '2', label: 'Rejected' }
  ]

  const columnNames = ['Name', 'Create At', 'Expected Price', 'Status', 'Vendor', 'Inspector']

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Requirement List</StyledTitleBox>
            <StyledSubtitleBox>
              Dashboard • Requirement • <Box component="span" sx={{ color: 'primary.disable' }}>List</Box>
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
                        <Typography color="error">Error fetching requirements</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => {
                      const { date, time } = splitDateTime(item.createdAt)
                      return (
                        <StyledTableRow key={item.requirementId}>
                          <TableCell padding="checkbox">
                            <StyledCheckbox
                              checked={selectedItems.includes(item.requirementId)}
                              onChange={(event) => handleSelectItem(event, item.requirementId)}
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
                                <StyledSpan>{item.assetName}</StyledSpan>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{date} </StyledSpan>
                            <StyledSpan>{time}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>${item.assetPrice.toFixed(2)}</StyledSpan>
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
                            <StyledSpan>{item.vendor || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{item.inspector || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <ActionMenu>
                              {item.status === '0' ? (
                                <>
                                  <MuiMenuItem onClick={() => handleApprovedRequirement(item)}>Approved</MuiMenuItem>
                                  <MuiMenuItem onClick={() => handleRejectedRequirement(item)}>Reject</MuiMenuItem>
                                </>
                              ) : item.status === '1' ? (
                                <MuiMenuItem onClick={() => handleCreateAsset(item)}>Create Asset</MuiMenuItem>
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
            <ListEmpty nameList="requirements" />
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

export default RequirementList