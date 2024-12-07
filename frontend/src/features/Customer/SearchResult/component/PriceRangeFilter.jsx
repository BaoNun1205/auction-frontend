import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

const PriceRangeFilter = ({ priceRange, onPriceRangeChange }) => {
  const formatPrice = (value) => {
    return `${value.toLocaleString('vi-VN')} ₫`;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Khoảng giá
      </Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue) => onPriceRangeChange(newValue)}
        valueLabelDisplay="auto"
        valueLabelFormat={formatPrice}
        min={0}
        max={1000000000}
        step={1000000}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="body2">{formatPrice(priceRange[0])}</Typography>
        <Typography variant="body2">{formatPrice(priceRange[1])}</Typography>
      </Box>
    </Box>
  );
};

export default PriceRangeFilter;

