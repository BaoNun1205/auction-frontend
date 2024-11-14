import React, { useState } from 'react';
import { Box, Container, Typography, Pagination } from '@mui/material';
import UpcomingAuctionCard from '~/components/AuctionProuductComponent/UpcomingAuctionCard';
import { useGetAuctionSession } from '~/hooks/auctionsessionHook';
import { useFilterSessions } from '~/hooks/sessionHook';

const UpcomingProductList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useFilterSessions({ status: '0' });
  console.log('Data:', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading auction sessions.</div>;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data: displayedProducts, total: totalPages } = data;

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
