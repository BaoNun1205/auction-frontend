import React from 'react';
import { Box, Chip } from '@mui/material';

const statusOptions = [
  { key: 'ALL', label: 'Tất cả', index: 0 },
  { key: 'NOT_AUCTIONED', label: 'Chưa đấu giá', index: 1 },
  { key: 'ONGOING', label: 'Đang đấu giá', index: 2 },
  { key: 'AUCTION_SUCCESS', label: 'Thành công', index: 3 },
  { key: 'PAYMENT_SUCCESSFUL', label: 'Đã thanh toán', index: 4 },
  { key: 'DELIVERING', label: 'Đang giao', index: 5 },
  { key: 'RECEIVED', label: 'Đã nhận', index: 6 },
  { key: 'COMPLETED', label: 'Hoàn thành', index: 7 },
  { key: 'AUCTION_FAILED', label: 'Thất bại', index: 8 },
  { key: 'CANCELED', label: 'Đã hủy', index: 9 }
];

const StatusChips = ({ activeTab, setActiveTab, getStatusCount }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      mb: 3,
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(180, 23, 18, 0.3)',
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: 'rgba(180, 23, 18, 0.5)',
        },
      },
    }}
  >
    {statusOptions.map(({ key, label, index }) => (
      <Chip
        key={key}
        label={`${label} (${getStatusCount(key)})`}
        variant={activeTab === index ? 'filled' : 'outlined'}
        onClick={() => setActiveTab(index)}
        sx={{
          cursor: 'pointer',
          borderRadius: '20px',
          backgroundColor: activeTab === index ? '#b41712' : 'transparent',
          color: activeTab === index ? 'white' : '#b41712',
          borderColor: '#b41712',
          '&:hover': {
            backgroundColor: activeTab === index ? '#a01510' : 'rgba(180, 23, 18, 0.1)',
          },
        }}
      />
    ))}
  </Box>
);

export default StatusChips;