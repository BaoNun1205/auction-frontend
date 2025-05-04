import React from 'react'
import { Box, IconButton } from '@mui/material'
import ContactMailIcon from '@mui/icons-material/ContactMail'


const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '729px',
        backgroundImage: 'url(./src/assets/images/banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'

      }}
    >
    </Box>
  )
}

export default Banner