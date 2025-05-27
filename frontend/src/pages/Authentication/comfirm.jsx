import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useConfirmAccount } from '~/hooks/authHook'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
  Fade,
  Grow
} from '@mui/material'
import { CheckCircle, Cancel, Email, ArrowForward, Support } from '@mui/icons-material'

const ConfirmAccount = () => {
  const [message, setMessage] = useState('')
  const [token, setToken] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { mutate: confirmAccount, isLoading: isConfirming } = useConfirmAccount()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    console.log(token)
    setToken(token)
  }, [location])

  const handleConfirm = async () => {
    if (token) {
      confirmAccount(token, {
        onSuccess: (data) => {
          console.log(data.code)
          if (data.code === 200) {
            setMessage('Xác nhận tài khoản thành công!')
            setIsSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
          } else {
            setMessage('Xác nhận tài khoản thất bại. Vui lòng thử lại.')
            setIsSuccess(false)
          }
        },
        onError: (error) => {
          setMessage('Đã xảy ra lỗi. Vui lòng thử lại.')
          setIsSuccess(false)
        }
      })
    } else {
      setMessage('Mã xác nhận không hợp lệ.')
      setIsSuccess(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce4ec 0%, #ffffff 50%, #ffebee 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Grow in={true} timeout={800}>
          <Card
            elevation={24}
            sx={{
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'visible'
            }}
          >
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', pt: 4, pb: 2, px: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  background: 'linear-gradient(135deg, #b41712, #d32f2f)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(180, 23, 18, 0.3)'
                }}
              >
                <Email sx={{ fontSize: 40, color: 'white' }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #b41712, #d32f2f)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Xác Nhận Tài Khoản
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ px: 2 }}>
                Nhấn nút bên dưới để xác minh địa chỉ email và kích hoạt tài khoản của bạn
              </Typography>
            </Box>

            <CardContent sx={{ px: 4, pb: 4 }}>
              {/* Alert Message */}
              {message && (
                <Fade in={true}>
                  <Alert
                    severity={isSuccess ? 'success' : 'error'}
                    icon={isSuccess ? <CheckCircle /> : <Cancel />}
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 500
                      }
                    }}
                  >
                    {message}
                  </Alert>
                </Fade>
              )}

              {/* Initial State */}
              {!message && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: '#ffebee',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Email sx={{ fontSize: 30, color: '#b41712' }} />
                  </Paper>
                  <Typography variant="body2" color="text.secondary">
                    Sẵn sàng xác nhận tài khoản của bạn? Việc này chỉ mất vài giây.
                  </Typography>
                </Box>
              )}

              {/* Success State */}
              {isSuccess ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 3,
                      backgroundColor: '#e8f5e8',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 40, color: '#4caf50' }} />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Đang chuyển hướng đến trang đăng nhập trong vài giây...
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/authentication')}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #b41712, #d32f2f)',
                      borderRadius: 2,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 20px rgba(180, 23, 18, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #8f0e0a, #b71c1c)',
                        boxShadow: '0 6px 25px rgba(180, 23, 18, 0.5)'
                      }
                    }}
                  >
                    Đi đến Trang Đăng Nhập
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleConfirm}
                  disabled={isConfirming || !token}
                  startIcon={isConfirming ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
                  sx={{
                    background: 'linear-gradient(135deg, #b41712, #d32f2f)',
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(180, 23, 18, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #8f0e0a, #b71c1c)',
                      boxShadow: '0 6px 25px rgba(180, 23, 18, 0.5)'
                    },
                    '&:disabled': {
                      background: '#e0e0e0',
                      color: '#9e9e9e',
                      boxShadow: 'none'
                    }
                  }}
                >
                  {isConfirming ? 'Đang xác nhận...' : 'Xác Nhận Tài Khoản'}
                </Button>
              )}

              {/* No Token State */}
              {!token && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    Không tìm thấy mã xác nhận trong URL.
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/authentication')}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      textTransform: 'none',
                      borderColor: '#b41712',
                      color: '#b41712',
                      '&:hover': {
                        borderColor: '#8f0e0a',
                        backgroundColor: 'rgba(180, 23, 18, 0.04)'
                      }
                    }}
                  >
                    Quay lại Đăng Nhập
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grow>

        {/* Support Link */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Gặp sự cố?{' '}
            <Button
              variant="text"
              size="small"
              startIcon={<Support />}
              onClick={() => navigate('/support')}
              sx={{
                textTransform: 'none',
                color: '#b41712',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(180, 23, 18, 0.04)'
                }
              }}
            >
              Liên Hệ Hỗ Trợ
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default ConfirmAccount