import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Breadcrumbs,
  Chip,
  Divider,
  Grid,
  CardContent,
  Fade,
  Zoom,
  Button,
  Avatar,
  Paper,
  TextField,
  InputAdornment,
  styled,
  Snackbar,
  Alert,
} from '@mui/material';
import { ChevronRight, Lock, LocalShipping, Whatshot, Message } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAppStore } from '~/store/appStore';
import LoginForm from '~/features/Authentication/components/AuthLogin/Login';
import { useNavigate } from 'react-router-dom';
import { StyledCardMedia, StyledCard } from './style';
import { Store } from 'lucide-react';
import { connect, disconnect, subscribe, send } from '~/service/webSocketService';
import { useCreateAuctionHistory } from '~/hooks/auctionHistoryHook';
import { Client } from '@stomp/stompjs';
import AppModal from '~/components/Modal/Modal';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '12px',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(183, 32, 27, 0.3)',
  },
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B7201B',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#B7201B',
  },
}));

const AssetDetail = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { auth } = useAppStore();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(item.asset?.mainImage || "https://via.placeholder.com/400");
  const [highestBid, setHighestBid] = useState(item?.auctionSessionInfo?.highestBid);
  const [totalBidder, setTotalBidder] = useState(item?.auctionSessionInfo?.totalBidder);
  const [totalAuctionHistory, setTotalAuctionHistory] = useState(item?.auctionSessionInfo?.totalAuctionHistory);
  const [bidPrice, setBidPrice] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  let stompClient = useRef(null);
  const { mutate: createAuctionHistory } = useCreateAuctionHistory();
  const depositRate = 0.23;
  const minBidIncrement = item.bidIncrement;

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

  const onMessage = useCallback((message) => {
    console.log('hi')
    console.log('mess: ', message);
    const response = JSON.parse(message.body);
    console.log('res: ', response);
    if (response.code === 200 && response.result) {
      const { auctionSessionInfo } = response.result;
      setTotalBidder(auctionSessionInfo.totalBidder);
      setTotalAuctionHistory(auctionSessionInfo.totalAuctionHistory);
      setHighestBid(auctionSessionInfo.highestBid);
      
      // Display a snackbar notification for the new bid
      setSnackbar({
        open: true,
        message: `New bid: ${auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VND`,
        severity: 'info'
      });
    }
  }, []);

  useEffect(() => {
    const destination = `/rt-product/bidPrice-update/${item.id}`;
    console.log('Destination: ', destination);
    stompClient.current = new Client({
      brokerURL: 'ws://localhost:8080/rt-auction',
      connectHeaders: {
        Authorization: `Bearer ${auth.token}`,
      },
      
      onConnect: () => {
        console.log('Connected to WebSocket');
        stompClient.current.subscribe(
          destination,
          onMessage
        );
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
  
    stompClient.current.activate();
  
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [auth.token, item.id, onMessage]);

  const handleBidPrice = () => {
    if (stompClient.current) {
      stompClient.current.publish({
        destination: `/app/rt-auction/placeBid/${item.id}`
      });
    } else {
      console.error('STOMP client is not connected');
    }
  };



  const currentPrice = item?.auctionSessionInfo?.highestBid || 0;
  const minNextBid = currentPrice + minBidIncrement;

  useEffect(() => {
    setBidPrice(minNextBid.toString());
  }, [minNextBid]);

  const handleBidPriceChange = (e) => {
    const value = e.target.value;
    if (Number(value) < minNextBid) {
      setError(`Giá đặt phải lớn hơn hoặc bằng ${minNextBid.toLocaleString('vi-VN')} VND`);
    } else {
      setError('');
    }
    setBidPrice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(bidPrice) < minNextBid) {
      setError(`Giá đặt phải lớn hơn hoặc bằng ${minNextBid.toLocaleString('vi-VN')} VND`);
      return;
    }
    const auctionHistory = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      bidPrice: Number(bidPrice),
      bidTime: new Date().toISOString(),
    };
    console.log('Submitting auction history:', auctionHistory);
    createAuctionHistory(auctionHistory, {
      onSuccess: () => {
        console.log('Auction history submitted successfully');
        const bidRequest = {
          auctionSessionId: item.id,
          userId: auth.user.id,
          bidPrice: Number(bidPrice),
          bidTime: new Date().toISOString(),
        };
        // if (stompClient && stompClient.connected) {
        //   stompClient.publish({
        //     destination: `/app/rt-auction/join/${item.id}`,
        //     body: JSON.stringify(bidRequest),
        //   });
        //   console.log(`Sent bid request: ${JSON.stringify(bidRequest)}`);
          
        //   // Display a success snackbar
        //   setSnackbar({
        //     open: true,
        //     message: 'Bid placed successfully!',
        //     severity: 'success'
        //   });
        // } else {
        //   console.error('WebSocket is not connected');
        //   setSnackbar({
        //     open: true,
        //     message: 'Error: Could not connect to server',
        //     severity: 'error'
        //   });
        // }
        handleBidPrice();
      },
      onError: (error) => {
        console.error('Error submitting auction history:', error);
        setSnackbar({
          open: true,
          message: 'Error placing bid. Please try again.',
          severity: 'error'
        });
      },
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const deposit = Number(bidPrice) * depositRate;

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
                  {auth.isAuth ? (
                    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Đặt giá
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        Nhập số tiền bạn muốn đặt. Giá cọc là 23% giá trị sản phẩm.
                      </Typography>
                      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: 'left' }}>
                          Giá hiện tại: {currentPrice.toLocaleString('vi-VN')} VND
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, textAlign: 'left' }}>
                          Giá nhỏ nhất tiếp theo: {minNextBid.toLocaleString('vi-VN')} VND
                        </Typography>
                        <StyledTextField
                          fullWidth
                          label="Giá đặt"
                          type="number"
                          value={bidPrice}
                          onChange={handleBidPriceChange}
                          error={!!error}
                          helperText={error}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                          }}
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Giá cọc (23%)</Typography>
                          <Typography>{deposit.toLocaleString('vi-VN')} VND</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                          <Typography>Tổng cộng</Typography>
                          <Typography>{Number(bidPrice).toLocaleString('vi-VN')} VND</Typography>
                        </Box>
                      </Paper>
                      <StyledButton
                        type="submit"
                        fullWidth
                        size="large"
                        sx={{
                          width: '100%',
                          height: '50px',
                        }}
                        disabled={Number(bidPrice) < minNextBid}
                      >
                        Gửi
                      </StyledButton>
                    </Box>
                  ) : (
                    <LoginForm />
                  )}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssetDetail;