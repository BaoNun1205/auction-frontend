import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  useMediaQuery,
  useTheme,
  styled,
  alpha
} from '@mui/material'
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  ExpandMore,
  Send,
  WhatsApp,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  CheckCircle
} from '@mui/icons-material'
import { FaFax } from 'react-icons/fa'
import { useAppStore } from '~/store/appStore'
import { useCreateConversation } from '~/hooks/chatBotHook'
import { useGetUserByUsername } from '~/hooks/userHook'
import AppModal from '~/components/Modal/Modal'
import Authentication from '~/features/Authentication'

// Custom styled components
const primaryColor = '#b41712'
const secondaryColor = '#8B0000'

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '16px',
  position: 'relative',
  paddingBottom: '12px',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '60px',
    height: '3px',
    backgroundColor: primaryColor
  }
}))

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  padding: theme.spacing(8, 0),
  position: 'relative',
  marginBottom: theme.spacing(6)
}))

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
  }
}))

const ContactIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2)
}))

const ContactIcon = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: alpha(primaryColor, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: primaryColor
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
    backgroundColor: alpha(primaryColor, 0.7),
    color: '#ffffff'
  }
}))

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(primaryColor, 0.1),
  color: primaryColor,
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: primaryColor,
    color: '#ffffff',
    transform: 'translateY(-3px)'
  }
}))

const MapContainer = styled(Paper)(({ theme }) => ({
  height: '400px',
  width: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}))

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'none'
  },
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  '&:last-child': {
    borderBottom: 'none'
  }
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0)
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
    color: primaryColor
  }
}))

