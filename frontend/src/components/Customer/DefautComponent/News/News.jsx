import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Avatar,
  Pagination,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tab,
  Tabs,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
  alpha,
  Skeleton
} from '@mui/material'
import { Search, CalendarToday, Person, Bookmark, BookmarkBorder, Share, ArrowForward } from '@mui/icons-material'

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
  background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  padding: theme.spacing(8, 0),
  position: 'relative',
  marginBottom: theme.spacing(6)
}))

const CategoryChip = styled(Chip)(({ theme, active }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: active ? primaryColor : 'rgba(0, 0, 0, 0.05)',
  color: active ? 'white' : 'rgba(0, 0, 0, 0.7)',
  '&:hover': {
    backgroundColor: active ? secondaryColor : 'rgba(0, 0, 0, 0.1)'
  },
  transition: 'all 0.3s ease'
}))

const NewsCard = styled(Card)(({ theme, featured }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: featured ? '0 10px 30px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
  }
}))

const FeaturedNewsCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
  }
}))

const FeaturedNewsContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
  color: 'white'
}))

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: primaryColor,
  color: '#ffffff',
  padding: '10px 24px',
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

const SearchBox = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: primaryColor
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: primaryColor
    }
  }
}))

const SidebarCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
}))

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: primaryColor,
    color: 'white'
  },
  transition: 'all 0.3s ease'
}))

const NewsletterBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${alpha(primaryColor, 0.05)} 0%, ${alpha(secondaryColor, 0.1)} 100%)`,
  border: `1px solid ${alpha(primaryColor, 0.1)}`
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  minWidth: 0,
  padding: theme.spacing(1, 2),
  '&.Mui-selected': {
    color: primaryColor
  }
}))

const News = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [savedArticles, setSavedArticles] = useState([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setPage(1)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    setPage(1)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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

  const toggleSaveArticle = (id) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter((articleId) => articleId !== id))
    } else {
      setSavedArticles([...savedArticles, id])
    }
  }

  // Sample data
  const categories = ['Tất cả', 'Đấu giá', 'Sự kiện', 'Hướng dẫn', 'Thị trường', 'Công nghệ', 'Tin tức']

  const featuredArticles = [
    {
      id: 1,
      title: 'Phiên đấu giá tranh quý thu hút hàng trăm nhà sưu tập',
      excerpt:
      'Phiên đấu giá tranh quý diễn ra vào cuối tuần qua đã thu hút sự tham gia của hàng trăm nhà sưu tập trong và ngoài nước, với nhiều tác phẩm đạt mức giá kỷ lục.',
      image: 'https://cdn.arttimes.vn/upload/1-2024/images/2024-03-12/1710217615-0a1.jpg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
      date: '15/05/2025',
      author: 'Nguyễn Văn A',
      category: 'Sự kiện'
    },
    {
      id: 2,
      title: 'BidMaster ra mắt tính năng đấu giá trực tiếp qua video',
      excerpt:
      'BidMaster vừa chính thức ra mắt tính năng đấu giá trực tiếp qua video, cho phép người dùng tham gia đấu giá từ xa nhưng vẫn có trải nghiệm như đang có mặt tại phòng đấu giá.',
      image: 'https://cdn.thuvienphapluat.vn/phap-luat/2022-2/THN/cung-cap-dich-vu-dau-gia-truc-tuyen.jpg',
      date: '10/05/2025',
      author: 'Trần Thị B',
      category: 'Công nghệ'
    }
  ]

  const articles = [
    {
      id: 3,
      title: 'Hướng dẫn đấu giá thành công cho người mới bắt đầu',
      excerpt:
        'Bài viết này sẽ cung cấp cho bạn những kiến thức cơ bản và chiến lược đấu giá hiệu quả dành cho những người mới tham gia vào thế giới đấu giá trực tuyến.',
      image: 'https://cdn.arttimes.vn/upload/1-2024/images/2024-03-12/1710217747-0a6.jpg',
      date: '05/05/2025',
      author: 'Lê Văn C',
      category: 'Hướng dẫn'
    },
    {
      id: 4,
      title: 'Top 10 sản phẩm đấu giá có giá trị cao nhất tháng 4/2025',
      excerpt:
        'Cùng điểm qua 10 sản phẩm đấu giá đạt mức giá cao nhất trong tháng 4/2025 trên nền tảng BidMaster, với nhiều món đồ độc đáo và giá trị.',
      image: 'https://s.vucar.vn/blog-strapi/medium_Huong_Dan_Mua_Xe_O_To_Tren_San_Dau_Gia_Truc_Tuyen_Tu_A_Z_Cho_Nguoi_Moi_Bat_Dau_15583778e3.jpeg',
      date: '30/04/2025',
      author: 'Phạm Thị D',
      category: 'Đấu giá'
    },
    {
      id: 5,
      title: 'Xu hướng thị trường đấu giá nghệ thuật năm 2025',
      excerpt:
        'Phân tích chi tiết về các xu hướng đang định hình thị trường đấu giá nghệ thuật trong năm 2025, từ NFT đến các tác phẩm nghệ thuật truyền thống.',
      image: 'https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785344910f48be352581b6420cc84effd8d545e412a592803a0d0df9271ff1fb5c38b30e2a514304d8680952bb930a95c15/3001-sotheby-380.jpg.webp',
      date: '25/04/2025',
      author: 'Hoàng Văn E',
      category: 'Thị trường'
    },
    {
      id: 6,
      title: 'BidMaster hợp tác với các nghệ sĩ nổi tiếng trong dự án từ thiện',
      excerpt:
        'BidMaster vừa công bố hợp tác với nhiều nghệ sĩ nổi tiếng trong một dự án đấu giá từ thiện nhằm gây quỹ cho các hoạt động bảo vệ môi trường.',
      image: 'https://image.baophapluat.vn/1200x630/Uploaded/2025/athlrainaghat/2023_05_21/den-vau-trong-san-pham-am-nhac-moi-ra-mat-anh-nhan-vat-4409.jpeg',
      date: '20/04/2025',
      author: 'Nguyễn Thị F',
      category: 'Tin tức'
    },
    {
      id: 7,
      title: 'Cách xác định giá trị thực của đồ cổ trước khi tham gia đấu giá',
      excerpt:
        'Bài viết này cung cấp những kiến thức và kỹ năng cần thiết để đánh giá giá trị thực của đồ cổ, giúp bạn đưa ra quyết định đúng đắn khi tham gia đấu giá.',
      image: 'https://image.baodauthau.vn/w750/Uploaded/2025/qjmfn/2022_08_22/05-724.jpg',
      date: '15/04/2025',
      author: 'Trần Văn G',
      category: 'Hướng dẫn'
    },
    {
      id: 8,
      title: 'Phiên đấu giá xe cổ thu hút sự chú ý của giới sưu tầm',
      excerpt:
        'Phiên đấu giá xe cổ được tổ chức vào đầu tháng 4 đã thu hút sự chú ý đặc biệt từ giới sưu tầm, với nhiều mẫu xe quý hiếm xuất hiện.',
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: '10/04/2025',
      author: 'Lê Thị H',
      category: 'Sự kiện'
    }
  ]

  const popularArticles = [
    {
      id: 9,
      title: 'Bộ sưu tập tem hiếm được bán với giá kỷ lục tại phiên đấu giá',
      image: 'https://vietnamstamp.com.vn/media/news/1112_1.jpg',
      date: '01/05/2025'
    },
    {
      id: 10,
      title: '5 mẹo để tránh các lỗi phổ biến khi tham gia đấu giá trực tuyến',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      date: '28/04/2025'
    },
    {
      id: 11,
      title: 'Blockchain và tương lai của ngành đấu giá trực tuyến',
      image: 'https://cdnphoto.dantri.com.vn/virQATzlgcBoRzMqU6pMzkl6Hic=/2025/02/26/bitcoin-1740508799921.jpg',
      date: '22/04/2025'
    },
    {
      id: 12,
      title: 'Những kỷ lục đấu giá ấn tượng nhất trong quý I/2025',
      image: 'https://media.baovanhoa.vn/zoom/1000/uploaded/nghiemthanh/2024_10_14/3_cvra.jpg',
      date: '15/04/2025'
    }
  ]

  const tags = [
    'Đấu giá trực tuyến',
    'Nghệ thuật',
    'Đồ cổ',
    'Sưu tầm',
    'Xe cổ',
    'Trang sức',
    'Đồng hồ',
    'NFT',
    'Từ thiện',
    'Hướng dẫn',
    'Thị trường',
    'Công nghệ'
  ]

  const renderArticleSkeleton = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', borderRadius: '12px' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={32} width="80%" />
          <Skeleton variant="text" height={20} width="40%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} width="60%" />
        </CardContent>
      </Card>
    </Grid>
  )

  return (
    <Box component="main">
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Tin Tức & Sự Kiện
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 4 }}>
                Cập nhật những thông tin mới nhất về đấu giá, thị trường và các sự kiện nổi bật từ BidMaster
              </Typography>
              <SearchBox
                fullWidth
                placeholder="Tìm kiếm tin tức..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
                sx={{ maxWidth: '500px' }}
              />
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://image3.luatvietnam.vn/uploaded/images/original/2024/06/08/to-chuc-dau-gia-truc-tuyen-duoc-thuc-hien-tai-nhung-trang-dien-tu-nao_0806111016.jpg"
                alt="News Illustration"
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
        {/* Categories */}
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              clickable
              active={activeCategory === category ? 1 : 0}
              onClick={() => handleCategoryChange(category)}
            />
          ))}
        </Box>

        {/* Featured Articles */}
        <Box sx={{ mb: 6 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <SectionTitle variant="h5" component="h2">
              Tin Nổi Bật
            </SectionTitle>
            <Button
              endIcon={<ArrowForward />}
              sx={{ color: primaryColor, '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.05)' } }}
            >
              Xem tất cả
            </Button>
          </Box>

          <Grid container spacing={3}>
            {loading
              ? Array.from(new Array(2)).map((_, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ height: 400, borderRadius: '12px' }}>
                    <Skeleton variant="rectangular" height="100%" />
                  </Card>
                </Grid>
              ))
              : featuredArticles.map((article) => (
                <Grid item xs={12} md={6} key={article.id}>
                  <FeaturedNewsCard>
                    <CardActionArea sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="400"
                        image={article.image}
                        alt={article.title}
                        sx={{ height: '100%' }}
                      />
                      <FeaturedNewsContent>
                        <Chip
                          label={article.category}
                          size="small"
                          sx={{
                            bgcolor: primaryColor,
                            color: 'white',
                            mb: 2
                          }}
                        />
                        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                          {article.title}
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                          {article.excerpt}
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <CalendarToday sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
                            <Typography variant="caption" sx={{ mr: 2 }}>
                              {article.date}
                            </Typography>
                            <Person sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
                            <Typography variant="caption">{article.author}</Typography>
                          </Box>
                          <Box>
                            <IconButton size="small" sx={{ color: 'white' }}>
                              <Share fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ color: 'white' }}
                              onClick={(e) => {
                                e.preventDefault()
                                toggleSaveArticle(article.id)
                              }}
                            >
                              {savedArticles.includes(article.id) ? (
                                <Bookmark fontSize="small" />
                              ) : (
                                <BookmarkBorder fontSize="small" />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </FeaturedNewsContent>
                    </CardActionArea>
                  </FeaturedNewsCard>
                </Grid>
              ))}
          </Grid>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ style: { backgroundColor: primaryColor } }}
              >
                <StyledTab label="Mới nhất" />
                <StyledTab label="Phổ biến" />
                <StyledTab label="Đấu giá sắp tới" />
                <StyledTab label="Hướng dẫn & Mẹo" />
              </Tabs>
            </Box>

            {/* Articles Grid */}
            <Grid container spacing={3}>
              {loading
                ? Array.from(new Array(6)).map((_, index) => renderArticleSkeleton())
                : articles.map((article) => (
                  <Grid item xs={12} sm={6} key={article.id}>
                    <NewsCard>
                      <CardActionArea>
                        <CardMedia component="img" height="200" image={article.image} alt={article.title} />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                            <Chip
                              label={article.category}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(180, 23, 18, 0.1)',
                                color: primaryColor
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.preventDefault()
                                toggleSaveArticle(article.id)
                              }}
                            >
                              {savedArticles.includes(article.id) ? (
                                <Bookmark fontSize="small" color="primary" />
                              ) : (
                                <BookmarkBorder fontSize="small" />
                              )}
                            </IconButton>
                          </Box>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {article.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {article.excerpt}
                          </Typography>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                              <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                                {article.date}
                              </Typography>
                              <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {article.author}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </NewsCard>
                  </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={6} mb={4}>
              <Pagination
                count={5}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Search */}
            <SidebarCard elevation={1}>
              <Typography variant="h6" component="h3" gutterBottom>
                Tìm kiếm
              </Typography>
              <TextField
                fullWidth
                placeholder="Tìm kiếm tin tức..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
                size="small"
              />
            </SidebarCard>

            {/* Popular Articles */}
            <SidebarCard elevation={1}>
              <Typography variant="h6" component="h3" gutterBottom>
                Bài viết phổ biến
              </Typography>
              <List disablePadding>
                {loading
                  ? Array.from(new Array(4)).map((_, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                      <ListItemAvatar>
                        <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton variant="text" width="100%" />}
                        secondary={<Skeleton variant="text" width="40%" />}
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))
                  : popularArticles.map((article) => (
                    <ListItem
                      key={article.id}
                      disablePadding
                      component="a"
                      href="#"
                      sx={{
                        mb: 2,
                        '&:last-child': { mb: 0 },
                        display: 'flex',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.02)'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={article.image}
                          alt={article.title}
                          variant="rounded"
                          sx={{ width: 80, height: 80 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {article.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', mt: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                            {article.date}
                          </Typography>
                        }
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))}
              </List>
            </SidebarCard>

            {/* Categories */}
            <SidebarCard elevation={1}>
              <Typography variant="h6" component="h3" gutterBottom>
                Danh mục
              </Typography>
              <List disablePadding>
                {categories
                  .filter((category) => category !== 'Tất cả')
                  .map((category) => (
                    <ListItem
                      key={category}
                      disablePadding
                      sx={{
                        py: 0.75,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                        '&:last-child': { borderBottom: 'none' }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">{category}</Typography>
                            <Chip
                              label={Math.floor(Math.random() * 20) + 1}
                              size="small"
                              sx={{ height: 24, fontSize: '0.75rem' }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </SidebarCard>

            {/* Tags */}
            <SidebarCard elevation={1}>
              <Typography variant="h6" component="h3" gutterBottom>
                Thẻ
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <TagChip key={tag} label={tag} size="small" clickable />
                ))}
              </Box>
            </SidebarCard>
          </Grid>
        </Grid>

        {/* Related Articles */}
        <Box sx={{ mb: 8 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <SectionTitle variant="h5" component="h2">
              Có Thể Bạn Quan Tâm
            </SectionTitle>
            <Button
              endIcon={<ArrowForward />}
              sx={{ color: primaryColor, '&:hover': { backgroundColor: 'rgba(180, 23, 18, 0.05)' } }}
            >
              Xem thêm
            </Button>
          </Box>

          <Grid container spacing={3}>
            {loading
              ? Array.from(new Array(4)).map((_, index) => renderArticleSkeleton())
              : articles
                .slice(0, 4)
                .reverse()
                .map((article) => (
                  <Grid item xs={12} sm={6} md={3} key={`related-${article.id}`}>
                    <NewsCard>
                      <CardActionArea>
                        <CardMedia component="img" height="160" image={article.image} alt={article.title} />
                        <CardContent>
                          <Typography variant="subtitle1" component="h3" gutterBottom fontWeight="medium">
                            {article.title}
                          </Typography>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex' }}>
                              <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                              {article.date}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.preventDefault()
                                toggleSaveArticle(article.id)
                              }}
                            >
                              {savedArticles.includes(article.id) ? (
                                <Bookmark fontSize="small" color="primary" />
                              ) : (
                                <BookmarkBorder fontSize="small" />
                              )}
                            </IconButton>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </NewsCard>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default News
