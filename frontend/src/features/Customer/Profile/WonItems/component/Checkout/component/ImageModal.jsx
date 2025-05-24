import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Fade,
  Backdrop
} from '@mui/material'
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close
} from '@mui/icons-material'

export const ImageModal = ({ open, handleClose, images, currentIndex, setCurrentIndex }) => {
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none'
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <Close />
          </IconButton>

          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={images[currentIndex].imageAsset || '/placeholder.svg?height=800&width=800'}
              alt={`Full size image ${currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
              }}
            />

            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 16,
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <Typography
                variant="caption"
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', px: 2, py: 0.8, borderRadius: 4 }}
              >
                {currentIndex + 1} / {images.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}