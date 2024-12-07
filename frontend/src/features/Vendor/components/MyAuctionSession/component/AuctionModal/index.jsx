import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CardMedia, IconButton, Grid, Paper,
  useMediaQuery, Divider, List, ListItem, ListItemText,
  ListItemAvatar, Avatar, Button
} from '@mui/material';
import {
  Close, AccessTime, EmojiEvents, Person,
  Gavel, ArrowBackIos, ArrowForwardIos
} from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook';
import { theme, StyledModal, ModalContent, InfoChip } from './style';
import { useGetSessionById } from '~/hooks/sessionHook';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Box sx={{ position: 'relative', width: 300, height: 300, mb: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={images[currentIndex].imageAsset || '/placeholder.svg?height=300&width=300'}
        alt={`Image ${currentIndex + 1}`}
        sx={{ borderRadius: 2, objectFit: 'cover' }}
      />
      <IconButton
        sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handlePrev}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handleNext}
      >
        <ArrowForwardIos />
      </IconButton>
      <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)' }}>
        <Typography variant="caption" sx={{ bgcolor: 'rgba(0, 0, 0, 0.6)', color: 'white', px: 1, py: 0.5, borderRadius: 1 }}>
          {currentIndex + 1} / {images.length}
        </Typography>
      </Box>
    </Box>
  );
};

const AuctionModal = ({ open, handleClose, item }) => {
  console.log('item', item);
  console.log('open', open);
  const [localOpen, setLocalOpen] = useState(open);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session } = useGetSessionById(item?.auctionSessionId);
  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(item?.auctionSessionId);

  useEffect(() => {
    setLocalOpen(open);
    console.log('Modal open state:', open);
  }, [open]);

  useEffect(() => {
    if (item) {
      console.log('Modal item:', item);
    }
  }, [item]);

  const auctionHistories = Array.isArray(data) ? data : [];
  const images = Array.isArray(session?.asset?.listImages) ? session.asset.listImages : [session?.asset?.mainImage];

  if (!item) return null;

  return (
    <ThemeProvider theme={theme}>
      <StyledModal
        open={localOpen}
        onClose={handleClose}
        aria-labelledby="auction-details-modal"
      >
        <ModalContent elevation={24}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2" color="primary" fontWeight="bold">
              Thông tin phiên đấu giá
            </Typography>
            <IconButton onClick={handleClose} size="large" edge="end">
              <Close />
            </IconButton>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ImageCarousel images={images} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {item.name}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Giá khởi điểm:
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {item.startingBids.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Giá cọc:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {item.depositAmount.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Bước nhảy:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {item.bidIncrement.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AccessTime color="action" />
                <Typography variant="body2" color="text.secondary">
                  Kết thúc: {new Date(item.endTime).toLocaleString('vi-VN')}
                </Typography>
              </Box>
              <InfoChip icon={<EmojiEvents />} label="Đã kết thúc" />
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Người thắng cuộc
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.auctionSessionInfo.user.name || item.auctionSessionInfo.user.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thời gian: {new Date(item.endTime).toLocaleString('vi-VN')}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Gavel color="primary" />
                  <Typography variant="body1" fontWeight="bold">
                    Giá thắng: {item.auctionSessionInfo.highestBid.toLocaleString('vi-VN')} VNĐ
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, maxHeight: 300, overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Lịch sử đấu giá
                </Typography>
                <List>
                  {auctionHistories.map((bid, index) => (
                    <React.Fragment key={bid.id}>
                      <ListItem alignItems="flex-start" disableGutters>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: index === 0 ? 'primary.main' : 'grey.400' }}>
                            {bid.user.name?.charAt(0) || bid.user.username[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" fontWeight="bold">
                              {bid.user.name || bid.user.username}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography variant="body2" color="text.secondary" component="span">
                                {new Date(bid.bidTime).toLocaleString('vi-VN')}
                              </Typography>
                              <Typography variant="body2" color="primary" fontWeight="bold" component="div">
                                {bid.bidPrice.toLocaleString('vi-VN')} VNĐ
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index < auctionHistories.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Thông tin phiên
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              paragraph 
              dangerouslySetInnerHTML={{ __html: item.description || 'Không có thông tin chi tiết.' }} 
            />
          </Box>
        </ModalContent>
      </StyledModal>
    </ThemeProvider>
  );
};

export default AuctionModal;
