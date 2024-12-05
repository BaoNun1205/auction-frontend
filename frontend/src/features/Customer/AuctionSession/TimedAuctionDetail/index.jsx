import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import RelatedPaintings from './components/RelatedPaintings/RelatedPaintings';
import RelatedSearches from './components/RelatedSearches/RelatedSearches';
import { useGetSessionById } from '~/hooks/sessionHook';
import { useParams } from 'react-router-dom';
import SessionDetail from './components/SessionDetail';

const TimedAuctionDetail = () => {
  const { id } = useParams();
  const { data, refetch, isLoading, isError } = useGetSessionById(id);
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
          <SessionDetail item={data} refresh={refetch}/>
          <RelatedPaintings id={id}/>
          <RelatedSearches />
        </Box>
      </Container>
    </Box>
  );
};

export default TimedAuctionDetail;