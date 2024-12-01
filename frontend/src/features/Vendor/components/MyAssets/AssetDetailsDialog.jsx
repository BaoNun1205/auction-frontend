import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2),
  },
}));

const ImageContainer = styled(Box)({
  height: 300,
  width: '100%',
  position: 'relative',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const AssetDetailsDialog = ({ open, onClose, asset }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (!asset) return null;

  return (
    <StyledDialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Chi tiết tài sản
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'inherit',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Slider {...sliderSettings}>
              {asset.images.map((image, index) => (
                <ImageContainer key={index}>
                  <img src={image} alt={`Asset ${index + 1}`} />
                </ImageContainer>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {asset.assetName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Danh mục: {asset.type.typeName}
            </Typography>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              Giá khởi điểm: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(asset.assetPrice)}
            </Typography>
            <Chip 
              label={asset.status === '0' ? 'Chưa đấu giá' : asset.status === 'bidding' ? 'Đang đấu giá' : 'Đã đấu giá thành công'}
              color={asset.status === '0' ? 'warning' : asset.status === 'bidding' ? 'primary' : 'success'}
              sx={{ mt: 1, mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Thời gian tạo: {new Date(asset.createdAt).toLocaleString('vi-VN')}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              Mô tả
            </Typography>
            <Typography variant="body1">
              {asset.assetDescription}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
};

export default AssetDetailsDialog;

