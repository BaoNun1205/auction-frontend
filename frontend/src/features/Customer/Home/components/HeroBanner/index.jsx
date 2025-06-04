import React from 'react';
import { Box, Container, Typography, Grid, Button, IconButton } from '@mui/material';
import { Gavel, ArrowBack, ArrowForward } from '@mui/icons-material';

const bannerSlides = [
  {
    id: 1,
    title: 'Phiên Đấu Giá Đặc Biệt',
    subtitle: 'Bộ sưu tập nghệ thuật quý hiếm từ các danh họa Việt Nam',
    image: '/placeholder.svg?height=500&width=1200',
    buttonText: 'Tham gia ngay',
    color: '#8B0000'
  },
  {
    id: 2,
    title: 'Đấu Giá Trực Tuyến',
    subtitle: 'Cơ hội sở hữu những món đồ độc đáo với giá hợp lý',
    image: '/placeholder.svg?height=500&width=1200',
    buttonText: 'Khám phá',
    color: '#1A5276'
  },
  {
    id: 3,
    title: 'Đấu Giá Từ Thiện',
    subtitle: 'Đấu giá và đóng góp cho các hoạt động xã hội ý nghĩa',
    image: '/placeholder.svg?height=500&width=1200',
    buttonText: 'Tìm hiểu thêm',
    color: '#186A3B'
  }
];

function HeroBanner({ currentSlide, setCurrentSlide }) {
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <Box sx={{ position: 'relative', height: 500, overflow: 'hidden' }}>
      {bannerSlides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${slide.color} 0%, ${slide.color}CC 100%)`,
            display: 'flex',
            alignItems: 'center',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
                  {slide.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mb: 4, opacity: 0.9 }}>
                  {slide.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Gavel />}
                  sx={{
                    bgcolor: 'white',
                    color: slide.color,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    }
                  }}
                >
                  {slide.buttonText}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={slide.image}
                  alt={slide.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}

      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
        }}
      >
        <ArrowForward />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        {bannerSlides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default HeroBanner;