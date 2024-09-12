import React from 'react'
import Navbar from '../components/DefautComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../components/DefautComponent/Sidenav'
import SessionList from './session/SessionList'

function Session() {
  return (
    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display:'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <SessionList />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Session