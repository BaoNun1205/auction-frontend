import React from 'react'
import Header from '~/components/DefautComponent/HeaderComponent/Header'
import Footer from '~/components/DefautComponent/FooterComponent/Footer'
import CategoryBar from '~/components/DefautComponent/HeaderComponent/CategoryBar'

function CustomerLayout({ children }) {
  return (
      <>
      <Header />
      <CategoryBar/>
      {children}
      {/* <Footer/>  */}
      </>
  )
}

export default CustomerLayout