import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid, Paper, Modal, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { FiMaximize2, FiX } from 'react-icons/fi';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  height: '100px',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ModalImage = styled('img')({
  maxWidth: '80vw',
  maxHeight: '80vh',
  objectFit: 'contain',
});

// Cập nhật phần mô tả có chiều cao động và có scroll khi cần
const DescriptionContainer = styled(Box)(({ theme }) => ({
  padding: '1rem',
  border: '1px solid #ddd', // Đặt viền cho phần mô tả
  borderRadius: '8px',
  backgroundColor: '#f9f9f9', // Nền nhẹ nhàng
  marginTop: '1rem',
  whiteSpace: 'pre-line', // Giữ nguyên dòng mới nếu có
  overflowY: 'auto', // Kích hoạt thanh cuộn khi nội dung vượt quá chiều cao
}));

const AssetsDetailsDialog = ({ open, onClose, asset }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    assetName: 'Unknown Asset',
    startingPrice: 'N/A',
    status: 'N/A',
    description: 'No description available',
    images: [],
    documents: [],
    type: {
      typeName: 'Unknown Type',
      typeImage: '',
    },
  });

  useEffect(() => {
    if (asset) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        assetName: asset.assetName || 'Unknown Asset',
        startingPrice: asset.assetPrice || 'N/A',
        status: asset.status === '0' ? 'Inactive' : 'Active', // Assuming '0' means inactive
        description: asset.assetDescription || 'No description available',
        images: asset.listImages.slice(0, 4).map((image) => image.imageAsset) || [], // Lấy 4 ảnh đầu tiên
        documents: asset.listImages.slice(-2).map((image) => image.imageAsset) || [], // Lấy 2 ảnh cuối
        type: {
          typeName: asset.type?.typeName || 'Unknown Type',
          typeImage: asset.type?.image || '',
        },
      }));
    }
  }, [asset]); // This will run when the 'asset' prop changes

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
    >
      <Box sx={{ maxWidth: '600px', width: '100%' }}>
        <StyledPaper elevation={3}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mb: 2,
              padding: '8px 16px',      
              borderRadius: '4px',       
              textAlign: 'center',        
              display: 'flex',      
              justifyContent: 'center',  
              alignItems: 'center',       
            }}
          >
            Chi tiết tài sản
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên tài sản"
                value={initialValues.assetName}
                InputProps={{ readOnly: true }}
                aria-label="Tên tài sản"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá khởi điểm"
                type="number"
                value={initialValues.startingPrice}
                InputProps={{ readOnly: true }}
                aria-label="Giá khởi điểm"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select value={initialValues.status} label="Trạng thái" inputProps={{ readOnly: true }} aria-label="Trạng thái">
                  <MenuItem value="Active">Đang đấu giá</MenuItem>
                  <MenuItem value="Inactive">Chưa đấu giá</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loại tài sản"
                value={initialValues.type.typeName}
                InputProps={{ readOnly: true }}
                aria-label="Loại tài sản"
              />
            </Grid>

            <Grid item xs={12}>
              {/* Render phần mô tả với HTML */}
              <DescriptionContainer>
                <div dangerouslySetInnerHTML={{ __html: initialValues.description }} />
              </DescriptionContainer>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Hình ảnh tài sản
              </Typography>
              <Grid container spacing={1}>
                {initialValues.images.length > 0 ? initialValues.images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ImageContainer onClick={() => handleImageClick(image)}>
                      <StyledImage
                        src={image}
                        alt={`Asset ${index + 1}`}
                        loading="lazy"
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        <FiMaximize2 />
                      </IconButton>
                    </ImageContainer>
                  </Grid>
                )) : (
                  <Grid item xs={12}>Không có hình ảnh</Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Hình ảnh giấy tờ
              </Typography>
              <Grid container spacing={1}>
                {initialValues.documents.length > 0 ? initialValues.documents.map((image, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ImageContainer onClick={() => handleImageClick(image)}>
                      <StyledImage
                        src={image}
                        alt={`Document ${index + 1}`}
                        loading="lazy"
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        <FiMaximize2 />
                      </IconButton>
                    </ImageContainer>
                  </Grid>
                )) : (
                  <Grid item xs={12}>Không có tài liệu</Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* Modal to show enlarged image */}
          <Modal
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            aria-labelledby="image-modal"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => setSelectedImage(null)}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: -20,
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <FiX />
              </IconButton>
              <ModalImage
                src={selectedImage || ''}
                alt="Xem phóng to"
                loading="lazy"
              />
            </Box>
          </Modal>
        </StyledPaper>
      </Box>
    </Modal>
  );
};

export default AssetsDetailsDialog;
