import React from 'react'
import Profile from '~/features/Customer/Profile/Profile'
import CustomerLayout from '~/layouts/CustomerLayout'

function ProfilePage() {
  return (
    <CustomerLayout>
        <Profile />
    </CustomerLayout>
  )
}

export default ProfilePage