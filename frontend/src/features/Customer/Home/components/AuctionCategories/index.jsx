import React, { useRef } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useFilterCategories } from '~/hooks/categoryHook';

function AuctionCategories() {
  const categoriesScrollRef = useRef(null);
  const { data, isLoading, isError } = useFilterCategories();

  if (isLoading) {
    return <Typography align="center" py={2}>Loading...</Typography>;
  }

  if (isError) {
    return <Typography align="center" py={2} color="error">Error loading categories</Typography>;
  }

  const { data: categoriesData } = data;

  const scrollCategories = (direction) => {
    if (categoriesScrollRef.current) {
      const scrollAmount = 300;
      categoriesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Map the JSON data to the format expected by the component
  const categories = categoriesData.map((category) => ({
    id: category.categoryId,
    name: category.categoryName,
    image: category.image,
    count: category.types.length || 0, // Default to 0 if count is not provided
  })) || [];

  return (
    <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Danh mục đấu giá
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => scrollCategories('left')}
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => scrollCategories('right')}
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <Box
          ref={categoriesScrollRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((category) => (
            <Card
              key={category.id}
              sx={{
                minWidth: 180,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia component="img" height="120" image={category.image} alt={category.name} />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.count} loại vật phẩm
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default AuctionCategories;