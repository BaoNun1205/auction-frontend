import React from 'react'
import { Box, CircularProgress, Typography, Fade } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

// Styled components
const LoadingContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eeeeee 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  overflow: 'hidden'
})

const LogoContainer = styled(Box)({
  animation: `${float} 3s ease-in-out infinite`,
  marginBottom: '2rem'
})

const Logo = styled(Box)({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #b41712 0%, #d32f2f 50%, #b41712 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 20px 40px rgba(180, 23, 18, 0.3)',
  animation: `${pulse} 2s ease-in-out infinite`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #b41712, #d32f2f, #b41712)',
    zIndex: -1,
    opacity: 0.3,
    animation: `${pulse} 2s ease-in-out infinite reverse`
  }
})

const LogoText = styled(Typography)({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '2rem',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
})

const LoadingText = styled(Typography)({
  background: 'linear-gradient(90deg, #666 0%, #b41712 50%, #666 100%)',
  backgroundSize: '200px 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 2s infinite linear`,
  fontWeight: 600,
  marginTop: '1rem'
})

const StyledCircularProgress = styled(CircularProgress)({
  color: '#b41712',
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round'
  }
})

const DotsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: '1rem'
})

const Dot = styled(Box)(({ delay }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#b41712',
  animation: `${pulse} 1.4s ease-in-out infinite`,
  animationDelay: `${delay}s`
}))

const AppLoadingScreen = () => {
  return (
    <Fade in timeout={300}>
      <LoadingContainer>
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(180, 23, 18, 0.1) 0%, rgba(180, 23, 18, 0.05) 100%)',
            animation: `${float} 4s ease-in-out infinite`
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(180, 23, 18, 0.08) 0%, rgba(180, 23, 18, 0.03) 100%)',
            animation: `${float} 3.5s ease-in-out infinite reverse`
          }}
        />

        {/* Main loading content */}
        <LogoContainer>
          <Logo>
            <LogoText>A</LogoText>
          </Logo>
        </LogoContainer>

        <Typography
          variant="h4"
          sx={{
            color: '#333',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}
        >
          Bidmaster Auction
        </Typography>

        <LoadingText variant="body1">Đang khởi tạo trang...</LoadingText>

        <Box sx={{ position: 'relative', marginTop: '2rem' }}>
          <StyledCircularProgress size={50} thickness={3} />
        </Box>

        <DotsContainer>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </DotsContainer>

        <Typography
          variant="caption"
          sx={{
            color: '#999',
            marginTop: '3rem',
            textAlign: 'center',
            maxWidth: '300px'
          }}
        >
          Vui lòng đợi trong giây lát...
        </Typography>
      </LoadingContainer>
    </Fade>
  )
}

export default AppLoadingScreen
