import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import RelatedPaintings from './components/RelatedPaintings/RelatedPaintings';
import RelatedSearches from './components/RelatedSearches/RelatedSearches';
import { useGetSessionById } from '~/hooks/sessionHook';
import { useParams } from 'react-router-dom';
import AssetDetail from './components/AssetDetail';

const TimedAuctionDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSessionById(id);
  console.log('Session: ', data);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading session</Typography>;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box py={4}>
          <AssetDetail item={data}/>
          <RelatedPaintings />
          <RelatedSearches />
        </Box>
      </Container>
    </Box>
  );
};

export default TimedAuctionDetail;