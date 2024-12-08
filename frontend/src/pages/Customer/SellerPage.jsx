import React from 'react'
import SellerAuction from '~/features/Customer/SellerAuction'
import CustomerLayout from '~/layouts/CustomerLayout'

function SellerPage() {
  return (
    <CustomerLayout isCategory={false}>
      <SellerAuction />
    </CustomerLayout>
  )
}

export default SellerPage