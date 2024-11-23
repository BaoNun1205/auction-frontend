import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const RelatedSearches = () => {
    const searches = ['Auctions in Orlando', 'Fine Art Auctions', 'Online Bidding Events'];
  
    return (
      <Box my={6}>
        <Typography variant="h5" gutterBottom>
          Từ khóa liên quan
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {searches.map((search, index) => (
            <Button key={index} variant="outlined" color="#B7201B" component={Link} href={`/search?q=${encodeURIComponent(search)}`}>
              {search}
            </Button>
          ))}
        </Box>
      </Box>
    );
  };

export default RelatedSearches;