import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomerLayout from '~/layouts/CustomerLayout';
import HeroBanner from './components/HeroBanner';
import AuctionCategories from './components/AuctionCategories';
import FeaturedAuctions from './components/FeaturedAuctions';
import UpcomingAuctions from './components/UpcomingAuctions';
import OngoingAuctions from './components/OngoingAuctions';

function CustomerHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <CustomerLayout isCategory={false}>
      <Box>
        <HeroBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <AuctionCategories />
        <FeaturedAuctions />
        <UpcomingAuctions />
        <OngoingAuctions />
      </Box>
    </CustomerLayout>
  );
}

export default CustomerHomePage;