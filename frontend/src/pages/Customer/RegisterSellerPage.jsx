import React from 'react'
import RegisterAuctionDetail from '~/features/Customer/AuctionSession/RegisterAuctionDetail/RegisterAuctionDetail'
import RegisterSeller from '~/features/Customer/PersonalInformation/RegisterSeller'
import CustomerLayout from '~/layouts/CustomerLayout'

function RegisterSellerPage() {
  return (
    <CustomerLayout>
        <RegisterSeller/>
    </CustomerLayout>
  )
}

export default RegisterSellerPage