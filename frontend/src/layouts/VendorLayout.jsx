import React from 'react'
import Footer from '~/components/Customer/DefautComponent/FooterComponent/Footer'
import Header from '~/components/Customer/DefautComponent/HeaderComponent/Header'

function VendorLayout({ children, isCategory = true }) {
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  )
}

export default VendorLayout