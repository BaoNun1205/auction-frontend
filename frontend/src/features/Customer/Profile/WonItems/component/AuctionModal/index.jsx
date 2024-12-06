import React from 'react';
import {
  Box, Typography, CardMedia, IconButton, Modal, Grid, Paper,
  useMediaQuery, Divider, List, ListItem, ListItemText,
  ListItemAvatar, Avatar, Chip
} from '@mui/material';
import {
  Close, AccessTime, MonetizationOn, EmojiEvents, Person,
  Gavel
} from '@mui/icons-material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { useGetAuctionHistoriesByAuctionSessionId } from '~/hooks/auctionHistoryHook';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b41712',
    },
  },
});

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  maxWidth: 800,
  maxHeight: '90vh',
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    borderRadius: 0,
  },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

const AuctionModal = ({ open, handleClose, item }) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, refetch: refreshHistory } = useGetAuctionHistoriesByAuctionSessionId(item?.auctionSession?.auctionSessionId);
  console.log(item?.auctionSession?.auctionSessionId);
  const auctionHistories = Array.isArray(data) ? data : []

  if (!item) return null;

  const biddingHistory = [
    { id: 1, name: 'Nguyễn Văn A', time: '2023-06-10T14:00:00', price: 5000000 },
    { id: 2, name: 'Trần Thị B', time: '2023-06-10T14:15:00', price: 5500000 },
    { id: 3, name: 'Lê Văn C', time: '2023-06-10T14:30:00', price: 6000000 },
    { id: 4, name: 'Phạm Thị D', time: '2023-06-10T14:45:00', price: 6500000 },
    { id: 5, name: 'Hoàng Văn E', time: '2023-06-10T15:00:00', price: 7000000 },
  ];

  const winner = biddingHistory[biddingHistory.length - 1];

  return (
    <ThemeProvider theme={theme}>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="auction-details-modal"
      >
        <ModalContent elevation={24}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2" color="primary" fontWeight="bold">
              Chi tiết phiên đấu giá
            </Typography>
            <IconButton onClick={handleClose} size="large" edge="end">
              <Close />
            </IconButton>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="300"
                image={item.auctionSession.asset.mainImage || '/placeholder.svg?height=300&width=300'}
                alt={item.auctionSession.asset.assetName}
                sx={{ borderRadius: 2, objectFit: 'cover', mb: 2 }}
              />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {item.auctionSession.asset.assetName}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Giá khởi điểm:
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {item.auctionSession.startingBids.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Giá cọc:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {item.auctionSession.depositAmount.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Bước nhảy:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {item.auctionSession.bidIncrement.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AccessTime color="action" />
                <Typography variant="body2" color="text.secondary">
                  Kết thúc: {new Date(item.auctionSession.endTime).toLocaleString('vi-VN')}
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
                      {item.user.name || item.user.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thời gian: {new Date(item.victoryTime).toLocaleString('vi-VN')}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Gavel color="primary" />
                  <Typography variant="body1" fontWeight="bold">
                    Giá thắng: {item.price.toLocaleString('vi-VN')} VNĐ
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
                            {bid.user.name}
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
                      {index < biddingHistory.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Thông tin vật phẩm
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              paragraph 
              dangerouslySetInnerHTML={{ __html: item.auctionSession.asset.assetDescription || 'Không có thông tin chi tiết.' }} 
            />
          </Box>
        </ModalContent>
      </StyledModal>
    </ThemeProvider>
  );
};

export default AuctionModal;

