import React from 'react'
import CategoryList from '~/features/Category/CategoryList/CategoryList'
import Dashboard from '~/layouts/DashBoard'

function CategoryListPage() {
  return (
    <Dashboard>
      <CategoryList />
    </Dashboard>
  )
}

export default CategoryListPage