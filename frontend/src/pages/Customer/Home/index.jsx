// import React, { useEffect, useRef } from 'react'
// import CustomerLayout from '~/layouts/CustomerLayout'
// import UpcomingAuctionList from '~/features/Customer/AuctionSession/UpcomingAuctionList/UpcomingAuctionList'
// import CurrentAuctionList from '~/features/Customer/AuctionSession/CurrentAuctionList/CurrentAuctionList'
// import Banner from '~/components/Customer/DefautComponent/BannerComponent/BannerComponent'
// import { Box, Typography } from '@mui/material'
// import { useLocation, useNavigate } from 'react-router-dom'


// function CustomerHomePage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const upcomingRef = useRef()
//   const currentAuctionRef = useRef()

//   useEffect(() => {
//     const scrollToRef = {
//       upcoming: upcomingRef,
//       currentAuction: currentAuctionRef
//     }

//     const targetRef = scrollToRef[location.state?.scrollTo]
//     if (targetRef?.current) {
//       setTimeout(() => {
//         targetRef.current.scrollIntoView({ behavior: 'smooth' })
//       }, 200)
//     }
//   }, [location.state])


//   return (
//     <CustomerLayout>
//       <Banner />
//       <div ref={upcomingRef}>
//         <UpcomingAuctionList />
//       </div>

//       <div ref={currentAuctionRef}>
//         <CurrentAuctionList />
//       </div>
//       <Box display="flex" justifyContent="center" my={3}>
//         <Typography
//           onClick={() => navigate('/search')}
//           sx={{
//             color: '#b41712',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             fontWeight: 500,
//             '&:hover': {
//               textDecoration: 'underline',
//               color: '#8B0000'
//             }
//           }}
//         >
//           Xem thêm
//         </Typography>
//       </Box>
//     </CustomerLayout>
//   )
// }

// export default CustomerHomePage

// import React, { useState, useRef } from 'react'
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Chip,
//   LinearProgress,
//   IconButton,
//   Divider
// } from '@mui/material'
// import {
//   Gavel,
//   AccessTime,
//   Visibility,
//   Notifications,
//   ArrowForward,
//   ArrowBack,
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
//   HowToReg
// } from '@mui/icons-material'
// import { primaryColor } from '~/utils/config'
// import CustomerLayout from '~/layouts/CustomerLayout'

// // Extended mock data for auction categories
// const auctionCategories = [
//   { id: 1, name: 'Điện tử', image: '/placeholder.svg?height=200&width=200', count: 125 },
//   { id: 2, name: 'Nghệ thuật', image: '/placeholder.svg?height=200&width=200', count: 89 },
//   { id: 3, name: 'Đồ cổ', image: '/placeholder.svg?height=200&width=200', count: 65 },
//   { id: 4, name: 'Trang sức', image: '/placeholder.svg?height=200&width=200', count: 42 },
//   { id: 5, name: 'Xe cổ', image: '/placeholder.svg?height=200&width=200', count: 38 },
//   { id: 6, name: 'Bất động sản', image: '/placeholder.svg?height=200&width=200', count: 29 },
//   { id: 7, name: 'Thời trang', image: '/placeholder.svg?height=200&width=200', count: 156 },
//   { id: 8, name: 'Đồ gia dụng', image: '/placeholder.svg?height=200&width=200', count: 78 },
//   { id: 9, name: 'Sách & Tài liệu', image: '/placeholder.svg?height=200&width=200', count: 92 },
//   { id: 10, name: 'Nhạc cụ', image: '/placeholder.svg?height=200&width=200', count: 34 },
//   { id: 11, name: 'Đồ chơi', image: '/placeholder.svg?height=200&width=200', count: 67 },
//   { id: 12, name: 'Thể thao', image: '/placeholder.svg?height=200&width=200', count: 45 },
//   { id: 13, name: 'Máy ảnh', image: '/placeholder.svg?height=200&width=200', count: 58 },
//   { id: 14, name: 'Đồng hồ', image: '/placeholder.svg?height=200&width=200', count: 73 }
// ]

