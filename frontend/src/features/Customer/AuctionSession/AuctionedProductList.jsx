import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Pagination, Container } from '@mui/material';
import AuctionedProductCard from '~/components/Customer/AuctionedProuductCard';
import UpcomingAuctionCard from '~/components/Customer/UpcomingAuctionCard';
import { useFilterSessions } from '~/hooks/sessionHook';


const AuctionedProductList = () => {
  const [page, setPage] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef(null);
  const productsPerPage = 4;

  // const { data, isLoading, isError } = useGetAuctionedSession();

  const { data, isLoading, isError } = useFilterSessions({ status: '0' });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading auction sessions.</div>;
  }

  // Kiểm tra nếu data tồn tại và không phải là undefined
  // if (!data || !Array.isArray(data)) {
  //   console.log('Data is not an array or is undefined:', data);
  //   return <div>No auction sessions available.</div>;
  // }

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Sử dụng data từ hook để phân trang
  const displayedProducts = data?.data.slice((page - 1) * productsPerPage, page * productsPerPage);

  console.log('Displayed products:', displayedProducts);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const margin = 8; // Assuming a margin of 16px
        const totalMargin = margin * (productsPerPage - 1);
        const newCardWidth = (containerWidth - totalMargin) / productsPerPage;
        setCardWidth(newCardWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#b41712' }}>
          Auctioned Product
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {displayedProducts.map((product, index) => (
            <AuctionedProductCard
              key={index}
              product={product}
            />
          ))}
        </Box>
        <Pagination
          count={Math.ceil(data.length / productsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </Box>
    </Container>
  );
};

export default AuctionedProductList;
