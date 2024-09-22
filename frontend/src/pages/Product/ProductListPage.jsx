import React from 'react'
import ProductList from '../../features/product/ProductList'
import Dashboard from '../../layouts/DashBoard'

function ProductListPage() {
  return (
    <Dashboard>
      <ProductList />
    </Dashboard>
  )
}

export default ProductListPage