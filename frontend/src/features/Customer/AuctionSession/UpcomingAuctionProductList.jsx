import React, { useState } from 'react';
import { Box, Container, Typography, Pagination } from '@mui/material';
import UpcomingAuctionCard from '~/components/AuctionProuductComponent/UpcomingAuctionCard';
import { useGetAuctionSession } from '~/hooks/auctionsessionHook';

const UpcomingProductList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetAuctionSession(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading auction sessions.</div>;
  }

  // Kiểm tra nếu data tồn tại và không phải là undefined
  if (!data || !Array.isArray(data.items)) {
    console.log('Data is not an array or is undefined:', data);
    return <div>No auction sessions available.</div>;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { items: displayedProducts, totalPages } = data;

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, mb: 10 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#b41712' }}>
          Auctioned Product
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {displayedProducts.map((product, index) => (
            <UpcomingAuctionCard
              key={index}
              product={product}
            />
          ))}
        </Box>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </Box>
    </Container>
  );
};

export default UpcomingProductList;
