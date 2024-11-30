import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Typography,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { Eye, SlidersHorizontal, Download, Trash2 } from 'lucide-react';
import SelectComponent from '~/components/SelectComponent/SelectComponent';
import SearchTextField from '~/components/SearchTextFieldComponent/SearchTextField';
import IconButtonComponent from '~/components/IconButtonComponent/IconButtonComponent';
import PaginationControl from '~/components/PanigationControlComponent/PaginationControl';
import { useApprovedRequirement, useFilterRequirements, useRejectedRequirement } from '~/hooks/requirementHook';
import { useNavigate } from 'react-router-dom';
import parseToken from '~/utils/parseToken';
import splitDateTime from '~/utils/SplitDateTime';
import ActionMenu from '~/components/IconMenuComponent/IconMenuComponent';
import ListEmpty from '~/components/ListEmpty/ListEmpty';
import RequirementDetails from '~/features/Requirement/RequirementList/RequirementDetail';
import {
  StyledContainer,
  StyledControlBox,
  StyledHeaderBox,
  StyledInnerBox,
  StyledSecondaryBox,
  StyledTableContainer,
  StyledTableHead,
  StyledTableCell,
  StyledTableRow,
  StyledSpan,
  StyledStatusBox,
  StyledTitleBox,
  StyledSubtitleBox,
} from '~/features/style';

