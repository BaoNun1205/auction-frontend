import React from 'react'
import Button from '@mui/material/Button'

const Button = ({ children, bgcolor, color, hoverBgcolor }) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: bgcolor || 'common.white',
        color: color || 'common.black',
        borderRadius: '9999px',
        '&:hover': { bgcolor: hoverBgcolor || 'grey.100' }
      }}
    >
      {children}
    </Button>
  )
}

export default Button