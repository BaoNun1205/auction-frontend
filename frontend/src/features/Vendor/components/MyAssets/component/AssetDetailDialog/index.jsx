import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Typography,
  Grid,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Button
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ImageIcon from '@mui/icons-material/Image'
import DescriptionIcon from '@mui/icons-material/Description'
import ArticleIcon from '@mui/icons-material/Article'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '32px',
  maxHeight: '90vh',
  overflow: 'auto',
  position: 'relative',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}))

const ImageContainer = styled(Box)({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '2px solid #e0e0e0',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#b41712',
    transform: 'scale(1.02)',
    '& .zoom-overlay': {
      opacity: 1
    }
  }
})

const StyledImage = styled('img')({
  width: '100%',
  height: '140px',
  objectFit: 'cover',
  display: 'block'
})

const ZoomOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease'
})

const ModalImage = styled('img')({
  maxWidth: '90vw',
  maxHeight: '90vh',
  objectFit: 'contain',
  borderRadius: '12px'
})

const DescriptionContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  maxHeight: '200px',
  overflow: 'auto',
  '& p': {
    margin: '8px 0',
    lineHeight: 1.6
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    margin: '8px 0'
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    margin: '16px 0 8px 0',
    color: '#1a1a1a'
  },
  '& ul, & ol': {
    paddingLeft: '20px',
    margin: '8px 0'
  },
  '& li': {
    margin: '4px 0'
  }
}))

const SectionTitle = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px',
  fontWeight: '600',
  color: '#1a1a1a'
})

const AssetDetailDialog = ({ open, onClose, asset }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [initialValues, setInitialValues] = useState({
    assetName: 'Unknown Asset',
    startingPrice: 'N/A',
    status: 'N/A',
    description: 'No description available',
    images: [],
    documents: [],
    type: {
      typeName: 'Unknown Type',
      typeImage: ''
    }
  })

  useEffect(() => {
    if (asset) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        assetName: asset.assetName || 'Unknown Asset',
        startingPrice: asset.assetPrice || 'N/A',
        status: asset.status === '0' ? 'Inactive' : 'Active',
        description: asset.assetDescription || 'No description available',
        images: asset.listImages?.slice(0, 4).map((image) => image.imageAsset) || [],
        documents: asset.listImages?.slice(-2).map((image) => image.imageAsset) || [],
        type: {
          typeName: asset.type?.typeName || 'Unknown Type',
          typeImage: asset.type?.image || ''
        }
      }))
    }
  }, [asset])

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const handleCloseImageModal = () => {
    setSelectedImage(null)
  }

  if (!asset) {
    return null
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="asset-detail-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        zIndex: 1300
      }}
    >
      <Box sx={{ maxWidth: '900px', width: '100%' }}>
        <StyledPaper>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="#b41712">
              Chi tiết vật phẩm
            </Typography>
            <IconButton
              onClick={onClose}
              size="large"
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên vật phẩm"
                value={initialValues.assetName}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá khởi điểm"
                value={
                  typeof initialValues.startingPrice === 'number'
                    ? `${initialValues.startingPrice.toLocaleString('vi-VN')} VNĐ`
                    : initialValues.startingPrice
                }
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              >
                <InputLabel>Trạng thái</InputLabel>
                <Select value={initialValues.status} label="Trạng thái" inputProps={{ readOnly: true }}>
                  <MenuItem value="Active">Đang đấu giá</MenuItem>
                  <MenuItem value="Inactive">Chưa đấu giá</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loại vật phẩm"
                value={initialValues.type.typeName}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <SectionTitle variant="h6">
                <DescriptionIcon color="#b41712" />
                Mô tả vật phẩm
              </SectionTitle>
              <DescriptionContainer>
                <div dangerouslySetInnerHTML={{ __html: initialValues.description }} />
              </DescriptionContainer>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <SectionTitle variant="h6">
                <ImageIcon color="#b41712" />
                Hình ảnh vật phẩm ({initialValues.images.length})
              </SectionTitle>

              {initialValues.images.length > 0 ? (
                <Grid container spacing={2}>
                  {initialValues.images.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <ImageContainer onClick={() => handleImageClick(image)}>
                        <StyledImage
                          src={image || '/placeholder.svg?height=140&width=140'}
                          alt={`${initialValues.assetName} - Hình ${index + 1}`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/placeholder.svg?height=140&width=140'
                          }}
                        />
                        <ZoomOverlay className="zoom-overlay">
                          <ZoomInIcon sx={{ color: 'white', fontSize: 32 }} />
                        </ZoomOverlay>
                      </ImageContainer>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'grey.50'
                  }}
                >
                  <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography color="text.secondary">Không có hình ảnh vật phẩm</Typography>
                </Box>
              )}
            </Grid>

            {/* Documents */}
            <Grid item xs={12}>
              <SectionTitle variant="h6">
                <ArticleIcon color="#b41712" />
                Hình ảnh giấy tờ ({initialValues.documents.length})
              </SectionTitle>

              {initialValues.documents.length > 0 ? (
                <Grid container spacing={2}>
                  {initialValues.documents.map((image, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <ImageContainer onClick={() => handleImageClick(image)}>
                        <StyledImage
                          src={image || '/placeholder.svg?height=140&width=140'}
                          alt={`Tài liệu ${index + 1}`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/placeholder.svg?height=140&width=140'
                          }}
                        />
                        <ZoomOverlay className="zoom-overlay">
                          <ZoomInIcon sx={{ color: 'white', fontSize: 32 }} />
                        </ZoomOverlay>
                      </ImageContainer>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'grey.50'
                  }}
                >
                  <ArticleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography color="text.secondary">Không có tài liệu</Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              size="large"
              sx={{
                borderRadius: '12px',
                px: 4
              }}
            >
              Đóng
            </Button>
          </Box>
        </StyledPaper>

        {/* Image Modal */}
        <Modal
          open={!!selectedImage}
          onClose={handleCloseImageModal}
          aria-labelledby="image-modal"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            zIndex: 1400
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleCloseImageModal}
              sx={{
                position: 'absolute',
                right: -20,
                top: -20,
                backgroundColor: 'white',
                boxShadow: 2,
                '&:hover': { backgroundColor: 'grey.100' },
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <ModalImage
              src={selectedImage || ''}
              alt="Xem phóng to"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder.svg?height=400&width=400'
              }}
            />
          </Box>
        </Modal>
      </Box>
    </Modal>
  )
}

export default AssetDetailDialog
