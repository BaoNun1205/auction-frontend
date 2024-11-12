import React from 'react'
import SessionList from '~/features/Session/SessionList/SessionList'
import Dashboard from '~/layouts/DashBoard'

function SessionListPage() {
  return (
    <Dashboard>
      <SessionList />
    </Dashboard>
  )
}

export default SessionListPage