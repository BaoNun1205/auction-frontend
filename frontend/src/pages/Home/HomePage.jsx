import React from 'react'
import { Box } from '@mui/material'
import Sidenav from '../../components/DefautComponent/SidenavComponent/Sidenav'
import { useAppStore } from '~/store/appStore'
import ChartPage from './ChartPage.jsx'

export default function HomePage() {
  const role = useAppStore((state) => state.role)
  return (
    <>
      <div className='bgcolor'>
        <Box sx={{ display:'flex'}}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'primary.main' }}>
            <ChartPage/>
          </Box>
        </Box>
      </div>
    </>
  )
}