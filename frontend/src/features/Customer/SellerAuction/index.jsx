import React, { useState, useEffect } from 'react';
import { Container, Typography, Tabs, Tab, Box, Pagination } from '@mui/material';
import EnhancedAuctionCard from './EnhancedAuctionCard';
import VendorInformation from '../AuctionSession/TimedAuctionDetail/components/VendorInfomation';
import { useFilterSessions } from '~/hooks/sessionHook';

const SellerAuction = ({ vendorId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // State để quản lý trang hiện tại
  const itemsPerPage = 6; // Số sản phẩm hiển thị trên mỗi trang
  const { data, isLoading, isError, refetch } = useFilterSessions({ userId: vendorId });

  useEffect(() => {
    if (isError) {
      console.error('Error fetching auction sessions');
    }
  }, [isError]);

  useEffect(() => {
    console.log('Fetching auction sessions');
    refetch();
  }, [refetch]);

  const auctionSessions = Array.isArray(data?.data) ? data.data : [];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); // Reset về trang đầu tiên khi chuyển tab
  };

  const filterAuctions = (status) => {
    return auctionSessions.filter(session => session.status === status);
  };

  const filteredSessions = tabValue === 0 ? filterAuctions('ONGOING') :
    tabValue === 1 ? filterAuctions('UPCOMING') :
    filterAuctions('AUCTION_SUCCESS');

  // Tính toán số trang
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSessions = filteredSessions.slice(startIndex, endIndex);

  // Xử lý thay đổi trang
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg">
      <VendorInformation isView={false} />
      <Typography variant="h4" sx={{ my: 4, fontWeight: 'bold' }}>
        Phiên Đấu Giá
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab label="Đang Diễn Ra" />
        <Tab label="Sắp Diễn Ra" />
        <Tab label="Đã Kết Thúc" />
      </Tabs>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: currentSessions.length > 0 ? 'flex-start' : 'center',
          '@media (max-width: 900px)': {
            justifyContent: 'center'
          },
        }}
      >
        {currentSessions.length > 0 ? (
          currentSessions.map((session) => (
            <Box
              key={session.auctionSessionId}
              sx={{
                flex: '1 1 calc(33.333% - 24px)', // Mỗi card chiếm 1/3 chiều rộng (trừ đi khoảng cách)
                maxWidth: 'calc(33.333% - 24px)', // Giới hạn chiều rộng tối đa
                '@media (max-width: 900px)': { // Breakpoint cho màn hình nhỏ hơn 900px
                  flex: '1 1 calc(50% - 24px)', // Mỗi card chiếm 1/2 chiều rộng
                  maxWidth: 'calc(50% - 24px)',
                },
                '@media (max-width: 600px)': {
                  flex: '1 1 100%',
                  maxWidth: '100%',
                },
              }}
            >
              <EnhancedAuctionCard session={session} />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Không có phiên đấu giá nào
            </Typography>
          </Box>
        )}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default SellerAuction;