import React from 'react'
import Button from '@mui/material/Button'

const IconButtonComponent = ({ startIcon, children }) => {
  return (
    <Button
      startIcon={startIcon}
      sx={{ color: 'inherit', textTransform: 'none' }}
    >
      {children}
    </Button>
  )
}

export default IconButtonComponent