import React from 'react'
import Navbar from '../../components/DefautComponent/NavbarComponent/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../../components/DefautComponent/SidenavComponent/Sidenav'
import EditorPage from '~/features/Home/Editor'
import { useAppStore } from '~/store/appStore'

export default function HomePage() {
  return (
    <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display:'flex', bgcolor: '#000000' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'primary.main' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <h1>Welcome to the Home Page</h1>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}