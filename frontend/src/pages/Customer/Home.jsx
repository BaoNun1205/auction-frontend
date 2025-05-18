import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import UpcomingAuctionList from '~/features/Customer/AuctionSession/UpcomingAuctionList/UpcomingAuctionList'
import CurrentAuctionList from '~/features/Customer/AuctionSession/CurrentAuctionList/CurrentAuctionList'
import Banner from '~/components/Customer/DefautComponent/BannerComponent/BannerComponent'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function CustomerHomePage() {
  const navigate = useNavigate()
  return (
    <CustomerLayout>
      <Banner />
      <UpcomingAuctionList />
      <CurrentAuctionList />
      <Box display="flex" justifyContent="center" my={3}>
        <Typography
          onClick={() => navigate('/search')}
          sx={{
            color: '#b41712',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
              color: '#8B0000'
            }
          }}
        >
          Xem thêm
        </Typography>
      </Box>
    </CustomerLayout>
  )
}

export default CustomerHomePage