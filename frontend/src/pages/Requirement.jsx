import React from 'react'
import Navbar from '../components/DefautComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../components/DefautComponent/Sidenav'
import RequirementList from './requirement/RequirementList'

function Requirement() {
  return (
    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display:'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <RequirementList />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Requirement