import React from 'react'
import Invoice from '~/features/Customer/Profile/Invoice'
import CustomerLayout from '~/layouts/CustomerLayout'

function InvoicePage() {
  return (
    <CustomerLayout isCategory={false}>
      <Invoice />
    </CustomerLayout>
  )
}

export default InvoicePage