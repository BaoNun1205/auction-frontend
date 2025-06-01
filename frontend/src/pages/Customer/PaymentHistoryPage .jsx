import React from 'react'
import PaymentHistory from '~/features/Customer/Profile/PaymentHistory'
import CustomerLayout from '~/layouts/CustomerLayout'

function PaymentHistoryPage() {
  return (
    <CustomerLayout isCategory={false}>
      <PaymentHistory />
    </CustomerLayout>
  )
}

export default PaymentHistoryPage