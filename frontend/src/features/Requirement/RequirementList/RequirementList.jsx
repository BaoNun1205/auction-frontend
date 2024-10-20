import React, { useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableRow, Popover, CircularProgress, Typography, MenuItem as MuiMenuItem } from '@mui/material'
import { Eye, SlidersHorizontal, Download, Trash2 } from 'lucide-react'
import SelectComponent from '~/components/SelectComponent/SelectComponent'
import SearchTextField from '~/components/SearchTextFieldComponent/SearchTextField'
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent'
import IconButtonComponent from '~/components/IconButtonComponent/IconButtonComponent'
import PaginationControl from '~/components/PanigationControlComponent/PaginationControl'
import { useGetRequirement } from '~/hooks/requirementHook'
import CreateRequirement from '../AddRequirement/AddRequirement'
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

const RequirementList = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [status, setStatus] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const { data, error, isLoading, refetch } = useGetRequirement(status, keyword)
  const items = Array.isArray(data) ? data : []

  // const handleDeleteClick = (item) => {
  //   deleteRequirement(item.requirementId, {
  //     onSuccess: () => {
  //       refetch()
  //     }
  //   })
  // }

  // const handleRestoreClick = (item) => {
  //   restoreRequirement(item.requirementId, {
  //     onSuccess: () => {
  //       refetch()
  //     }
  //   })
  // }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(items.map(asset => asset.requirementId))
      setShowDeleteButton(true)
    } else {
      setSelectedItems([])
      setShowDeleteButton(false)
    }
  }

  const handleSelectItem = (event, assetId) => {
    const newSelectedItems = event.target.checked
      ? [...selectedItems, assetId]
      : selectedItems.filter(id => id !== assetId)

    setSelectedItems(newSelectedItems)
    setShowDeleteButton(newSelectedItems.length > 0)
  }

  const handleDelete = () => {
    console.log('Deleting selected requirements:', selectedItems)
  }

  const publishMenuItems = [
    { value: false, label: 'Active' },
    { value: true, label: 'Inactive' }
  ]

  const columnNames = ['Name', 'Create At', 'Status']

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
              <IconButtonComponent startIcon={<Eye size={20} />}>Columns</IconButtonComponent>
              <IconButtonComponent startIcon={<SlidersHorizontal size={20} />}>Filters</IconButtonComponent>
              <IconButtonComponent startIcon={<Download size={20} />}>Export</IconButtonComponent>
            </Box>
          </StyledControlBox>
        </StyledSecondaryBox>

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
                              <StyledSpan>{item.name}</StyledSpan>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <StyledSpan>{date} </StyledSpan>
                          <StyledSpan>{time}</StyledSpan>
                        </TableCell>
                        <TableCell>
                          <StyledStatusBox
                            sx={(theme) => ({
                              bgcolor: item.status === false ? theme.palette.success.main : theme.palette.warning.main,
                              color: item.status === false ? theme.palette.success.contrastText : theme.palette.warning.contrastText
                            })}
                          >
                            {item.status === false ? 'Active' : 'Inactive'}
                          </StyledStatusBox>
                        </TableCell>
                        <TableCell>
                          <ActionMenu>
                            {item.deflag === false ? (
                              <MuiMenuItem onClick={() => handleDeleteClick(item)}>Delete</MuiMenuItem>
                            ) : (
                              <MuiMenuItem onClick={() => handleRestoreClick(item)}>Restore</MuiMenuItem>
                            )}
                          </ActionMenu>
                        </TableCell>
                      </StyledTableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
          <PaginationControl />
        </StyledSecondaryBox>
      </StyledInnerBox>
    </StyledContainer>
  )
}

export default RequirementList
