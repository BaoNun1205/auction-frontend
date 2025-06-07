import React from 'react'
import Checkout from '~/features/Customer/Profile/WonItems/component/Checkout'
import CustomerLayout from '~/layouts/CustomerLayout'

function CheckoutPage() {
  return (
    <CustomerLayout isCategory={false}>
      <Checkout />
    </CustomerLayout>
  )
}

export default CheckoutPage