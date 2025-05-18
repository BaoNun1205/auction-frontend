import React from 'react'
import Introduction from '~/components/Customer/DefautComponent/Introduction/Introduction'
import CustomerLayout from '~/layouts/CustomerLayout'

function IntroductionPage() {
  return (
    <CustomerLayout isCategory={false}>
      <Introduction />
    </CustomerLayout>
  )
}

export default IntroductionPage