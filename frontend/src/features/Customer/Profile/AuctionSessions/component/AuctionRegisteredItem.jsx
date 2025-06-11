import React, { useState } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Tooltip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  People,
  MonetizationOn,
  CalendarToday,
  HourglassEmpty,
  Info
} from '@mui/icons-material';
import { useAppStore } from '~/store/appStore';
import { StyledCard, InfoChip, ActionButton } from '../style';
import { useUnregisterSession } from '~/hooks/sessionHook';
import { useNavigate } from 'react-router-dom';

export const AuctionRegisteredItem = ({ id, auctionName, imgSrc, startTime, endTime, startingPrice, registrants }) => {
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
            <InfoChip icon={<MonetizationOn />} label={`Giá khởi điểm: ${startingPrice.toLocaleString('vi-VN')} ₫`} color="primary" />
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