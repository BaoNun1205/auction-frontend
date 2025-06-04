import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import AuctionCard from '../AuctionCard';

const featuredAuctions = [
  {
    id: 1,
    name: 'Tranh sơn dầu phong cảnh Paris thế kỷ 19',
    startingPrice: 15000000,
    currentPrice: 28500000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '2 ngày 5 giờ',
    bids: 12,
    status: 'hot',
    percentComplete: 70
  },
  {
    id: 2,
    name: 'Đồng hồ Rolex Vintage 1970',
    startingPrice: 120000000,
    currentPrice: 145000000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '1 ngày 3 giờ',
    bids: 8,
    status: 'new',
    percentComplete: 85
  },
  {
    id: 3,
    name: 'Tượng đồng cổ thời Lê',
    startingPrice: 50000000,
    currentPrice: 62500000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '5 giờ 23 phút',
    bids: 15,
    status: 'ending',
    percentComplete: 95
  },
  {
    id: 4,
    name: 'Bộ sưu tập tem hiếm thế kỷ 20',
    startingPrice: 8000000,
    currentPrice: 12500000,
    image: '/placeholder.svg?height=300&width=300',
    timeLeft: '3 ngày 12 giờ',
    bids: 6,
    status: '',
    percentComplete: 40
  }
];

function FeaturedAuctions() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Phiên đấu giá nổi bật
          </Typography>
          <Button endIcon={<ArrowForward />}>Xem tất cả</Button>
        </Box>
        <Grid container spacing={3}>
          {featuredAuctions.map((auction) => (
            <Grid item xs={12} sm={6} md={3} key={auction.id}>
              <AuctionCard auction={auction} type="featured" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturedAuctions;