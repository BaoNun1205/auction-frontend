import React from 'react'
import CustomerPersonalProfile from '~/features/Customer/PersonalInformation/PersonalInformation'
import CustomerLayout from '~/layouts/CustomerLayout'

function CustomerProfilePage() {
  return (
    <CustomerLayout>
        <CustomerPersonalProfile/>
    </CustomerLayout>
  )
}

export default CustomerProfilePage