import React from 'react'
import Navbar from '../../components/DefautComponent/NavbarComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../../components/DefautComponent/SidenavComponent/Sidenav'
import UserList from '../../features/user/UserList'

function User() {
  return (
    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display:'flex', bgcolor: '#000000' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'primary.main' }}>
            <UserList />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default User