import React from 'react'
import Footer from '~/components/Customer/DefautComponent/FooterComponent/Footer'
import CategoryBar from '~/components/Customer/DefautComponent/HeaderComponent/CategoryBar'
import Header from '~/components/Customer/DefautComponent/HeaderComponent/Header'

function CustomerLayout({ children, isCategory = true }) {
  return (
    <>
      <Header />
      {isCategory && <CategoryBar />}
      {children}
      {/* <Footer/>  */}
    </>
  )
}

export default CustomerLayout