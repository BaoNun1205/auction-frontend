import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import UpcomingAuctionList from '~/features/Customer/AuctionSession/UpcomingAuctionList/UpcomingAuctionList'
import CurrentAuctionList from '~/features/Customer/AuctionSession/CurrentAuctionList/CurrentAuctionList'
import Banner from '~/components/Customer/DefautComponent/BannerComponent/BannerComponent'


function CustomerHomePage() {
  return (
    <CustomerLayout>
      <Banner />
      <UpcomingAuctionList />
      <CurrentAuctionList />
    </CustomerLayout>
  )
}

export default CustomerHomePage