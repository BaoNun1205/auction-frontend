import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  AccessTime,
  People,
  MonetizationOn,
  Gavel,
  CalendarToday,
  HourglassEmpty,
  Info
} from '@mui/icons-material';
import { useAppStore } from '~/store/appStore';
import { StyledTab, StyledCard, InfoChip, ActionButton } from './style';
import { useGetRegistedSessionByUserId, useUnregisterSession } from '~/hooks/sessionHook';
import { useGetJoinedSessions } from '~/hooks/depositHook';
import { useNavigate } from 'react-router-dom';

const AuctionRegisteredItem = ({ id, auctionName, imgSrc, startTime, endTime, startingPrice, registrants }) => {
  const navigate = useNavigate();
  const { mutate: unregisterSession } = useUnregisterSession();
  const { auth } = useAppStore();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleUnregisterClick = () => {
    unregisterSession(
      { userId: auth.user.id, auctionSessionId: id },
      {
        onSuccess: () => {
          setSnackbar({ open: true, message: 'Hủy đăng ký phiên đấu giá thành công', severity: 'success' });
        },
        onError: (error) => {
          console.error('Error unregistering session:', error);
          setSnackbar({ open: true, message: 'Hủy đăng ký phiên đấu giá thất bại', severity: 'error' });
        },
      }
    );
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 300 }, height: { xs: 200, sm: 'auto' } }}
        image={imgSrc || '/placeholder.svg?height=200&width=200'}
        alt={auctionName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#B7201B', fontWeight: 'bold', mb: 2 }}>
            {auctionName}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <InfoChip icon={<CalendarToday />} label={`Bắt đầu: ${new Date(startTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<HourglassEmpty />} label={`Kết thúc: ${new Date(endTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<People />} label={`Số người đăng ký: ${registrants}`} />
            <InfoChip icon={<MonetizationOn />} label={`Giá khởi điểm: ${startingPrice.toLocaleString('vi-VN')} VNĐ`} color="primary" />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Tooltip title="Xem thông tin chi tiết về phiên đấu giá" onClick={() => navigate(`/session/${id}`)}>
            <IconButton color="primary">
              <Info />
            </IconButton>
          </Tooltip>
          <ActionButton variant="contained" onClick={handleUnregisterClick}>
            Hủy đăng ký
          </ActionButton>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledCard>
  );
};

const AuctionParticipatedItem = ({ id, productName, imgSrc, auctionStartTime, auctionEndTime, participants, startingPrice, winningPrice, auctionHistory }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: { xs: '100%', sm: 300 }, height: { xs: 200, sm: 'auto' } }}
        image={imgSrc || '/placeholder.svg?height=200&width=200'}
        alt={productName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#B7201B', fontWeight: 'bold', mb: 2 }}>
            {productName}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <InfoChip icon={<CalendarToday />} label={`Bắt đầu: ${new Date(auctionStartTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<HourglassEmpty />} label={`Kết thúc: ${new Date(auctionEndTime).toLocaleString('vi-VN')}`} />
            <InfoChip icon={<People />} label={`Số người tham gia: ${participants}`} />
            <InfoChip icon={<MonetizationOn />} label={`Giá khởi điểm: ${startingPrice.toLocaleString('vi-VN')} VNĐ`} color="primary" />
            <InfoChip icon={<Gavel />} label={`Giá đấu thắng: ${winningPrice.toLocaleString('vi-VN')} VNĐ`} color="success" />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <ActionButton onClick={() => navigate(`/session/${id}`)}>
            Xem chi tiết
          </ActionButton>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="auction-history-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="auction-history-dialog-title" sx={{ bgcolor: '#f5f5f5', color: '#B7201B' }}>
          Lịch sử đấu giá: {productName}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <Table aria-label="auction history table">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Người đấu giá</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Giá đấu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auctionHistory.map((historyItem, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { bgcolor: '#fafafa' } }}
                  >
                    <TableCell>{new Date(historyItem.time).toLocaleString('vi-VN')}</TableCell>
                    <TableCell>{historyItem.bidder}</TableCell>
                    <TableCell align="right" sx={{ color: '#B7201B', fontWeight: 'bold' }}>
                      {historyItem.price.toLocaleString('vi-VN')} VNĐ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Button onClick={handleClose} sx={{ color: '#B7201B', fontWeight: 'bold' }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

const AuctionSessions = () => {
  const [tab, setTab] = useState(0);
  const { auth } = useAppStore();
  const { data: registedSessions, isLoading, isError } = useGetRegistedSessionByUserId(auth.user.id);
  const { data: joinedSessions } = useGetJoinedSessions(auth.user.id);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading sessions</Typography>;
  }

  const upcomingSessions = registedSessions.filter(session => session.auctionSession.status === 'UPCOMING');

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Phiên đấu giá
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Lưu trữ các phiên đấu giá đã đăng ký và tham gia
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: '#B7201B'
              }
            }}
          >
            <StyledTab label="Đã đăng ký" />
            <StyledTab label="Đã tham gia" />
          </Tabs>
        </Box>

        <Box>
          {tab === 0 ? (
            <Box>
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((item) => (
                  <AuctionRegisteredItem
                    id={item.auctionSession.auctionSessionId}
                    key={item.auctionSession.auctionSessionId}
                    auctionName={item.auctionSession.name}
                    imgSrc={item.auctionSession.asset?.listImages?.[0]?.imageAsset || '/placeholder.svg?height=200&width=200'}
                    startTime={item.auctionSession.startTime}
                    endTime={item.auctionSession.endTime}
                    startingPrice={item.auctionSession.startingBids}
                    registrants={10} // Default value for registrants
                  />
                ))
              ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  Chưa có phiên đấu giá sắp diễn ra nào được đăng ký.
                </Typography>
              )}
            </Box>
          ) : (
            <Box>
              {joinedSessions.length > 0 ? (
                joinedSessions.map((item) => (
                  <AuctionParticipatedItem
                    id={item.sessionId}
                    key={item.sessionId}
                    productName={item.auctionSession.asset.assetName}
                    imgSrc={item.auctionSession.asset.mainImage || '/placeholder.svg?height=200&width=200'}
                    auctionStartTime={item.auctionSession.startTime}
                    auctionEndTime={item.auctionSession.endTime}
                    participants={10} // Default value for participants
                    startingPrice={item.auctionSession.startingBids}
                    winningPrice={item.auctionSession.asset.assetPrice}
                    auctionHistory={[]} // Replace with actual auction history data
                  />
                ))
              ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  Chưa có phiên đấu giá nào đã tham gia.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AuctionSessions;