import React from 'react'
import Header from '~/components/DefautComponent/HeaderComponent/Header'
import Footer from '~/components/DefautComponent/FooterComponent/Footer'
import CategoryBar from '~/components/DefautComponent/HeaderComponent/CategoryBar'

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