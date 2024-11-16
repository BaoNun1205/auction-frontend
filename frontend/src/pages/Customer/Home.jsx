import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import Banner from '~/components/DefautComponent/BannerComponent/BannerComponent'
import UpcomingAuctionList from '~/features/Customer/AuctionSession/UpcomingAuctionList/UpcomingAuctionList'
import CurrentAuctionList from '~/features/Customer/AuctionSession/CurrentAuctionList/CurrentAuctionList'


function CustomerHomePage() {
  return (
    <CustomerLayout>
      <Banner/>
      <UpcomingAuctionList />
      <CurrentAuctionList />
    </CustomerLayout>
  )
}

export default CustomerHomePage