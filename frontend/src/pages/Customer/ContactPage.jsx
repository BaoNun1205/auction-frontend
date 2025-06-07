import React from 'react'
import Contact from '~/components/Customer/DefautComponent/Contact/Contact'
import CustomerLayout from '~/layouts/CustomerLayout'

function ContactPage() {
  return (
    <CustomerLayout isCategory={false}>
      <Contact />
    </CustomerLayout>
  )
}

export default ContactPage