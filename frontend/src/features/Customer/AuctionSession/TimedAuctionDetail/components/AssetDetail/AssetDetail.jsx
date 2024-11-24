import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Breadcrumbs, Link, Chip, Divider, Grid, CardContent, Fade, Zoom, Button, Avatar, Paper } from '@mui/material';
import { ChevronRight, Lock, LocalShipping, Whatshot, Star, AccessTime, Inventory2, Group, Message } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import AppModal from "~/components/Modal/Modal";
import PlaceBidForm from '~/features/Customer/AuctionSession/TimedAuctionDetail/components/AssetDetail/components/PlaceBidForm/PlaceBidForm';
import { useAppStore } from '~/store/appStore';
import LoginForm from '~/features/Authentication/components/AuthLogin/Login';
import { useNavigate } from 'react-router-dom';
import { StyledCardMedia, StyledCard } from './style';
import { Store } from 'lucide-react';
import { connect, disconnect, subscribe } from '~/service/webSocketService';

const AssetDetail = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { auth } = useAppStore();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(item.asset?.mainImage || "https://via.placeholder.com/400");
  const [highestBid, setHighestBid] = useState(item?.auctionSessionInfo?.highestBid);
  const [totalBidder, setTotalBidder] = useState(item?.auctionSessionInfo?.totalBidder);
  const [totalAuctionHistory, setTotalAuctionHistory] = useState(item?.auctionSessionInfo?.totalAuctionHistory);

  const placeholderImage = "https://via.placeholder.com/150";

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const sellerStats = [
    { label: 'Đánh Giá', value: '2,2tr' },
    { label: 'Tỉ Lệ Phản Hồi', value: '100%' },
    { label: 'Sản Phẩm', value: '36,5k' },
    { label: 'Thời Gian Phản Hồi', value: 'trong vài giờ' },
    { label: 'Tham Gia', value: '4 năm trước' },
    { label: 'Người Theo Dõi', value: '3,9tr' }
  ];

  useEffect(() => {
    connect(auth.token);
    subscribe('/rt-product/bidPrice-update', (message) => {
      console.log('socket conneted message', message)
      const { totalBidder, totalAuctionHistory, highestBid } = message;
      setTotalBidder(totalBidder);
      setTotalAuctionHistory(totalAuctionHistory);
      setHighestBid(highestBid);
    });

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Box mb={6}>
      <Breadcrumbs separator={<ChevronRight fontSize="small" />} aria-label="breadcrumb" mb={3}>
        <Typography
          color="inherit"
          onClick={() => handleNavigate('/')}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Trang chủ
        </Typography>
        <Typography
          color="inherit"
          onClick={() => handleNavigate('/art')}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Phiên đấu giá đang diễn ra
        </Typography>
        <Typography color="text.primary">Chi tiết</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Card elevation={3}>
              <StyledCardMedia
                component="img"
                height="400"
                image={mainImage}
                alt="European School, Floral Still Life"
              />
            </Card>
          </Zoom>
          <Grid container spacing={2} mt={2}>
            {item.asset?.listImages.slice(0, 4).map((image, i) => (
              <Grid item xs={3} key={i}>
                <Fade in={true} style={{ transitionDelay: `${i * 100}ms` }}>
                  <StyledCard 
                    onClick={() => handleThumbnailClick(image.imageAsset || placeholderImage)}
                  >
                    <StyledCardMedia
                      component="img"
                      height="100"
                      image={image.imageAsset || placeholderImage}
                      alt={`Thumbnail ${i}`}
                    />
                  </StyledCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            {item.asset.assetName}
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Giá khởi điểm: {item.startingBids} VND
            </Typography>
            {(() => {
              return (
                <Typography variant="subtitle1" color="text.secondary">
                  {item.endTime.toLocaleString('vi-VN')}
                </Typography>
              );
            })()}
          </Box>

          <Fade in={true} style={{ transitionDelay: '500ms' }}>
            <Card elevation={3} sx={{ bgcolor: 'background.default', mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2">Giá hiện tại ({totalAuctionHistory} lượt)</Typography>
                  <Chip
                    icon={<Lock fontSize="small" />}
                    label="SECURE"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {highestBid.toLocaleString('vi-VN')} VND
                </Typography>
                <AppModal trigger={
                  <Button
                  variant="contained"
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    bgcolor: '#b41712',
                    color: 'white',
                    px: 4,
                    '&:hover': {
                      bgcolor: '#8B0000',
                      transform: 'translateY(-3px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Đặt giá
                </Button>
                }>
                  {auth.isAuth ? <PlaceBidForm item={item}/> : <LoginForm />}
                </AppModal>
                <Box display="flex" alignItems="center" mt={2}>
                  <Whatshot color="error" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {totalBidder} người tham gia
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
          <Divider />

          <Box display="flex" alignItems="center" mt={3}>
            <LocalShipping color="action" />
            <Typography variant="body2" color="text.secondary" ml={1}>
              Xem chính sách vận chuyển
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      }}
    >
      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
        <Box display="flex" alignItems="flex-start" gap={3}>
          <Box position="relative">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                bgcolor: '#f5f5f5',
                color: '#757575',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              L
            </Avatar>
            <Box
              component="img"
              src="/shopee-mall-badge.png"
              alt="Shopee Mall"
              sx={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                height: 24,
                zIndex: 1,
              }}
            />
          </Box>
          <Box flex={1}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              LOVITO OFFICIAL STORE
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Online 9 Phút Trước
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Message />}
                sx={{
                  bgcolor: '#b41712',
                  color: 'white',
                  px: 3,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#8B0000',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                CHAT
              </Button>
              <Button
                variant="outlined"
                startIcon={<Store />}
                sx={{
                  borderColor: 'rgba(0,0,0,0.12)',
                  color: 'text.primary',
                  px: 3,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'rgba(0,0,0,0.24)',
                    bgcolor: 'rgba(0,0,0,0.04)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                XEM
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          sx={{
            '& > div': {
              borderLeft: '1px solid',
              borderColor: 'divider',
              '&:nth-of-type(3n+1)': {
                borderLeft: 'none',
              },
              '@media (max-width: 600px)': {
                '&:nth-of-type(2n+1)': {
                  borderLeft: 'none',
                },
              },
            },
          }}
        >
          {sellerStats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 calc(33.333% - 16px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {stat.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: stat.isHighlighted ? '#ee4d2d' : 'text.primary',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>

      <Typography variant="h5" gutterBottom>
        Thông tin chi tiết
      </Typography>
      <Typography variant="h6" gutterBottom>
        Mô tả
      </Typography>
      <Typography paragraph dangerouslySetInnerHTML={{ __html: item.description }} />
      <Typography variant="h6" gutterBottom>
        Thông tin giá cọc
      </Typography>
      <Typography>25%</Typography>
    </Box>
  );
};

export default AssetDetail;