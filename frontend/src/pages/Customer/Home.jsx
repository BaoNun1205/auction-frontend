import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import UpcomingProductList from '~/features/Customer/AuctionSession/UpcomingAuctionProductList'
import Banner from '~/components/DefautComponent/BannerComponent/BannerComponent'
import UpcomingAuctions from '~/features/Customer/AuctionSession/UpcomingAuctions'
import CurrentAuctions from '~/features/Customer/AuctionSession/CurrentAuctions'


function CustomerHomePage() {
  return (
    <CustomerLayout>
      <Banner/>
      <UpcomingAuctions />
      <CurrentAuctions />
    </CustomerLayout>
  )
}

export default CustomerHomePage