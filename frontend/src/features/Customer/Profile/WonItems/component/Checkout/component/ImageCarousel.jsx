import React, { useState } from 'react'
import {
  Box,
  Typography,
  CardMedia,
  IconButton
} from '@mui/material'
import {
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material'

export const ImageCarousel = ({ images, openImageModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, md: 450 },
        mb: 2,
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 2
      }}
      onClick={() => openImageModal(currentIndex)}
    >
      <CardMedia
        component="img"
        height="100%"
        image={images[currentIndex].imageAsset || '/placeholder.svg?height=450&width=450'}
        alt={`Image ${currentIndex + 1}`}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2
        }}
        onClick={handlePrev}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2
        }}
        onClick={handleNext}
      >
        <ArrowForwardIos />
      </IconButton>
      <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <Typography
          variant="caption"
          sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', px: 2, py: 0.8, borderRadius: 4 }}
        >
          {currentIndex + 1} / {images.length}
        </Typography>
      </Box>
    </Box>
  )
}