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

import React, { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid, useTheme, useMediaQuery, Fade, Slide } from '@mui/material'
import { Language, Phone } from '@mui/icons-material'
import { keyframes } from '@mui/system'
import { primaryColor } from '~/utils/config'
import BannerImage from '~/assets/images/banner.jpg'

// Custom animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const slideInLeft = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideInRight = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

const dotPattern = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
`

const BidmasterBanner = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Box
      sx={{
        minHeight: { xs: '400px', md: '500px', lg: '580px' },
        background: 'linear-gradient(135deg, #fefefe 0%, #f8f9fa 50%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 6, lg: 8 }
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: { xs: 50, md: 70, lg: 85 },
          height: { xs: 50, md: 70, lg: 85 },
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${primaryColor}1A, ${primaryColor}0D)`,
          animation: `${float} 6s ease-in-out infinite`,
          animationDelay: '0s'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: { xs: 35, md: 50, lg: 65 },
          height: { xs: 35, md: 50, lg: 65 },
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${primaryColor}14, ${primaryColor}08)`,
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '2s'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} alignItems="center" sx={{ minHeight: '100%' }}>
          {/* Left Content */}
          <Grid item xs={12} md={7} lg={6}>
            <Fade in={mounted} timeout={1000}>
              <Box
                sx={{
                  animation: `${slideInLeft} 1s ease-out`,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                {/* Main Title */}
                <Box sx={{ mb: { xs: 3, md: 4, lg: 5 } }}>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem', xl: '7rem' },
                      fontWeight: 700,
                      color: primaryColor,
                      lineHeight: 0.9,
                      textShadow: 'none',
                      mb: 1,
                      fontStyle: 'italic'
                    }}
                  >
                    Bidmaster
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem', xl: '4rem' },
                      fontWeight: 400,
                      color: primaryColor,
                      fontStyle: 'italic',
                      textShadow: 'none'
                    }}
                  >
                    Auctionage
                  </Typography>
                </Box>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                    lineHeight: 1.8,
                    color: '#000000',
                    fontWeight: 400,
                    maxWidth: { xs: '100%', md: '500px', lg: '600px' },
                    mb: { xs: 4, md: 5, lg: 6 },
                    textAlign: 'justify',
                    animation: `${slideInLeft} 1.2s ease-out`,
                    '&::first-letter': {
                      fontSize: '1.5em',
                      fontWeight: 'bold',
                      color: primaryColor
                    }
                  }}
                >
                  Khám phá những món đồ sưu tầm hiếm có tại phiên đấu giá của chúng tôi — nơi bạn có thể tìm thấy những
                  vật phẩm độc đáo và đầy giá trị. Hãy tham gia để đấu giá các món hàng đặc biệt và làm phong phú thêm
                  bộ sưu tập yêu thích của bạn.
                </Typography>

                {/* Contact Information */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 3, sm: 4, md: 6 },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    animation: `${slideInLeft} 1.4s ease-out`
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        '& .contact-icon': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 4px 15px ${primaryColor}4D`
                        }
                      }
                    }}
                  >
                    <Box
                      className="contact-icon"
                      sx={{
                        width: { xs: 40, md: 45, lg: 50 },
                        height: { xs: 40, md: 45, lg: 50 },
                        borderRadius: '50%',
                        bgcolor: primaryColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 2px 10px ${primaryColor}33`
                      }}
                    >
                      <Language sx={{ color: 'white', fontSize: { xs: 20, md: 22, lg: 24 } }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' },
                        fontWeight: 500,
                        color: '#000000'
                      }}
                    >
                      www.bidmaster.com
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        '& .contact-icon': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 4px 15px ${primaryColor}4D`
                        }
                      }
                    }}
                  >
                    <Box
                      className="contact-icon"
                      sx={{
                        width: { xs: 40, md: 45, lg: 50 },
                        height: { xs: 40, md: 45, lg: 50 },
                        borderRadius: '50%',
                        bgcolor: primaryColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 2px 10px ${primaryColor}33`
                      }}
                    >
                      <Phone sx={{ color: 'white', fontSize: { xs: 20, md: 22, lg: 24 } }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' },
                        fontWeight: 500,
                        color: '#000000'
                      }}
                    >
                      024. 3636 7979
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right Image Section */}
          <Grid item xs={12} md={5} lg={6}>
            <Slide direction="left" in={mounted} timeout={1200}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  animation: `${slideInRight} 1s ease-out`
                }}
              >
                {/* Decorative dots pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: -20, md: -30, lg: -40 },
                    right: { xs: -20, md: -30, lg: -40 },
                    width: { xs: 60, md: 80, lg: 100 },
                    height: { xs: 60, md: 80, lg: 100 },
                    backgroundImage: `radial-gradient(circle, ${primaryColor} 2px, transparent 2px)`,
                    backgroundSize: '15px 15px',
                    opacity: 0.4,
                    animation: `${dotPattern} 4s ease-in-out infinite`,
                    animationDelay: '0s'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: -15, md: -25, lg: -35 },
                    left: { xs: -15, md: -25, lg: -35 },
                    width: { xs: 45, md: 65, lg: 80 },
                    height: { xs: 45, md: 65, lg: 80 },
                    backgroundImage: `radial-gradient(circle, ${primaryColor} 1.5px, transparent 1.5px)`,
                    backgroundSize: '12px 12px',
                    opacity: 0.3,
                    animation: `${dotPattern} 5s ease-in-out infinite`,
                    animationDelay: '1s'
                  }}
                />

                {/* Main circular image */}
                <Box
                  sx={{
                    width: { xs: 240, sm: 300, md: 340, lg: 380, xl: 420 },
                    height: { xs: 240, sm: 300, md: 340, lg: 380, xl: 420 },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.5s ease',
                    animation: `${float} 6s ease-in-out infinite`,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2)',
                      '& img': {
                        transform: 'scale(1.1)'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(45deg, ${primaryColor}1A, transparent, ${primaryColor}0D)`,
                      borderRadius: '50%',
                      zIndex: 1,
                      transition: 'opacity 0.3s ease'
                    },
                    '&:hover::before': {
                      opacity: 0
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={BannerImage}
                    alt="Antique collectibles and vintage items"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default BidmasterBanner