// // Mock data for auction items
// const featuredAuctions = [
//   {
//     id: 1,
//     name: 'Tranh sơn dầu phong cảnh Paris thế kỷ 19',
//     startingPrice: 15000000,
//     currentPrice: 28500000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '2 ngày 5 giờ',
//     bids: 12,
//     status: 'hot',
//     percentComplete: 70
//   },
//   {
//     id: 2,
//     name: 'Đồng hồ Rolex Vintage 1970',
//     startingPrice: 120000000,
//     currentPrice: 145000000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '1 ngày 3 giờ',
//     bids: 8,
//     status: 'new',
//     percentComplete: 85
//   },
//   {
//     id: 3,
//     name: 'Tượng đồng cổ thời Lê',
//     startingPrice: 50000000,
//     currentPrice: 62500000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '5 giờ 23 phút',
//     bids: 15,
//     status: 'ending',
//     percentComplete: 95
//   },
//   {
//     id: 4,
//     name: 'Bộ sưu tập tem hiếm thế kỷ 20',
//     startingPrice: 8000000,
//     currentPrice: 12500000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '3 ngày 12 giờ',
//     bids: 6,
//     status: '',
//     percentComplete: 40
//   }
// ]

// // Mock data for upcoming auctions
// const upcomingAuctions = [
//   {
//     id: 9,
//     name: 'Bộ sưu tập tranh Đông Hồ cổ',
//     startingPrice: 25000000,
//     bidIncrement: 1000000,
//     image: '/placeholder.svg?height=300&width=300',
//     startTime: '2 ngày nữa',
//     registrations: 15,
//     status: 'upcoming'
//   },
//   {
//     id: 10,
//     name: 'Xe Mercedes-Benz cổ 1980',
//     startingPrice: 850000000,
//     bidIncrement: 10000000,
//     image: '/placeholder.svg?height=300&width=300',
//     startTime: '1 tuần nữa',
//     registrations: 8,
//     status: 'upcoming'
//   },
//   {
//     id: 11,
//     name: 'Bộ chén Bát Tràng thời Lê',
//     startingPrice: 45000000,
//     bidIncrement: 2000000,
//     image: '/placeholder.svg?height=300&width=300',
//     startTime: '3 ngày nữa',
//     registrations: 12,
//     status: 'upcoming'
//   },
//   {
//     id: 12,
//     name: 'Đàn piano cổ Steinway',
//     startingPrice: 180000000,
//     bidIncrement: 5000000,
//     image: '/placeholder.svg?height=300&width=300',
//     startTime: '5 ngày nữa',
//     registrations: 6,
//     status: 'upcoming'
//   }
// ]

// // Mock data for ongoing auctions (renamed from ending soon)
// const ongoingAuctions = [
//   {
//     id: 5,
//     name: 'Bình gốm sứ thời Nguyễn',
//     startingPrice: 35000000,
//     currentPrice: 42000000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '1 giờ 15 phút',
//     bids: 9,
//     status: 'ending',
//     percentComplete: 98
//   },
//   {
//     id: 6,
//     name: 'Xe Vespa cổ 1960',
//     startingPrice: 75000000,
//     currentPrice: 92000000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '2 giờ 30 phút',
//     bids: 14,
//     status: 'ending',
//     percentComplete: 96
//   },
//   {
//     id: 7,
//     name: 'Bộ bàn ghế gỗ trắc thời Minh',
//     startingPrice: 180000000,
//     currentPrice: 195000000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '3 giờ 45 phút',
//     bids: 7,
//     status: 'ending',
//     percentComplete: 92
//   },
//   {
//     id: 8,
//     name: 'Bộ sưu tập tiền xu cổ',
//     startingPrice: 25000000,
//     currentPrice: 32500000,
//     image: '/placeholder.svg?height=300&width=300',
//     timeLeft: '4 giờ 10 phút',
//     bids: 11,
//     status: 'ending',
//     percentComplete: 90
//   }
// ]

// // Mock data for banner slides
// const bannerSlides = [
//   {
//     id: 1,
//     title: 'Phiên Đấu Giá Đặc Biệt',
//     subtitle: 'Bộ sưu tập nghệ thuật quý hiếm từ các danh họa Việt Nam',
//     image: '/placeholder.svg?height=500&width=1200',
//     buttonText: 'Tham gia ngay',
//     color: '#8B0000'
//   },
//   {
//     id: 2,
//     title: 'Đấu Giá Trực Tuyến',
//     subtitle: 'Cơ hội sở hữu những món đồ độc đáo với giá hợp lý',
//     image: '/placeholder.svg?height=500&width=1200',
//     buttonText: 'Khám phá',
//     color: '#1A5276'
//   },
//   {
//     id: 3,
//     title: 'Đấu Giá Từ Thiện',
//     subtitle: 'Đấu giá và đóng góp cho các hoạt động xã hội ý nghĩa',
//     image: '/placeholder.svg?height=500&width=1200',
//     buttonText: 'Tìm hiểu thêm',
//     color: '#186A3B'
//   }
// ]

