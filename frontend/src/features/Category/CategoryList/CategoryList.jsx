import React, { useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableRow, MenuItem as MuiMenuItem, CircularProgress, Typography, Popover } from '@mui/material'
import { Eye, SlidersHorizontal, Download, Trash2 } from 'lucide-react'
import SelectComponent from '~/components/SelectComponent/SelectComponent'
import SearchTextField from '~/components/SearchTextFieldComponent/SearchTextField'
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent'
import IconButtonComponent from '~/components/IconButtonComponent/IconButtonComponent'
import PaginationControl from '~/components/PanigationControlComponent/PaginationControl'
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
import { useFilterCategories, useDeleteCategory, useRestoreCategory } from '~/hooks/categoryHook'
import splitDateTime from '~/utils/SplitDateTime'
import ActionMenu from '~/components/IconMenuComponent/IconMenuComponent'
import CreateCategory from '../AddCategory/AddCategory'
import ListEmpty from '~/components/ListEmpty/ListEmpty'

const CategoryList = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [status, setStatus] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const payload = {
    status,
    keyword,
    page,
    size: rowsPerPage
  }

  const { data, error, isLoading, refetch } = useFilterCategories(payload)
  const items = Array.isArray(data?.data) ? data.data : []

  const { mutate: deleteCategory } = useDeleteCategory()
  const { mutate: restoreCategory } = useRestoreCategory()

  const handleDeleteClick = (item) => {
    deleteCategory(item.categoryId, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleRestoreClick = (item) => {
    restoreCategory(item.categoryId, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(items.map(asset => asset.categoryId))
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
    console.log('Đang xóa các mục đã chọn:', selectedItems)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const publishMenuItems = [
    { value: false, label: 'Hoạt động' },
    { value: true, label: 'Không hoạt động' }
  ]

  const columnNames = ['Tên', 'Ngày tạo', 'Trạng thái']

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox>Danh sách danh mục</StyledTitleBox>
            <StyledSubtitleBox>
              Danh mục • <Box component="span" sx={{ color: 'primary.disable' }}>Danh sách</Box>
            </StyledSubtitleBox>
          </Box>
          <ButtonComponent
            bgcolor={(theme) => (theme.palette.primary.textMain)}
            color={(theme) => (theme.palette.primary.textExtra)}
            hoverBgcolor={(theme) => (theme.palette.primary.light)}
            onClick={handleOpenPopover}
          >
            + DANH MỤC MỚI
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
            <CreateCategory onClose={handleClosePopover} onCreateSuccess={refetch} />
          </Popover>
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
                placeholder="Trạng thái"
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
                  Xóa ({selectedItems.length})
                </Button>
              )}
            </Box>
          </StyledControlBox>
        </StyledSecondaryBox>
        {items.length > 0 ? (
        <StyledSecondaryBox bgcolor={(theme) => (theme.palette.primary.secondary)}>
          <StyledTableContainer sx={{ maxHeight: rowsPerPage === 5 ? 500 : 'auto', overflowY: rowsPerPage === 5 ? 'auto' : 'visible',}}>
            <Table stickyHeader>
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
                      <Typography color="error">Lỗi khi lấy danh mục</Typography>
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columnNames.length + 2}>
                      <Typography color="error" align="center">Danh sách trống</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => {
                    const { date, time } = splitDateTime(item.createdAt)
                    return (
                      <StyledTableRow key={item.categoryId}>
                        <TableCell padding="checkbox">
                          <StyledCheckbox
                            checked={selectedItems.includes(item.categoryId)}
                            onChange={(event) => handleSelectItem(event, item.categoryId)}
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
                              <StyledSpan>{item.categoryName}</StyledSpan>
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
                              bgcolor: item.delFlag === false ? theme.palette.success.main : theme.palette.warning.main,
                              color: item.delFlag === false ? theme.palette.success.contrastText : theme.palette.warning.contrastText
                            })}
                          >
                            {item.delFlag === false ? 'Hoạt động' : 'Không hoạt động'}
                          </StyledStatusBox>
                        </TableCell>
                        <TableCell>
                          <ActionMenu>
                            {item.delFlag === false ?
                              (<MuiMenuItem onClick={() => handleDeleteClick(item)}>Xóa</MuiMenuItem>)
                              : (<MuiMenuItem onClick={() => handleRestoreClick(item)}>Khôi phục</MuiMenuItem>)}
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
          <ListEmpty nameList="danh mục" />
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

export default CategoryList