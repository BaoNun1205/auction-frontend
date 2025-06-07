import React from 'react'
import PaymentSuccess from '~/features/Customer/Profile/WonItems/component/PaymentSuccess'
import CustomerLayout from '~/layouts/CustomerLayout'

function PaymentSuccessPage() {
  return (
    <CustomerLayout isCategory={false}>
      <PaymentSuccess />
    </CustomerLayout>
  )
}

export default PaymentSuccessPage