// function CustomerHomePage() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const categoriesScrollRef = useRef(null)

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND'
//     }).format(price)
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
//   }

//   const scrollCategories = (direction) => {
//     if (categoriesScrollRef.current) {
//       const scrollAmount = 300
//       categoriesScrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       })
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//     case 'hot':
//       return '#FF6B6B'
//     case 'new':
//       return '#4ECDC4'
//     case 'ending':
//       return '#FF9800'
//     case 'upcoming':
//       return primaryColor
//     default:
//       return '#757575'
//     }
//   }

//   const getStatusText = (status) => {
//     switch (status) {
//     case 'hot':
//       return 'Đấu giá sôi nổi'
//     case 'new':
//       return 'Mới đăng'
//     case 'ending':
//       return 'Sắp kết thúc'
//     case 'upcoming':
//       return 'Sắp diễn ra'
//     default:
//       return 'Đang đấu giá'
//     }
//   }

//   return (
//     <CustomerLayout isCategory={false}>
//       <Box>
//         {/* Hero Banner */}
//         <Box sx={{ position: 'relative', height: 500, overflow: 'hidden' }}>
//           {bannerSlides.map((slide, index) => (
//             <Box
//               key={slide.id}
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: `linear-gradient(135deg, ${slide.color} 0%, ${slide.color}CC 100%)`,
//                 display: 'flex',
//                 alignItems: 'center',
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: 'opacity 0.5s ease-in-out'
//               }}
//             >
//               <Container maxWidth="lg">
//                 <Grid container spacing={4} alignItems="center">
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
//                       {slide.title}
//                     </Typography>
//                     <Typography variant="h6" sx={{ color: 'white', mb: 4, opacity: 0.9 }}>
//                       {slide.subtitle}
//                     </Typography>
//                     <Button
//                       variant="contained"
//                       size="large"
//                       startIcon={<Gavel />}
//                       sx={{
//                         bgcolor: 'white',
//                         color: slide.color,
//                         px: 4,
//                         py: 1.5,
//                         fontSize: '1.1rem',
//                         fontWeight: 'bold',
//                         '&:hover': {
//                           bgcolor: '#f5f5f5'
//                         }
//                       }}
//                     >
//                       {slide.buttonText}
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Box
//                       component="img"
//                       src={slide.image}
//                       alt={slide.title}
//                       sx={{
//                         width: '100%',
//                         height: 'auto',
//                         borderRadius: 2
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Container>
//             </Box>
//           ))}

//           {/* Navigation Arrows */}
//           <IconButton
//             onClick={prevSlide}
//             sx={{
//               position: 'absolute',
//               left: 20,
//               top: '50%',
//               transform: 'translateY(-50%)',
//               bgcolor: 'rgba(255,255,255,0.8)',
//               '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//             }}
//           >
//             <ArrowBack />
//           </IconButton>
//           <IconButton
//             onClick={nextSlide}
//             sx={{
//               position: 'absolute',
//               right: 20,
//               top: '50%',
//               transform: 'translateY(-50%)',
//               bgcolor: 'rgba(255,255,255,0.8)',
//               '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//             }}
//           >
//             <ArrowForward />
//           </IconButton>

