import React from 'react'
import Button from '@mui/material/Button'

const ButtonComponent = ({ children, bgcolor, color, hoverBgcolor, onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
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

export default ButtonComponent