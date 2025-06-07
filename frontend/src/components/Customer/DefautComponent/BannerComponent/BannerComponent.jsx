// import React from 'react'
// import { Box, IconButton } from '@mui/material'
// import ContactMailIcon from '@mui/icons-material/ContactMail'
// import BannerImage from '~/assets/images/banner.png'

// const Banner = () => {
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         width: '100%',
//         height: { xs: '300px', sm: '450px', md: '600px', lg: '729px' },
//         backgroundImage: `url(${BannerImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     />
//   );
// };

// export default Banner

import React from 'react'
import { Box, Typography, Container, Grid, Chip } from '@mui/material'
import { Gavel, TrendingUp, AccessTime } from '@mui/icons-material'

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '400px', md: '600px' },
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'rgba(180, 23, 18, 0.08)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'rgba(180, 23, 18, 0.05)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'rgba(180, 23, 18, 0.03)',
          animation: 'float 10s ease-in-out infinite'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ color: '#333' }}>
              <Chip
                icon={<Gavel sx={{ color: 'white' }} />}
                label="LIVE AUCTION"
                sx={{
                  bgcolor: '#b41712',
                  color: 'white',
                  fontWeight: '600',
                  mb: 3,
                  boxShadow: '0 4px 15px rgba(180, 23, 18, 0.3)',
                  animation: 'glow 3s ease-in-out infinite alternate',
                  '&:hover': {
                    bgcolor: '#8B0000'
                  }
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: '700',
                  mb: 2,
                  fontSize: { xs: '2.2rem', md: '3.5rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  lineHeight: 1.2,
                  color: '#2c2c2c'
                }}
              >
                Đấu Giá Trực Tuyến
                <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #b41712 0%, #d32f2f 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Uy Tín & Minh Bạch
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.8,
                  maxWidth: '600px',
                  fontWeight: '400',
                  lineHeight: 1.6,
                  color: '#555'
                }}
              >
                Tham gia đấu giá các sản phẩm chất lượng cao với giá cả hợp lý. Hệ thống bảo mật tuyệt đối và giao dịch
                minh bạch.
              </Typography>

              {/* Quick Stats */}
              <Box sx={{ display: 'flex', gap: 4, mb: 3, flexWrap: 'wrap' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: 'rgba(180, 23, 18, 0.05)',
                    border: '1px solid rgba(180, 23, 18, 0.1)',
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(180, 23, 18, 0.08)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(180, 23, 18, 0.15)'
                    }
                  }}
                >
                  <TrendingUp sx={{ color: '#b41712', fontSize: 22 }} />
                  <Typography variant="body2" sx={{ fontWeight: '600', color: '#333' }}>
                    <strong style={{ color: '#b41712' }}>500+</strong> Đấu giá thành công
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: 'rgba(180, 23, 18, 0.05)',
                    border: '1px solid rgba(180, 23, 18, 0.1)',
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(180, 23, 18, 0.08)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(180, 23, 18, 0.15)'
                    }
                  }}
                >
                  <AccessTime sx={{ color: '#b41712', fontSize: 22 }} />
                  <Typography variant="body2" sx={{ fontWeight: '600', color: '#333' }}>
                    <strong style={{ color: '#b41712' }}>24/7</strong> Hỗ trợ khách hàng
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: { xs: 280, md: 320 },
                  height: { xs: 280, md: 320 },
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(180,23,18,0.05) 0%, rgba(180,23,18,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(180,23,18,0.15)',
                  animation: 'rotate 30s linear infinite',
                  boxShadow: '0 10px 40px rgba(180,23,18,0.1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #b41712, #d32f2f, #b41712)',
                    zIndex: -1,
                    animation: 'rotate 20s linear infinite reverse'
                  }
                }}
              >
                <Gavel
                  sx={{
                    fontSize: { xs: 60, md: 80 },
                    color: '#fff',
                    filter: 'drop-shadow(0 4px 8px rgba(180,23,18,0.3))'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-15px) scale(1.05); 
            opacity: 1;
          }
        }
        @keyframes glow {
          0% { 
            box-shadow: 0 4px 15px rgba(180, 23, 18, 0.3);
          }
          100% { 
            box-shadow: 0 4px 25px rgba(180, 23, 18, 0.5);
          }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  )
}

export default Banner
