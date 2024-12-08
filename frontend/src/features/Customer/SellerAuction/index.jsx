import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Grid } from '@mui/material';
import EnhancedAuctionCard from './EnhancedAuctionCard';
import VendorInformation from '../AuctionSession/TimedAuctionDetail/components/VendorInfomation';

// Mock data for auction sessions
const auctionSessions = [
  {
    id: 1,
    title: 'Vintage Watch Collection',
    image: 'https://example.com/watch.jpg',
    startingBid: 1000000,
    currentBid: 1500000,
    startTime: '2023-06-29T10:00:00',
    endTime: '2023-06-30T15:00:00',
    status: 'active'
  },
  {
    id: 2,
    title: 'Rare Coin Set',
    image: 'https://example.com/coins.jpg',
    startingBid: 3000000,
    currentBid: 5000000,
    startTime: '2023-07-04T09:00:00',
    endTime: '2023-07-05T18:00:00',
    status: 'active'
  },
  {
    id: 3,
    title: 'Antique Furniture',
    image: 'https://example.com/furniture.jpg',
    startingBid: 8000000,
    currentBid: 10000000,
    startTime: '2023-07-01T08:00:00',
    endTime: '2023-07-02T12:00:00',
    status: 'active'
  },
  {
    id: 4,
    title: 'Modern Art Painting',
    image: 'https://example.com/painting.jpg',
    startingBid: 20000000,
    currentBid: 25000000,
    startTime: '2023-06-27T10:00:00',
    endTime: '2023-06-28T20:00:00',
    status: 'ended'
  },
  {
    id: 5,
    title: 'Luxury Handbag',
    image: 'https://example.com/handbag.jpg',
    startingBid: 5000000,
    currentBid: 8000000,
    startTime: '2023-07-09T09:00:00',
    endTime: '2023-07-10T14:00:00',
    status: 'upcoming'
  }
];

const SellerAuction = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterAuctions = (status) => {
    return auctionSessions.filter(session => session.status === status);
  };

  return (
    <Container maxWidth="lg">
      <VendorInformation isView={false} />
      <Typography variant="h4" sx={{ my: 4, fontWeight: 'bold' }}>
        Phiên Đấu Giá
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab label="Đang Diễn Ra" />
        <Tab label="Sắp Diễn Ra" />
        <Tab label="Đã Kết Thúc" />
      </Tabs>

      <Grid container spacing={3}>
        {(tabValue === 0 ? filterAuctions('active') :
          tabValue === 1 ? filterAuctions('upcoming') :
            filterAuctions('ended')).map((auction) => (
          <Grid item xs={12} sm={6} md={4} key={auction.id}>
            <EnhancedAuctionCard {...auction} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SellerAuction;

