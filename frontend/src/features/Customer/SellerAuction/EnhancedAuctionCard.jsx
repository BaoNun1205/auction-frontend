import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box, Divider } from '@mui/material';
import { AccessTime, MonetizationOn, Gavel } from '@mui/icons-material';

const EnhancedAuctionCard = ({
  title,
  image,
  startingBid,
  currentBid,
  startTime,
  endTime,
  status
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'info';
      case 'ended':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Chip
            label={status === 'active' ? 'Đang diễn ra' : status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
            color={getStatusColor(status)}
            size="small"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Giá khởi điểm:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(startingBid)}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Giá hiện tại:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>
            {formatCurrency(currentBid)}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Bắt đầu: {formatDate(startTime)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Kết thúc: {formatDate(endTime)}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<Gavel />}
          disabled={status !== 'active'}
          sx={{
            bgcolor: '#b41712',
            '&:hover': {
              bgcolor: '#8B0000'
            },
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled'
            }
          }}
        >
          Đấu giá ngay
        </Button>
      </Box>
    </Card>
  );
};

export default EnhancedAuctionCard;

