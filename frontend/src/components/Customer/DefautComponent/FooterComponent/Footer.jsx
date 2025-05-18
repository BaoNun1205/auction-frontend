import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  styled,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
  Tooltip
} from '@mui/material'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from 'react-icons/fa'

const primaryColor = '#b41712'
const secondaryColor = '#8B0000'

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#000000',
  padding: '48px 0 24px',
  width: '100%',
  zIndex: 1000,
  position: 'relative',
  borderTop: '1px solid #e0e0e0',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
  }
}))

const CallToAction = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  padding: '32px',
  marginBottom: '32px',
  textAlign: 'center',
  borderRadius: '12px',
  boxShadow: '0 3px 15px 2px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 8px 25px 4px rgba(0, 0, 0, 0.09)',
    transform: 'translateY(-5px)'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
  }
}))

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#000000',
  margin: '0 8px',
  padding: '10px',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  '&:hover': {
    color: '#ffffff',
    transform: 'translateY(-3px)',
    backgroundColor: primaryColor
  },
  '&:focus': {
    outline: `2px solid ${primaryColor}`,
    outlineOffset: '2px'
  }
}))

const FooterLink = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  color: '#000000',
  padding: '6px 0',
  '&:hover': {
    color: primaryColor,
    transform: 'translateX(5px)'
  }
}))

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: primaryColor,
  color: '#ffffff',
  padding: '12px 32px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: secondaryColor,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  },
  '&:disabled': {
    backgroundColor: 'rgba(180, 23, 18, 0.5)',
    color: '#ffffff'
  }
}))

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '16px',
  '& svg': {
    color: primaryColor,
    marginRight: '12px',
    marginTop: '4px',
    flexShrink: 0
  }
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '20px',
  position: 'relative',
  paddingBottom: '10px',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40px',
    height: '3px',
    backgroundColor: primaryColor
  }
}))

