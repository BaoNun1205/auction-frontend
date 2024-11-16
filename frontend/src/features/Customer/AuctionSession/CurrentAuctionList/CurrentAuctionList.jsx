import React from 'react';
import { ImHammer2 } from 'react-icons/im';
import { Box, Typography, Divider } from '@mui/material';
import CurrentAuctionItem from '../components/CurrentAuctionItem/CurrentAuctionItem';
import { useFilterSessions } from '~/hooks/sessionHook';

const CurrentAuctions = () => {
    const { data, isLoading, isError } = useFilterSessions({ status: '0' });
    console.log('Data:', data);

    if (isLoading) {
      return <Typography>Loading...</Typography>;
    }
  
    if (isError) {
      return <Typography>Error loading sessions</Typography>;
    }

    const { data: items, total: totalPages } = data;

  return (
    <Box textAlign="center" my={4} mx={5}>
      <Typography variant="h4" color="#B7201B" fontWeight="bold">Phiên đấu giá đang diễn ra</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
        <ImHammer2 size={32} className="text-mainBgColor" />
        <Divider sx={{ flexGrow: 1, bgcolor: 'gray' }} />
      </Box>
      <CurrentAuctionItem items={items} />
    </Box>
  );
}

export default CurrentAuctions;