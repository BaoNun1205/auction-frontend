import React from 'react'
import CustomerLayout from '~/layouts/CustomerLayout'
import TimedAuctionDetail from '~/features/Customer/AuctionSession/TimedAuctionDetails'

function TimedAuctionDetailPage() {
  return (
    <CustomerLayout>
        <TimedAuctionDetail/>
    </CustomerLayout>
  )
}

export default TimedAuctionDetailPage