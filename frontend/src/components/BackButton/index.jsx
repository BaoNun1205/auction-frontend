import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const BackButton = ({ label = 'Quay lại', onClick, sx }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, ...sx }}>
      <IconButton onClick={handleClick} aria-label={label} sx={{ mr: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" fontWeight="bold">
        {label}
      </Typography>
    </Box>
  )
}

export default BackButton