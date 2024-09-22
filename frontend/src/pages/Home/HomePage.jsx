import React from 'react'
import Box from '@mui/material/Box'
import Sidenav from '../../components/DefautComponent/Sidenav'
import Navbar from '../../components/DefautComponent/Navbar'

function HomePage() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav>
          <h1>Home</h1>
        </Sidenav>
      </Box>
    </>
  )
}

export default HomePage