import React from 'react'
import Navbar from '../components/DefautComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../components/DefautComponent/Sidenav'
import UserList from './user/UserList'

function User() {
  return (
    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display:'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <UserList />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default User