const RequirementList = () => {
  const [status, setStatus] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useFilterRequirements(status, keyword, page, rowsPerPage);
  const items = Array.isArray(data?.data) ? data.data : [];
  const { mutate: approveRequirement } = useApprovedRequirement();
  const { mutate: rejectRequirement } = useRejectedRequirement();

  const statusMenuItems = [
    { value: '0', label: 'Chưa Duyệt' },
    { value: '1', label: 'Đã Duyệt' },
    { value: '2', label: 'Từ Chối' },
  ];

  const columnNames = ['Tên', 'Ngày Tạo', 'Giá Dự Kiến', 'Trạng Thái', 'Người bán', 'Người kiểm duyệt'];

  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleApproveRequirement = (item) => {
    const { jti: inspectorId } = parseToken();
    approveRequirement({ requirementId: item.requirementId, inspectorId }, { onSuccess: refetch });
  };

  const handleRejectRequirement = (item) => {
    rejectRequirement(item.requirementId, { onSuccess: refetch });
  };

  const handleCreateAsset = (item) => navigate(`/asset/create/${item.requirementId}`);

  const handleViewDetails = (item) => {
    setSelectedRequirement(item);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedRequirement(null);
  };

  return (
    <StyledContainer>
      <StyledInnerBox>
        <StyledHeaderBox>
          <Box>
            <StyledTitleBox sx={{ whiteSpace: 'nowrap' }}>Yêu cầu bán đấu giá</StyledTitleBox>
            <StyledSubtitleBox sx={{ whiteSpace: 'nowrap' }}>
              Dashboard • Yêu Cầu • <Box component="span" sx={{ color: 'primary.disable' }}>Danh Sách</Box>
            </StyledSubtitleBox>
          </Box>
        </StyledHeaderBox>

        <StyledSecondaryBox bgcolor={(theme) => theme.palette.primary.secondary}>
          <StyledControlBox>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SelectComponent
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                displayEmpty
                menuItems={statusMenuItems}
                placeholder="Trạng Thái"
              />
              <SearchTextField value={keyword} onChange={(event) => setKeyword(event.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, color: 'primary.textMain' }}>
              <IconButtonComponent startIcon={<Eye size={20} />} disabled={items.length === 0}>Cột</IconButtonComponent>
              <IconButtonComponent startIcon={<SlidersHorizontal size={20} />} disabled={items.length === 0}>Bộ Lọc</IconButtonComponent>
              <IconButtonComponent startIcon={<Download size={20} />} disabled={items.length === 0}>Xuất</IconButtonComponent>
            </Box>
          </StyledControlBox>
        </StyledSecondaryBox>

        {items.length > 0 ? (
          <StyledSecondaryBox bgcolor={(theme) => theme.palette.primary.secondary}>
            <StyledTableContainer>
              <Table>
                <StyledTableHead sx={{ bgcolor: '#B41712' }}>
                  <TableRow>
                    {columnNames.map((columnName, index) => (
                      <StyledTableCell key={index} sx={{ color: 'white', whiteSpace: 'nowrap' }}>
                        {columnName}
                      </StyledTableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={columnNames.length + 1}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={columnNames.length + 1}>
                        <Typography color="error">Lỗi khi lấy dữ liệu yêu cầu</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => {
                      const { date, time } = splitDateTime(item.createdAt);
                      return (
                        <StyledTableRow key={item.requirementId}>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                component="img"
                                src={item.imageRequirements[0]?.image}
                                sx={{ width: 48, height: 48, borderRadius: 1, mr: 2 }}
                              />
                              <Box>
                                <StyledSpan>{item.assetName}</StyledSpan>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <StyledSpan>{date} {time}</StyledSpan>
                          </TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <StyledSpan>{item.assetPrice.toLocaleString()}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledStatusBox
                              sx={(theme) => {
                                if (item.status === '1') {
                                  return { bgcolor: theme.palette.success.main, color: theme.palette.success.contrastText };
                                } else if (item.status === '2') {
                                  return { bgcolor: theme.palette.error.main, color: theme.palette.error.contrastText };
                                } else {
                                  return { bgcolor: theme.palette.warning.main, color: theme.palette.warning.contrastText };
                                }
                              }}
                            >
                              {item.status === '1' ? 'Đã duyệt' : item.status === '2' ? 'Đã từ chối' : 'Đang chờ duyệt'}
                            </StyledStatusBox>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{item?.vendor?.username || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{item?.inspector?.username || 'N/A'}</StyledSpan>
                            <StyledStatusBox sx={{ bgcolor: item.status === '1' ? 'success.main' : item.status === '2' ? 'error.main' : 'warning.main' }}>
                              {item.status === '1' ? 'Đã Duyệt' : item.status === '2' ? 'Từ Chối' : 'Chưa Duyệt'}
                            </StyledStatusBox>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{item.vendor?.username || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <StyledSpan>{item.inspector?.username || 'N/A'}</StyledSpan>
                          </TableCell>
                          <TableCell>
                            <ActionMenu>
                              {item.status === '0' ? (
                                <>
                                  <MuiMenuItem onClick={() => handleViewDetails(item)}>Xem chi tiết</MuiMenuItem> {/* New menu item */}
                                </>
                              ) : item.status === '1' ? (
                                <MuiMenuItem onClick={() => handleCreateAsset(item)}>Tạo sản phẩm</MuiMenuItem>
                              ) : null}
                                  <MuiMenuItem onClick={() => handleApproveRequirement(item)}>Duyệt</MuiMenuItem>
                                  <MuiMenuItem onClick={() => handleRejectRequirement(item)}>Từ Chối</MuiMenuItem>
                                  <MuiMenuItem onClick={() => handleViewDetails(item)}>Xem Chi Tiết</MuiMenuItem>
                                </>
                              ) : item.status === '1' && (
                                <MuiMenuItem onClick={() => handleCreateAsset(item)}>Tạo Tài Sản</MuiMenuItem>
                              )}
                            </ActionMenu>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <PaginationControl
              count={data?.totalElements || 0}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </StyledSecondaryBox>
        ) : (
          <ListEmpty message="Không có yêu cầu nào" />
        )}
      </StyledInnerBox>

      <RequirementDetails
        open={openDetailsModal}
        onClose={handleCloseModal}
        requirement={selectedRequirement}
        onApprove={handleApproveRequirement}
        onReject={handleRejectRequirement}
      />
    </StyledContainer>
  );
};

export default RequirementList;
