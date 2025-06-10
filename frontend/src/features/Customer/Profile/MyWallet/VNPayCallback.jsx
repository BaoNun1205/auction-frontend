import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Paper, Typography, CircularProgress, Button, Container, Fade, Zoom } from '@mui/material'
import { styled } from '@mui/material/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { primaryColor } from '~/utils/config'

const StyledPaper = styled(Paper)({
  padding: '48px 32px',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 20px 60px rgba(180, 23, 18, 0.1)',
  border: '1px solid rgba(180, 23, 18, 0.08)',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${primaryColor} 0%, #ff6b6b 100%)`
  }
})

const IconContainer = styled(Box)({
  position: 'relative',
  display: 'inline-flex',
  marginBottom: '24px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    opacity: 0.1,
    zIndex: 0
  }
})

const SuccessIconContainer = styled(IconContainer)({
  '&::before': {
    background: '#4caf50'
  }
})

const ErrorIconContainer = styled(IconContainer)({
  '&::before': {
    background: '#f44336'
  }
})

const AnimatedButton = styled(Button)({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '16px',
  padding: '12px 32px',
  transition: 'all 0.3s ease',
  backgroundColor: primaryColor,
  boxShadow: '0 8px 24px rgba(180, 23, 18, 0.3)',
  '&:hover': {
    backgroundColor: '#a01510',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 32px rgba(180, 23, 18, 0.4)'
  }
})

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  gap: '24px'
})

const AmountBox = styled(Box)({
  background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}08 100%)`,
  border: `2px solid ${primaryColor}20`,
  borderRadius: '16px',
  padding: '20px',
  margin: '24px 0',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '16px',
    background: `linear-gradient(135deg, ${primaryColor}10 0%, transparent 100%)`,
    pointerEvents: 'none'
  }
})

const VNPayCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const status = params.get('status')
    const amount = params.get('amount')

    // Simulate loading for better UX
    setTimeout(() => {
      if (status === 'success') {
        setStatus('success')
        setMessage('Giao dịch nạp tiền thành công!')
        setAmount(Number.parseFloat(amount))
      } else {
        setStatus('error')
        setMessage('Giao dịch thất bại. Vui lòng thử lại sau!')
      }
    }, 1500)
  }, [location])

  const handleBackToWallet = () => {
    navigate('/profile', { state: { tabSet: 6 } })
  }

  if (status === 'loading') {
    return (
      <Container maxWidth="sm">
        <LoadingContainer>
          <Fade in={true}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: primaryColor,
                  mb: 3
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: primaryColor,
                  fontWeight: 600,
                  mb: 1
                }}
              >
                Đang xử lý giao dịch...
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Vui lòng chờ trong giây lát
              </Typography>
            </Box>
          </Fade>
        </LoadingContainer>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Zoom in={true} timeout={600}>
          <StyledPaper elevation={0}>
            {status === 'success' ? (
              <SuccessIconContainer>
                <CheckCircleIcon
                  sx={{
                    fontSize: 80,
                    color: '#4caf50',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 4px 12px rgba(76, 175, 80, 0.3))'
                  }}
                />
              </SuccessIconContainer>
            ) : (
              <ErrorIconContainer>
                <ErrorIcon
                  sx={{
                    fontSize: 80,
                    color: '#f44336',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 4px 12px rgba(244, 67, 54, 0.3))'
                  }}
                />
              </ErrorIconContainer>
            )}

            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: status === 'success' ? '#2e7d32' : '#d32f2f',
                mb: 2
              }}
            >
              {status === 'success' ? 'Thành công!' : 'Thất bại!'}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              {message}
            </Typography>

            {status === 'success' && amount > 0 && (
              <Fade in={true} timeout={800}>
                <AmountBox>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <AccountBalanceWalletIcon
                      sx={{
                        color: primaryColor,
                        mr: 1,
                        fontSize: 28
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: primaryColor,
                        fontWeight: 600
                      }}
                    >
                      Số tiền đã nạp
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: primaryColor,
                      fontWeight: 700,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(amount)}
                  </Typography>
                </AmountBox>
              </Fade>
            )}

            <Box sx={{ mt: 4 }}>
              <AnimatedButton
                variant="contained"
                onClick={handleBackToWallet}
                startIcon={<AccountBalanceWalletIcon />}
                fullWidth
              >
                Quay lại ví của tôi
              </AnimatedButton>
            </Box>

            {status === 'error' && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                  sx={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#a01510',
                      backgroundColor: `${primaryColor}08`
                    }
                  }}
                >
                  Thử lại
                </Button>
              </Box>
            )}
          </StyledPaper>
        </Zoom>
      </Box>
    </Container>
  )
}

export default VNPayCallback
