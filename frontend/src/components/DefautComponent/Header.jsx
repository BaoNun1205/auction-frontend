import React from 'react'
import Box from '@mui/material/Box'

function Header() {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 2, height: (theme) => theme.auction.appBarHeight
    }}>
      Header
    </Box>
  )
}

export default Header