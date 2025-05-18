import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  styled
} from '@mui/material'
import { Gavel, Security, Speed, Support, CheckCircle, ArrowForward, Star } from '@mui/icons-material'
import { FaAward, FaHandshake, FaUsers } from 'react-icons/fa'

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
  background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  padding: theme.spacing(12, 0),
  position: 'relative',
  textAlign: 'center',
  marginBottom: theme.spacing(6)
}))

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  borderRadius: '12px',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
  }
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  backgroundColor: primaryColor,
  marginBottom: theme.spacing(2)
}))

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  borderRadius: '12px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
  }
}))

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4)
}))

const TimelinePoint = styled(Box)(({ theme }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: primaryColor,
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(0.5),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '20px',
    bottom: '-24px',
    width: '2px',
    backgroundColor: '#e0e0e0',
    transform: 'translateX(-50%)'
  },
  '&:last-child::after': {
    display: 'none'
  }
}))

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: '12px',
  position: 'relative',
  '&::before': {
    content: '"\\201C"',
    position: 'absolute',
    top: '10px',
    left: '15px',
    fontSize: '60px',
    color: 'rgba(180, 23, 18, 0.1)',
    fontFamily: 'Georgia, serif'
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
  }
}))

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
  }
}))

const Introduction = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const features = [
    {
      title: 'Đấu Giá An Toàn',
      description:
        'Hệ thống đấu giá minh bạch với cơ chế bảo mật cao, đảm bảo mọi giao dịch đều được thực hiện an toàn.',
      icon: <Security fontSize="large" />
    },
    {
      title: 'Giao Dịch Nhanh Chóng',
      description: 'Quy trình đấu giá và thanh toán được tối ưu hóa, giúp người dùng tiết kiệm thời gian và công sức.',
      icon: <Speed fontSize="large" />
    },
    {
      title: 'Sản Phẩm Đa Dạng',
      description: 'Hàng nghìn sản phẩm từ nhiều danh mục khác nhau, đáp ứng mọi nhu cầu của người dùng.',
      icon: <Gavel fontSize="large" />
    },
    {
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng giải đáp mọi thắc mắc của bạn mọi lúc, mọi nơi.',
      icon: <Support fontSize="large" />
    }
  ]

  const teamMembers = [
    {
      name: 'Nguyễn Văn A',
      position: 'Giám Đốc Điều Hành',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      description: 'Với hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ và thương mại điện tử.'
    },
    {
      name: 'Trần Thị B',
      position: 'Giám Đốc Sản Phẩm',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      description: 'Chuyên gia về UX/UI với nhiều năm kinh nghiệm phát triển sản phẩm số.'
    },
    {
      name: 'Lê Văn C',
      position: 'Giám Đốc Công Nghệ',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
      description: 'Kỹ sư phần mềm với chuyên môn về hệ thống bảo mật và blockchain.'
    },
    {
      name: 'Phạm Thị D',
      position: 'Giám Đốc Marketing',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
      description: 'Chuyên gia marketing với hơn 10 năm kinh nghiệm trong lĩnh vực thương mại điện tử.'
    }
  ]

  const timeline = [
    {
      year: '2018',
      title: 'Thành Lập BidMaster',
      description: 'BidMaster được thành lập với sứ mệnh tạo ra nền tảng đấu giá trực tuyến hàng đầu Việt Nam.'
    },
    {
      year: '2019',
      title: 'Mở Rộng Thị Trường',
      description: 'Mở rộng hoạt động kinh doanh ra các tỉnh thành lớn trên cả nước với hơn 10.000 người dùng.'
    },
    {
      year: '2020',
      title: 'Ra Mắt Ứng Dụng Di Động',
      description: 'Phát triển và ra mắt ứng dụng di động BidMaster trên cả hai nền tảng iOS và Android.'
    },
    {
      year: '2021',
      title: 'Hợp Tác Chiến Lược',
      description: 'Ký kết hợp tác với các đối tác lớn trong và ngoài nước, mở rộng danh mục sản phẩm.'
    },
    {
      year: '2022',
      title: 'Đạt 100.000 Người Dùng',
      description: 'Cột mốc quan trọng với 100.000 người dùng đăng ký và hơn 50.000 giao dịch thành công.'
    },
    {
      year: '2023',
      title: 'Nâng Cấp Hệ Thống',
      description: 'Đầu tư nâng cấp hệ thống với công nghệ blockchain, đảm bảo tính minh bạch và an toàn.'
    }
  ]

  const testimonials = [
    {
      name: 'Nguyễn Văn X',
      position: 'Khách hàng thường xuyên',
      content:
        'Tôi đã sử dụng BidMaster được hơn 2 năm và rất hài lòng với trải nghiệm đấu giá tại đây. Giao diện dễ sử dụng, hệ thống ổn định và đặc biệt là tính minh bạch trong mọi phiên đấu giá.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    {
      name: 'Trần Thị Y',
      position: 'Chủ cửa hàng',
      content:
        'BidMaster đã giúp tôi tiếp cận được nhiều khách hàng tiềm năng hơn. Việc đưa sản phẩm lên đấu giá rất đơn giản và tôi luôn nhận được sự hỗ trợ tận tình từ đội ngũ nhân viên.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
    },
    {
      name: 'Lê Văn Z',
      position: 'Nhà sưu tầm',
      content:
        'Là một nhà sưu tầm, tôi thường xuyên tìm kiếm những món đồ độc đáo. BidMaster là nơi tôi tin tưởng để tham gia đấu giá vì tính xác thực của sản phẩm và quy trình đấu giá công bằng.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
  ]

  const stats = [
    {
      value: '100,000+',
      label: 'Người Dùng',
      icon: <FaUsers size={30} color={primaryColor} />
    },
    {
      value: '50,000+',
      label: 'Giao Dịch Thành Công',
      icon: <FaHandshake size={30} color={primaryColor} />
    },
    {
      value: '10,000+',
      label: 'Sản Phẩm Đấu Giá',
      icon: <Gavel style={{ fontSize: 30, color: primaryColor }} />
    },
    {
      value: '98%',
      label: 'Khách Hàng Hài Lòng',
      icon: <FaAward size={30} color={primaryColor} />
    }
  ]

  return (
    <Box component="main">
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Fade in={animate} timeout={1000}>
            <Box>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Về BidMaster
              </Typography>
              <Typography variant="h5" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
                Nền tảng đấu giá trực tuyến hàng đầu Việt Nam
              </Typography>
              <StyledButton variant="contained" size="large" endIcon={<ArrowForward />}>
                Khám Phá Ngay
              </StyledButton>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Mission & Vision Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={animate} timeout={1200}>
              <Box>
                <SectionTitle variant="h4" component="h2">
                  Sứ Mệnh & Tầm Nhìn
                </SectionTitle>
                <Typography variant="h6" color="primary" gutterBottom>
                  Kết nối người mua và người bán thông qua hệ thống đấu giá minh bạch
                </Typography>
                <Typography variant="body1" paragraph>
                  BidMaster ra đời với sứ mệnh tạo ra một nền tảng đấu giá trực tuyến minh bạch, an toàn và tiện lợi cho
                  người dùng Việt Nam. Chúng tôi tin rằng mỗi giao dịch đều phải được thực hiện một cách công bằng và
                  đáng tin cậy.
                </Typography>
                <Typography variant="body1" paragraph>
                  Với tầm nhìn trở thành nền tảng đấu giá trực tuyến hàng đầu Đông Nam Á, BidMaster không ngừng đổi mới
                  và nâng cao chất lượng dịch vụ, mang đến trải nghiệm đấu giá tốt nhất cho người dùng.
                </Typography>
                <List>
                  {[
                    'Minh bạch trong mọi giao dịch',
                    'Bảo vệ quyền lợi người dùng',
                    'Đa dạng sản phẩm chất lượng',
                    'Trải nghiệm đấu giá hấp dẫn'
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle style={{ color: primaryColor }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in={animate} timeout={1500}>
              <Box
                component="img"
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="BidMaster Mission"
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Zoom>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', py: 6, mb: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionTitle
              variant="h4"
              component="h2"
              sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}
            >
              BidMaster Trong Số Liệu
            </SectionTitle>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Những con số ấn tượng đánh dấu sự phát triển của BidMaster trong hành trình trở thành nền tảng đấu giá
              trực tuyến hàng đầu
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Zoom in={animate} style={{ transitionDelay: `${200 * index}ms` }}>
                  <StatCard elevation={2}>
                    <Box display="flex" justifyContent="center" mb={2}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" component="div" fontWeight="bold" color="primary">
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {stat.label}
                    </Typography>
                  </StatCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box textAlign="center" mb={6}>
          <SectionTitle variant="h4" component="h2" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Tại Sao Chọn BidMaster?
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            BidMaster mang đến trải nghiệm đấu giá trực tuyến vượt trội với nhiều tính năng độc đáo và tiện ích
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in={animate} style={{ transitionDelay: `${200 * index}ms` }}>
                <FeatureCard elevation={2}>
                  <StyledAvatar>{feature.icon}</StyledAvatar>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Timeline Section */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', py: 6, mb: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionTitle
              variant="h4"
              component="h2"
              sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}
            >
              Hành Trình Phát Triển
            </SectionTitle>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Những cột mốc quan trọng đánh dấu sự phát triển của BidMaster từ khi thành lập đến nay
            </Typography>
          </Box>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {timeline.map((item, index) => (
              <Fade in={animate} timeout={1000} style={{ transitionDelay: `${200 * index}ms` }} key={index}>
                <TimelineItem>
                  <TimelinePoint />
                  <Box>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Chip
                        label={item.year}
                        sx={{
                          bgcolor: primaryColor,
                          color: 'white',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      />
                      <Typography variant="h6" component="h3">
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </Box>
                </TimelineItem>
              </Fade>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box textAlign="center" mb={6}>
          <SectionTitle variant="h4" component="h2" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Đội Ngũ Lãnh Đạo
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Những con người tài năng và đầy nhiệt huyết đứng sau sự thành công của BidMaster
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in={animate} style={{ transitionDelay: `${200 * index}ms` }}>
                <TeamMemberCard elevation={2}>
                  <CardMedia component="img" height="240" image={member.image} alt={member.name} />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {member.position}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.description}
                    </Typography>
                  </CardContent>
                </TeamMemberCard>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', py: 6, mb: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionTitle
              variant="h4"
              component="h2"
              sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}
            >
              Khách Hàng Nói Gì Về Chúng Tôi
            </SectionTitle>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Những đánh giá chân thực từ khách hàng đã và đang sử dụng dịch vụ của BidMaster
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={animate} timeout={1000} style={{ transitionDelay: `${200 * index}ms` }}>
                  <TestimonialCard elevation={2}>
                    <Box sx={{ pl: 3 }}>
                      <Box display="flex" mb={2}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} style={{ color: '#FFD700' }} />
                        ))}
                      </Box>
                      <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                        "{testimonial.content}"
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {testimonial.position}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TestimonialCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Zoom in={animate} timeout={1000}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '16px',
              textAlign: 'center',
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              color: 'white'
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Sẵn Sàng Tham Gia Đấu Giá?
            </Typography>
            <Typography variant="h6" paragraph sx={{ maxWidth: '700px', mx: 'auto', mb: 4, opacity: 0.9 }}>
              Đăng ký tài khoản ngay hôm nay để không bỏ lỡ những sản phẩm độc đáo và cơ hội sở hữu chúng với giá hợp lý
            </Typography>
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mr: 2,
                  mb: { xs: 2, sm: 0 },
                  bgcolor: 'white',
                  color: primaryColor,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
              >
                Đăng Ký Ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Tìm Hiểu Thêm
              </Button>
            </Box>
          </Paper>
        </Zoom>
      </Container>

      {/* Partners Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box textAlign="center" mb={6}>
          <SectionTitle variant="h4" component="h2" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Đối Tác Của Chúng Tôi
          </SectionTitle>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            BidMaster tự hào hợp tác với các thương hiệu và đối tác uy tín
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {[
            'https://images.unsplash.com/photo-1612810806695-30f7a8258391',
            'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea',
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
            'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
            'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
            'https://images.unsplash.com/photo-1611944212129-29977ae1398c'
          ]
            .map((partner, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Fade in={animate} timeout={1000} style={{ transitionDelay: `${100 * (index + 1)}ms` }}>
                  <Box
                    component="img"
                    src={partner}
                    alt={`Partner ${index + 1}`}
                    sx={{
                      width: '100%',
                      filter: 'grayscale(100%)',
                      opacity: 0.7,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        filter: 'grayscale(0%)',
                        opacity: 1
                      }
                    }}
                  />
                </Fade>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Introduction