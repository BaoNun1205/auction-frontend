import React from 'react'
import Header from '~/components/Customer/DefautComponent/HeaderComponent/Header'

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