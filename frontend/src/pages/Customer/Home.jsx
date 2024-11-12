import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import UpcomingProductList from '~/features/Customer/AuctionSession/UpcomingAuctionProductList'
import Banner from '~/components/DefautComponent/BannerComponent/BannerComponent'


function CustomerHomePage() {
  return (
    <CustomerLayout>
      <Banner/>
      <UpcomingProductList />
    </CustomerLayout>
  )
}

export default CustomerHomePage