const Footer = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    console.log('Đã đăng ký:', email)
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <FooterWrapper component="footer" role="contentinfo">
      <Container maxWidth="xl">
        <Grid container spacing={4} style={{ marginBottom: '48px' }}>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={3} display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-start'}>
              <Box mb={2} width="180px" height="60px" position="relative">
                <Typography variant="h5" fontWeight="bold" color={primaryColor}>
                  BidMaster
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Đấu giá trực tuyến hàng đầu
                </Typography>
              </Box>
              <Typography variant="body2" paragraph textAlign={isMobile ? 'center' : 'left'}>
                BidMaster là nền tảng đấu giá trực tuyến hàng đầu, cung cấp trải nghiệm mua sắm độc đáo và cơ hội sở hữu
                những sản phẩm giá trị với mức giá hợp lý.
              </Typography>
            </Box>

            <Box display="flex" justifyContent={isMobile ? 'center' : 'flex-start'} mb={3}>
              <Tooltip title="Facebook">
                <SocialIcon aria-label="Facebook" component="a" href="#">
                  <FaFacebook size={20} />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="Twitter">
                <SocialIcon aria-label="Twitter" component="a" href="#">
                  <FaTwitter size={20} />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="Instagram">
                <SocialIcon aria-label="Instagram" component="a" href="#">
                  <FaInstagram size={20} />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <SocialIcon aria-label="LinkedIn" component="a" href="#">
                  <FaLinkedin size={20} />
                </SocialIcon>
              </Tooltip>
              <Tooltip title="YouTube">
                <SocialIcon aria-label="YouTube" component="a" href="#">
                  <FaYoutube size={20} />
                </SocialIcon>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <SectionTitle variant="h6">Thông Tin Liên Hệ</SectionTitle>

              <ContactItem>
                <FaMapMarkerAlt size={18} />
                <Typography variant="body2">
                  Số 1, Võ Văn Ngân, phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh
                </Typography>
              </ContactItem>

              <ContactItem>
                <FaPhoneAlt size={18} />
                <Typography variant="body2">024. 3636 7979</Typography>
              </ContactItem>

              <ContactItem>
                <FaEnvelope size={18} />
                <Typography variant="body2">webonlineauction@gmail.com</Typography>
              </ContactItem>

              <ContactItem>
                <FaClock size={18} />
                <Typography variant="body2">
                  Thứ Hai - Thứ Sáu: 8:00 - 17:00
                  <br />
                  Thứ Bảy: 8:00 - 12:00
                </Typography>
              </ContactItem>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <SectionTitle variant="h6">Liên Kết Nhanh</SectionTitle>

              <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-start'}>
                <FooterLink variant="body2" component="a" href="#">
                  Trang Chủ
                </FooterLink>
                <FooterLink variant="body2" component="a" href="#">
                  Sản Phẩm Đấu Giá
                </FooterLink>
                <FooterLink variant="body2" component="a" href="#">
                  Đấu Giá Sắp Diễn Ra
                </FooterLink>
                <FooterLink variant="body2" component="a" href="#">
                  Hướng Dẫn Đấu Giá
                </FooterLink>
                <FooterLink variant="body2" component="a" href="#">
                  Tin Tức & Sự Kiện
                </FooterLink>
                <FooterLink variant="body2" component="a" href="#">
                  Giới Thiệu
                </FooterLink>
                <FooterLink variant="body2" component="a" href="#">
                  Liên Hệ
                </FooterLink>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <CallToAction elevation={0}>
              <SectionTitle variant="h6" style={{ display: 'inline-block', textAlign: 'center' }}>
                Đăng Ký Nhận Tin
              </SectionTitle>

              <Typography variant="body2" paragraph style={{ maxWidth: '600px', margin: '0 auto 20px' }}>
                Nhận thông tin mới nhất về sản phẩm, ưu đãi đặc biệt và sự kiện đấu giá sắp tới!
              </Typography>

              {subscribed ? (
                <Box p={2} bgcolor="rgba(0, 128, 0, 0.1)" borderRadius={2} border="1px solid rgba(0, 128, 0, 0.3)">
                  <Typography variant="body2" color="green">
                    Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.
                  </Typography>
                </Box>
              ) : (
                <Box component="form" noValidate style={{ maxWidth: '500px', margin: '16px auto 0' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError(false)
                    }}
                    error={emailError}
                    helperText={emailError ? 'Vui lòng nhập email hợp lệ' : ''}
                    style={{ marginBottom: '16px', backgroundColor: '#ffffff' }}
                    InputProps={{
                      style: { color: '#000000', borderRadius: '8px' },
                      sx: {
                        '& fieldset': { borderColor: '#e0e0e0' },
                        '&:hover fieldset': { borderColor: primaryColor },
                        '&.Mui-focused fieldset': { borderColor: primaryColor }
                      }
                    }}
                    InputLabelProps={{ style: { color: '#6b7280' } }}
                  />
                  <StyledButton
                    fullWidth
                    variant="contained"
                    onClick={handleSubscribe}
                    aria-label="Đăng ký nhận bản tin"
                  >
                    Đăng Ký Ngay
                  </StyledButton>
                </Box>
              )}
            </CallToAction>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3, opacity: 0.7 }} />

        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary" textAlign={isMobile ? 'center' : 'left'}>
              © {currentYear} BidMaster. Bản quyền thuộc về chúng tôi.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" flexWrap="wrap" justifyContent={isMobile ? 'center' : 'flex-end'} gap={2}>
              <FooterLink
                variant="body2"
                component="a"
                href="#"
                sx={{ padding: '0', '&:hover': { transform: 'translateX(0)' } }}
              >
                Điều Khoản Dịch Vụ
              </FooterLink>
              <FooterLink
                variant="body2"
                component="a"
                href="#"
                sx={{ padding: '0', '&:hover': { transform: 'translateX(0)' } }}
              >
                Chính Sách Bảo Mật
              </FooterLink>
              <FooterLink
                variant="body2"
                component="a"
                href="#"
                sx={{ padding: '0', '&:hover': { transform: 'translateX(0)' } }}
              >
                Chính Sách Hoàn Tiền
              </FooterLink>
              <FooterLink
                variant="body2"
                component="a"
                href="#"
                sx={{ padding: '0', '&:hover': { transform: 'translateX(0)' } }}
              >
                Hỗ Trợ
              </FooterLink>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            BidMaster - Nền tảng đấu giá trực tuyến hàng đầu Việt Nam
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  )
}

export default Footer