const Contact = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const { auth, setChatOpen, setChatVendorId } = useAppStore()
  const [authModalRef, setAuthModalRef] = useState(null)
  const { mutate: createConversation } = useCreateConversation()
  const { data: adminUser } = useGetUserByUsername('admin')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: ''
  })

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [expanded, setExpanded] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10,15}$/

    if (!formData.name.trim()) {
      errors.name = 'Vui lòng nhập họ tên'
    }

    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email không hợp lệ'
    }

    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ'
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Vui lòng nhập tiêu đề'
    }

    if (!formData.message.trim()) {
      errors.message = 'Vui lòng nhập nội dung tin nhắn'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Nội dung tin nhắn quá ngắn'
    }

    if (!formData.department) {
      errors.department = 'Vui lòng chọn phòng ban'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setSnackbarMessage('Tin nhắn của bạn đã được gửi thành công!')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          department: ''
        })

        // Reset success state after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      }, 1500)
    } else {
      setSnackbarMessage('Vui lòng kiểm tra lại thông tin!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleChatWithBidmaster = () => {
    if (!auth.isAuth || !auth.user?.id) {
      authModalRef?.click()
      return
    }
    // Giả sử adminUser?.id là userId của admin
    createConversation(
      { buyerId: auth.user.id, sellerId: adminUser?.userId },
      {
        onSuccess: () => {
          setChatVendorId(adminUser?.userId)
          setChatOpen(true)
        }
      }
    )
  }

  const contactInfo = [
    {
      title: 'Địa Chỉ',
      content: 'Số 1, Võ Văn Ngân, phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh',
      icon: <LocationOn fontSize="large" />
    },
    {
      title: 'Email',
      content: 'webonlineauction@gmail.com',
      icon: <Email fontSize="large" />
    },
    {
      title: 'Điện Thoại',
      content: '024. 3636 7979',
      icon: <Phone fontSize="large" />
    },
    {
      title: 'Giờ Làm Việc',
      content: 'Thứ Hai - Thứ Sáu: 8:00 - 17:00\nThứ Bảy: 8:00 - 12:00',
      icon: <AccessTime fontSize="large" />
    }
  ]

  const departments = [
    {
      value: 'customer-service',
      label: 'Chăm sóc khách hàng'
    },
    {
      value: 'technical-support',
      label: 'Hỗ trợ kỹ thuật'
    },
    {
      value: 'sales',
      label: 'Kinh doanh'
    },
    {
      value: 'marketing',
      label: 'Marketing'
    },
    {
      value: 'other',
      label: 'Khác'
    }
  ]

  const faqs = [
    {
      question: 'Làm thế nào để đăng ký tài khoản trên BidMaster?',
      answer:
        'Để đăng ký tài khoản trên BidMaster, bạn chỉ cần nhấp vào nút \'Đăng ký\' ở góc phải trên cùng của trang web, sau đó điền thông tin cá nhân và xác nhận email. Sau khi hoàn tất các bước này, bạn có thể bắt đầu tham gia đấu giá ngay lập tức.'
    },
    {
      question: 'Làm thế nào để tham gia một phiên đấu giá?',
      answer:
        'Để tham gia đấu giá, trước tiên bạn cần đăng nhập vào tài khoản BidMaster của mình. Sau đó, tìm kiếm sản phẩm bạn quan tâm và nhấp vào để xem chi tiết. Nếu phiên đấu giá đang diễn ra, bạn có thể đặt giá bằng cách nhập số tiền và nhấn nút \'Đặt giá\'. Hệ thống sẽ thông báo cho bạn nếu bạn là người đặt giá cao nhất hoặc nếu có người khác đặt giá cao hơn.'
    },
    {
      question: 'Làm thế nào để thanh toán sau khi thắng đấu giá?',
      answer:
        'Sau khi thắng đấu giá, bạn sẽ nhận được email thông báo với hướng dẫn thanh toán chi tiết. BidMaster hỗ trợ nhiều phương thức thanh toán khác nhau như thẻ tín dụng, chuyển khoản ngân hàng, và các ví điện tử phổ biến. Bạn cần hoàn tất thanh toán trong vòng 48 giờ sau khi phiên đấu giá kết thúc để đảm bảo giao dịch thành công.'
    },
    {
      question: 'Chính sách hoàn trả của BidMaster như thế nào?',
      answer:
        'BidMaster có chính sách hoàn trả trong vòng 7 ngày nếu sản phẩm không đúng với mô tả hoặc có lỗi từ nhà sản xuất. Tuy nhiên, đối với các sản phẩm đấu giá đặc biệt như đồ cổ, tác phẩm nghệ thuật, chúng tôi có những quy định riêng. Vui lòng liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ chi tiết về trường hợp cụ thể của bạn.'
    },
    {
      question: 'Làm thế nào để tôi có thể đăng sản phẩm lên đấu giá?',
      answer:
        'Để đăng sản phẩm lên đấu giá, bạn cần đăng ký tài khoản người bán trên BidMaster. Sau khi tài khoản được xác minh, bạn có thể đăng sản phẩm bằng cách nhấp vào \'Đăng sản phẩm\' trong trang quản lý tài khoản. Điền đầy đủ thông tin về sản phẩm, tải lên hình ảnh chất lượng cao, và thiết lập các thông số cho phiên đấu giá như giá khởi điểm, thời gian bắt đầu và kết thúc.'
    },
    {
      question: 'BidMaster có tính phí gì khi tôi tham gia đấu giá không?',
      answer:
        'BidMaster không tính phí đăng ký tài khoản hoặc tham gia đấu giá. Tuy nhiên, nếu bạn thắng đấu giá, sẽ có một khoản phí dịch vụ nhỏ được tính dựa trên giá trị cuối cùng của sản phẩm. Đối với người bán, chúng tôi thu một khoản hoa hồng khi sản phẩm được bán thành công. Chi tiết về các khoản phí có thể được tìm thấy trong phần \'Điều khoản dịch vụ\' trên trang web của chúng tôi.'
    }
  ]

  return (
    <>
      <Box component="main">
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Liên Hệ Với Chúng Tôi
                </Typography>
                <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 4 }}>
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi
                hoặc yêu cầu nào.
                </Typography>
                <Box display="flex" gap={2}>
                  <SocialButton aria-label="Facebook">
                    <Facebook />
                  </SocialButton>
                  <SocialButton aria-label="Twitter">
                    <Twitter />
                  </SocialButton>
                  <SocialButton aria-label="Instagram">
                    <Instagram />
                  </SocialButton>
                  <SocialButton aria-label="LinkedIn">
                    <LinkedIn />
                  </SocialButton>
                  <SocialButton aria-label="WhatsApp">
                    <WhatsApp />
                  </SocialButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box
                  component="img"
                  src="https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Contact Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    display: 'block',
                    mx: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </HeroSection>

        <Container maxWidth="lg">
          {/* Contact Info Cards */}
          <Box sx={{ mb: 8 }}>
            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ContactCard>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <ContactIconWrapper>
                        <ContactIcon>{info.icon}</ContactIcon>
                      </ContactIconWrapper>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                      >
                        {info.content}
                      </Typography>
                    </CardContent>
                  </ContactCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Contact Form and Map */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: '12px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {submitSuccess && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      p: 3
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                    <Typography variant="h5" component="h3" gutterBottom textAlign="center" fontWeight="bold">
                    Cảm ơn bạn đã liên hệ!
                    </Typography>
                    <Typography variant="body1" textAlign="center" paragraph>
                    Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.
                    </Typography>
                    <StyledButton
                      variant="contained"
                      onClick={() => setSubmitSuccess(false)}
                      startIcon={<Send />}
                      sx={{ mt: 2 }}
                    >
                    Gửi tin nhắn khác
                    </StyledButton>
                  </Box>
                )}

                <SectionTitle variant="h5" component="h2">
                Gửi Tin Nhắn
                </SectionTitle>
                <Typography variant="body2" color="text.secondary" paragraph>
                Hãy điền thông tin vào mẫu dưới đây, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Họ tên"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        required
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        required
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Phòng ban"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        error={!!formErrors.department}
                        helperText={formErrors.department}
                        required
                        margin="normal"
                      >
                        {departments.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Tiêu đề"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!formErrors.subject}
                        helperText={formErrors.subject}
                        required
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nội dung tin nhắn"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!formErrors.message}
                        helperText={formErrors.message}
                        required
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                        sx={{ mt: 2 }}
                      >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                      </StyledButton>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            {/* Map */}
            <Grid item xs={12} md={6}>
              <MapContainer>
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4842318813194!2d106.7697336!3d10.8505323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUcC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1652345729852!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BidMaster Location"
                />
              </MapContainer>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                Thông Tin Liên Hệ Khác
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <FaFax style={{ color: primaryColor, marginRight: '8px' }} />
                      <Typography variant="body2">Fax: 024. 3636 7980</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <WhatsApp sx={{ color: primaryColor, mr: 1 }} />
                      <Typography variant="body2">WhatsApp: +84 987 654 321</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" gutterBottom fontWeight="medium">
                    Phòng Kinh Doanh:
                    </Typography>
                    <Typography variant="body2" paragraph>
                    sales@bidmaster.vn
                      <br />
                    024. 3636 7981
                    </Typography>
                    <Typography variant="body2" gutterBottom fontWeight="medium">
                    Hỗ Trợ Kỹ Thuật:
                    </Typography>
                    <Typography variant="body2">
                    support@bidmaster.vn
                      <br />
                    024. 3636 7982
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* FAQ Section */}
          <Box sx={{ mb: 8 }}>
            <SectionTitle variant="h4" component="h2" sx={{ mb: 4 }}>
            Câu Hỏi Thường Gặp
            </SectionTitle>

            <Paper elevation={2} sx={{ p: 3, borderRadius: '12px' }}>
              {faqs.map((faq, index) => (
                <StyledAccordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  disableGutters
                >
                  <StyledAccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {faq.question}
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              ))}
            </Paper>
          </Box>

          {/* Call to Action */}
          <Box sx={{ mb: 8 }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${alpha(primaryColor, 0.05)} 0%, ${alpha(
                  secondaryColor,
                  0.1
                )} 100%)`,
                border: `1px solid ${alpha(primaryColor, 0.1)}`,
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Bạn Cần Hỗ Trợ Ngay?
              </Typography>
              <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua hotline
              hoặc chat trực tuyến để được giải đáp nhanh chóng.
              </Typography>
              <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                <StyledButton variant="contained" startIcon={<Phone />}>
                Gọi Ngay: 024. 3636 7979
                </StyledButton>
                <Button
                  variant="outlined"
                  startIcon={<WhatsApp />}
                  onClick={handleChatWithBidmaster}
                  sx={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    '&:hover': {
                      borderColor: secondaryColor,
                      backgroundColor: 'rgba(180, 23, 18, 0.05)'
                    }
                  }}
                >
                Chat Trực Tuyến
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      {/* Authentication Modal */}
      <AppModal
        trigger={
          <div ref={(ref) => setAuthModalRef(ref)} style={{ display: 'none' }}>
          Hidden Trigger
          </div>
        }
        maxWidth="500px"
      >
        <Box sx={{ pt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#b41712', mb: 3 }}>
          Đăng nhập để tiếp tục
          </Typography>
          <Authentication />
        </Box>
      </AppModal>
    </>
  )
}

export default Contact
