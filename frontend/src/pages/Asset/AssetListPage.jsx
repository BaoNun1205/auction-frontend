import React from 'react'
import AssetList from '~/features/Asset/AssetList/AssetList'
import Dashboard from '~/layouts/DashBoard'

function AssetListPage() {
  return (
    <Dashboard>
      <AssetList />
    </Dashboard>
  )
}

export default AssetListPage