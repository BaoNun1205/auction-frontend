import React from 'react'
import News from '~/components/Customer/DefautComponent/News/News'
import CustomerLayout from '~/layouts/CustomerLayout'

function NewsPage() {
  return (
    <CustomerLayout isCategory={false}>
      <News />
    </CustomerLayout>
  )
}

export default NewsPage