import React from 'react'
import Navbar from '../components/DefautComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../components/DefautComponent/Sidenav'

function Dashboard({ children }) {
  return (
    <div className='bgcolor'>
      <Navbar />
      <Box sx={{ display:'flex', bgcolor: 'primary.main' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, pt: 12, height: '100vh' }}>
          {children}
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard