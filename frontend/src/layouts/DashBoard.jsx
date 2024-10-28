import React from 'react'
import Navbar from '~/components/DefautComponent/NavbarComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '~/components/DefautComponent/SidenavComponent/Sidenav'

function Dashboard({ children }) {
  return (
    <div className='bgcolor'>
      <Navbar />
      <Box sx={(theme) => ({ display:'flex', bgcolor: theme.palette.primary.main })}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, py: 12, minHeight: '100vh', height: 'auto', overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard