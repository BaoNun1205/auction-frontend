import React from 'react'
import Header from '~/components/Vendor/DefaultComponent/HeaderComponent/Header'

function VendorLayout({ children, isCategory = true }) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer/>  */}
    </>
  )
}

export default VendorLayout