//           {/* Dots Indicator */}
//           <Box
//             sx={{
//               position: 'absolute',
//               bottom: 20,
//               left: '50%',
//               transform: 'translateX(-50%)',
//               display: 'flex',
//               gap: 1
//             }}
//           >
//             {bannerSlides.map((_, index) => (
//               <Box
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 sx={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: '50%',
//                   bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease'
//                 }}
//               />
//             ))}
//           </Box>
//         </Box>

//         {/* Categories with Horizontal Scroll */}
//         <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
//           <Container maxWidth="lg">
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//               Danh mục đấu giá
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <IconButton
//                   onClick={() => scrollCategories('left')}
//                   sx={{
//                     bgcolor: 'white',
//                     boxShadow: 1,
//                     '&:hover': { bgcolor: '#f5f5f5' }
//                   }}
//                 >
//                   <ChevronLeft />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => scrollCategories('right')}
//                   sx={{
//                     bgcolor: 'white',
//                     boxShadow: 1,
//                     '&:hover': { bgcolor: '#f5f5f5' }
//                   }}
//                 >
//                   <ChevronRight />
//                 </IconButton>
//               </Box>
//             </Box>

//             <Box
//               ref={categoriesScrollRef}
//               sx={{
//                 display: 'flex',
//                 gap: 3,
//                 overflowX: 'auto',
//                 scrollBehavior: 'smooth',
//                 '&::-webkit-scrollbar': {
//                   display: 'none'
//                 },
//                 msOverflowStyle: 'none',
//                 scrollbarWidth: 'none'
//               }}
//             >
//               {auctionCategories.map((category) => (
//                 <Card
//                   key={category.id}
//                   sx={{
//                     minWidth: 180,
//                     textAlign: 'center',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-8px)',
//                       boxShadow: 4
//                     }
//                   }}
//                 >
//                   <CardMedia component="img" height="120" image={category.image} alt={category.name} />
//                   <CardContent>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
//                       {category.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {category.count} phiên đấu giá
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Box>
//           </Container>
//         </Box>

//         {/* Featured Auctions */}
//         <Box sx={{ py: 6 }}>
//           <Container maxWidth="lg">
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//               Phiên đấu giá nổi bật
//               </Typography>
//               <Button endIcon={<ArrowForward />}>Xem tất cả</Button>
//             </Box>
//             <Grid container spacing={3}>
//               {featuredAuctions.map((auction) => (
//                 <Grid item xs={12} sm={6} md={3} key={auction.id}>
//                   <Card
//                     sx={{
//                       position: 'relative',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: 4
//                       }
//                     }}
//                   >
//                     {/* Status Badge */}
//                     {auction.status && (
//                       <Chip
//                         label={getStatusText(auction.status)}
//                         size="small"
//                         sx={{
//                           position: 'absolute',
//                           top: 8,
//                           left: 8,
//                           zIndex: 1,
//                           bgcolor: getStatusColor(auction.status),
//                           color: 'white',
//                           fontWeight: 'bold'
//                         }}
//                       />
//                     )}

//                     {/* Bids Badge */}
//                     <Chip
//                       label={`${auction.bids} lượt đấu`}
//                       size="small"
//                       icon={<Gavel sx={{ fontSize: 16, color: 'white !important' }} />}
//                       sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         zIndex: 1,
//                         bgcolor: '#2E3A59',
//                         color: 'white',
//                         '& .MuiChip-icon': {
//                           color: 'white'
//                         }
//                       }}
//                     />

//                     {/* Action Buttons */}
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         display: 'flex',
//                         gap: 1,
//                         opacity: 0,
//                         transition: 'opacity 0.3s ease',
//                         '.MuiCard-root:hover &': {
//                           opacity: 1
//                         }
//                       }}
//                     >
//                       <IconButton
//                         sx={{
//                           bgcolor: 'white',
//                           boxShadow: 2,
//                           '&:hover': { bgcolor: '#f5f5f5' }
//                         }}
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           bgcolor: 'white',
//                           boxShadow: 2,
//                           '&:hover': { bgcolor: '#f5f5f5' }
//                         }}
//                       >
//                         <Notifications />
//                       </IconButton>
//                     </Box>

//                     <CardMedia component="img" height="200" image={auction.image} alt={auction.name} />
//                     <CardContent>
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 'bold',
//                           mb: 1,
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical',
//                           height: 48
//                         }}
//                       >
//                         {auction.name}
//                       </Typography>

//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                         <AccessTime sx={{ fontSize: 16, color: '#757575', mr: 0.5 }} />
//                         <Typography variant="body2" color="text.secondary">
//                         Còn lại: {auction.timeLeft}
//                         </Typography>
//                       </Box>

//                       <LinearProgress
//                         variant="determinate"
//                         value={auction.percentComplete}
//                         sx={{
//                           mb: 2,
//                           height: 6,
//                           borderRadius: 3,
//                           bgcolor: '#e0e0e0',
//                           '& .MuiLinearProgress-bar': {
//                             bgcolor: auction.percentComplete > 90 ? '#FF9800' : '#4ECDC4'
//                           }
//                         }}
//                       />

//                       <Divider sx={{ mb: 2 }} />

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography variant="body2" color="text.secondary">
//                         Giá khởi điểm:
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                           {formatPrice(auction.startingPrice)}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                         Giá hiện tại:
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
//                           {formatPrice(auction.currentPrice)}
//                         </Typography>
//                       </Box>

//                       <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           bgcolor: '#2E3A59',
//                           '&:hover': { bgcolor: '#1a2332' }
//                         }}
//                         startIcon={<Gavel />}
//                       >
//                       Đặt giá
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>

//         {/* Upcoming Auctions */}
//         <Box sx={{ py: 6, bgcolor: '#fef7f7' }}>
//           <Container maxWidth="lg">
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
//                 Sắp diễn ra
//                 </Typography>
//                 <Chip
//                   label="Đăng ký sớm"
//                   size="small"
//                   sx={{
//                     bgcolor: primaryColor,
//                     color: 'white'
//                   }}
//                   icon={<HowToReg sx={{ fontSize: 16, color: 'white !important' }} />}
//                 />
//               </Box>
//               <Button endIcon={<ArrowForward />}>Xem tất cả</Button>
//             </Box>
//             <Grid container spacing={3}>
//               {upcomingAuctions.map((auction) => (
//                 <Grid item xs={12} sm={6} md={3} key={auction.id}>
//                   <Card
//                     sx={{
//                       position: 'relative',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: 4
//                       },
//                       border: '1px solid #8b0000'
//                     }}
//                   >
//                     {/* Status Badge */}
//                     <Chip
//                       label="Sắp diễn ra"
//                       size="small"
//                       sx={{
//                         position: 'absolute',
//                         top: 8,
//                         left: 8,
//                         zIndex: 1,
//                         bgcolor: primaryColor,
//                         color: 'white',
//                         fontWeight: 'bold'
//                       }}
//                     />

//                     {/* Registrations Badge */}
//                     <Chip
//                       label={`${auction.registrations} đăng ký`}
//                       size="small"
//                       icon={<HowToReg sx={{ fontSize: 16, color: 'white !important' }} />}
//                       sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         zIndex: 1,
//                         bgcolor: '#2E3A59',
//                         color: 'white',
//                         '& .MuiChip-icon': {
//                           color: 'white'
//                         }
//                       }}
//                     />

//                     {/* Action Buttons */}
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         display: 'flex',
//                         gap: 1,
//                         opacity: 0,
//                         transition: 'opacity 0.3s ease',
//                         '.MuiCard-root:hover &': {
//                           opacity: 1
//                         }
//                       }}
//                     >
//                       <IconButton
//                         sx={{
//                           bgcolor: 'white',
//                           boxShadow: 2,
//                           '&:hover': { bgcolor: '#f5f5f5' }
//                         }}
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           bgcolor: 'white',
//                           boxShadow: 2,
//                           '&:hover': { bgcolor: '#f5f5f5' }
//                         }}
//                       >
//                         <Notifications />
//                       </IconButton>
//                     </Box>

//                     <CardMedia component="img" height="200" image={auction.image} alt={auction.name} />
//                     <CardContent>
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 'bold',
//                           mb: 1,
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical',
//                           height: 48
//                         }}
//                       >
//                         {auction.name}
//                       </Typography>

//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           mb: 2,
//                           color: primaryColor
//                         }}
//                       >
//                         <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
//                         <Typography variant="body2" sx={{ fontWeight: 'bold', color: primaryColor }}>
//                         Bắt đầu: {auction.startTime}
//                         </Typography>
//                       </Box>

//                       <Divider sx={{ mb: 2 }} />

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography variant="body2" color="text.secondary">
//                         Giá khởi điểm:
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                           {formatPrice(auction.startingPrice)}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                         Bước giá:
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold', color: primaryColor }}>
//                           {formatPrice(auction.bidIncrement)}
//                         </Typography>
//                       </Box>

//                       <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           bgcolor: primaryColor,
//                           '&:hover': { bgcolor: ' #8b0000' }
//                         }}
//                         startIcon={<HowToReg />}
//                       >
//                       Đăng ký
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>

//         {/* Ongoing Auctions (renamed from Ending Soon) */}
//         <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
//           <Container maxWidth="lg">
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
//                 Đang diễn ra
//                 </Typography>
//                 <Chip
//                   label="Còn ít thời gian"
//                   size="small"
//                   sx={{
//                     bgcolor: '#FF9800',
//                     color: 'white'
//                   }}
//                   icon={<AccessTime sx={{ fontSize: 16, color: 'white !important' }} />}
//                 />
//               </Box>
//               <Button endIcon={<ArrowForward />}>Xem tất cả</Button>
//             </Box>
//             <Grid container spacing={3}>
//               {ongoingAuctions.map((auction) => (
//                 <Grid item xs={12} sm={6} md={3} key={auction.id}>
//                   <Card
//                     sx={{
//                       position: 'relative',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: 4
//                       },
//                       border: '1px solid #FF9800'
//                     }}
//                   >
//                     {/* Status Badge */}
//                     {auction.status && (
//                       <Chip
//                         label={getStatusText(auction.status)}
//                         size="small"
//                         sx={{
//                           position: 'absolute',
//                           top: 8,
//                           left: 8,
//                           zIndex: 1,
//                           bgcolor: getStatusColor(auction.status),
//                           color: 'white',
//                           fontWeight: 'bold'
//                         }}
//                       />
//                     )}

//                     {/* Bids Badge */}
//                     <Chip
//                       label={`${auction.bids} lượt đấu`}
//                       size="small"
//                       icon={<Gavel sx={{ fontSize: 16, color: 'white !important' }} />}
//                       sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         zIndex: 1,
//                         bgcolor: '#2E3A59',
//                         color: 'white',
//                         '& .MuiChip-icon': {
//                           color: 'white'
//                         }
//                       }}
//                     />

//                     {/* Action Buttons */}
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         display: 'flex',
//                         gap: 1,
//                         opacity: 0,
//                         transition: 'opacity 0.3s ease',
//                         '.MuiCard-root:hover &': {
//                           opacity: 1
//                         }
//                       }}
//                     >
//                       <IconButton
//                         sx={{
//                           bgcolor: 'white',
//                           boxShadow: 2,
//                           '&:hover': { bgcolor: '#f5f5f5' }
//                         }}
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           bgcolor: 'white',
//                           boxShadow: 2,
//                           '&:hover': { bgcolor: '#f5f5f5' }
//                         }}
//                       >
//                         <TrendingUp />
//                       </IconButton>
//                     </Box>

//                     <CardMedia component="img" height="200" image={auction.image} alt={auction.name} />
//                     <CardContent>
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 'bold',
//                           mb: 1,
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical',
//                           height: 48
//                         }}
//                       >
//                         {auction.name}
//                       </Typography>

//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           mb: 1,
//                           color: '#FF9800'
//                         }}
//                       >
//                         <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
//                         <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
//                         Còn lại: {auction.timeLeft}
//                         </Typography>
//                       </Box>

//                       <LinearProgress
//                         variant="determinate"
//                         value={auction.percentComplete}
//                         sx={{
//                           mb: 2,
//                           height: 6,
//                           borderRadius: 3,
//                           bgcolor: '#e0e0e0',
//                           '& .MuiLinearProgress-bar': {
//                             bgcolor: '#FF9800'
//                           }
//                         }}
//                       />

//                       <Divider sx={{ mb: 2 }} />

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography variant="body2" color="text.secondary">
//                         Giá khởi điểm:
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                           {formatPrice(auction.startingPrice)}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                         Giá hiện tại:
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
//                           {formatPrice(auction.currentPrice)}
//                         </Typography>
//                       </Box>

//                       <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           bgcolor: '#FF9800',
//                           '&:hover': { bgcolor: '#F57C00' }
//                         }}
//                         startIcon={<Gavel />}
//                       >
//                       Đấu giá ngay
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>
//       </Box>
//     </CustomerLayout>
//   )
// }

// export default CustomerHomePage

import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomerLayout from '~/layouts/CustomerLayout';
import HeroBanner from '~/features/Customer/Home/components/HeroBanner';
import AuctionCategories from '~/features/Customer/Home/components/AuctionCategories';
import FeaturedAuctions from '~/features/Customer/Home/components/FeaturedAuctions';
import OngoingAuctions from '~/features/Customer/Home/components/OngoingAuctions';
import UpcomingAuctions from '~/features/Customer/Home/components/UpcomingAuctions';
import Banner from '~/components/Customer/DefautComponent/BannerComponent/BannerComponent';

function CustomerHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <CustomerLayout isCategory={true}>
      <Box>
        <Banner />
        {/* <HeroBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} /> */}
        {/* <AuctionCategories /> */}
        {/* <FeaturedAuctions /> */}
        <OngoingAuctions />
        <UpcomingAuctions />
      </Box>
    </CustomerLayout>
  );
}

export default CustomerHomePage;
