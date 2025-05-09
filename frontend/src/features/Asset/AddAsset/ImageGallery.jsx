import React, { useState } from 'react'
import { Box, Modal, Grid, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleOpen = (image) => {
    setSelectedImage(image)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedImage(null)
  }

  // Lấy tối đa 6 ảnh từ danh sách images
  const displayedImages = images.slice(0, 6)

  return (
    <>
      <Grid container spacing={2}>
        {displayedImages.map((image, index) => (
          <Grid item xs={4} key={index}>
            <Box
              component="img"
              src={image}
              alt={`Image ${index + 1}`}
              sx={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: 1,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  opacity: 0.8
                }
              }}
              onClick={() => handleOpen(image)}
            />
          </Grid>
        ))}
        {/* Nếu không đủ 6 ảnh, hiển thị placeholder hoặc để trống */}
        {Array.from({ length: 6 - displayedImages.length }).map((_, index) => (
          <Grid item xs={4} key={`placeholder-${index}`}>
            <Box
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: '#f0f0f0',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              No Image
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Modal để hiển thị ảnh lớn */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 2
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={selectedImage}
            alt="Selected Image"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 1
            }}
          />
        </Box>
      </Modal>
    </>
  )
}

export default ImageGallery