import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '70vh',
  textAlign: 'center',
  padding: '2rem'
})

const ErrorNumber = styled(Typography)({
  fontSize: '8rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #b41712 0%, #d32f2f 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
  marginBottom: '1rem',
  '@media (max-width: 600px)': {
    fontSize: '6rem'
  }
})

const IllustrationBox = styled(Box)({
  width: '300px',
  height: '200px',
  margin: '2rem auto',
  background: 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    background: 'rgba(180, 23, 18, 0.1)',
    borderRadius: '50%'
  }
})

const ActionButton = styled(Button)({
  borderRadius: '12px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 600,
  margin: '0 8px',
  '&.primary': {
    backgroundColor: '#b41712',
    color: 'white',
    '&:hover': {
      backgroundColor: '#a01510'
    }
  },
  '&.secondary': {
    borderColor: '#b41712',
    color: '#b41712',
    '&:hover': {
      borderColor: '#a01510',
      backgroundColor: 'rgba(180, 23, 18, 0.05)'
    }
  }
})

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSearch = () => {
    navigate('/search')
  }

  return (
    <StyledContainer maxWidth="md">
      <ErrorNumber variant="h1">404</ErrorNumber>

      <Typography
        variant="h4"
        sx={{
          color: '#333',
          fontWeight: 'bold',
          marginBottom: '1rem',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Trang không tìm thấy
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#666',
          marginBottom: '2rem',
          maxWidth: '500px',
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}
      >
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng kiểm tra lại đường dẫn hoặc quay
        về trang chủ.
      </Typography>

      <IllustrationBox>
        <SearchIcon sx={{ fontSize: '4rem', color: '#b41712', opacity: 0.3 }} />
      </IllustrationBox>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          marginTop: '2rem'
        }}
      >
        <ActionButton className="primary" variant="contained" startIcon={<HomeIcon />} onClick={handleGoHome}>
          Về trang chủ
        </ActionButton>

        <ActionButton className="secondary" variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Quay lại
        </ActionButton>

        <ActionButton className="secondary" variant="outlined" startIcon={<SearchIcon />} onClick={handleSearch}>
          Tìm kiếm
        </ActionButton>
      </Box>
    </StyledContainer>
  )
}

export default NotFound
