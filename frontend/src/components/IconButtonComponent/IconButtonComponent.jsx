import React from 'react'
import Button from '@mui/material/Button'

const IconButtonComponent = ({ startIcon, children, ...props }) => {
  return (
    <Button
      startIcon={startIcon}
      {...props}
      sx={(theme) => ({ color: theme.palette.primary.textMain, textTransform: 'none' })
    }
    >
      {children}
    </Button>
  )
}

export default IconButtonComponent