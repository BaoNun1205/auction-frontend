import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import CustomerLayout from '~/layouts/CustomerLayout';
import Banner from '~/components/Customer/DefautComponent/BannerComponent/BannerComponent';
import AuctionCategories from '~/features/Customer/Home/components/AuctionCategories';
import OngoingAuctions from '~/features/Customer/Home/components/OngoingAuctions';
import UpcomingAuctions from '~/features/Customer/Home/components/UpcomingAuctions';

function CustomerHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  const ongoingRef = useRef(null);
  const upcomingRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'currentAuction' && ongoingRef.current) {
      ongoingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.state?.scrollTo === 'upcoming' && upcomingRef.current) {
      upcomingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <CustomerLayout isCategory={true}>
      <Box>
        <Banner />
        {/* <HeroBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} /> */}
        <AuctionCategories />
        {/* <FeaturedAuctions /> */}
        <Box ref={ongoingRef}>
          <OngoingAuctions />
        </Box>
        <Box ref={upcomingRef}>
          <UpcomingAuctions />
        </Box>
      </Box>
    </CustomerLayout>
  );
}

export default CustomerHomePage;
