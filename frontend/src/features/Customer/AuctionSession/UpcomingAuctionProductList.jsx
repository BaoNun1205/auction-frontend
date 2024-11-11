import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Pagination, Container } from '@mui/material';
import AuctionedProductCard from '~/components/Customer/AuctionedProuductCard';
import UpcomingAuctionCard from '~/components/Customer/UpcomingAuctionCard';

const AuctionedProductList = () => {
  const [page, setPage] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef(null);
  const productsPerPage = 6;

  const products = [
    // Add more products as needed
  ];

  // Add more products to make a total of 10
  while (products.length < 10) {
    products.push({

      image: './src/assets/images/demoauction.png',
      sessionDate: '10/24 15:00'
    });
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  const displayedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const margin = 8; 
        const totalMargin = margin * (productsPerPage / 2 - 1); 
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
    <Container maxWidth="xl" ref={containerRef}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#b41712' }}>
          Auctioned Product
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {displayedProducts.map((product, index) => (
            <UpcomingAuctionCard
              key={index}
              product={product}
              cardWidth={cardWidth}
              isFirst={index % productsPerPage === 0}
              isLast={(index + 1) % productsPerPage === 0}
            />
          ))}
        </Box>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </Box>
    </Container>
  );
};

export default AuctionedProductList;
