import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import UpcomingProductList from '~/features/Customer/AuctionSession/UpcomingAuctionProductList'


function CustomerHomePage() {
  return (
    <CustomerLayout>
      <UpcomingProductList />
    </CustomerLayout>
  )
}

export default CustomerHomePage