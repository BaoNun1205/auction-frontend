import React from 'react'
import RequirementList from '~/features/Requirement/RequirementList/RequirementList'
import RequirementList2 from '~/features/Requirement/RequirementList/RequirementList2'
import Dashboard from '~/layouts/DashBoard'

function RequirementListPage() {
  return (
    <Dashboard>
      <RequirementList />
    </Dashboard>
  )
}

export default RequirementListPage