
import React from 'react'
import NotFound from '~/components/NotFound'
import CustomerLayout from '~/layouts/CustomerLayout'

function NotFoundPage() {
  return (
    <CustomerLayout isCategory={false}>
      <NotFound />
    </CustomerLayout>
  )
}

export default NotFoundPage
