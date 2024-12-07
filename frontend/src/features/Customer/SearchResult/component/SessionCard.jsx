import React from 'react';
import {
  Typography,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { StyledCard, StyledCardMedia, StatusChip, AnimatedButton } from '../style';

const SessionCard = ({ session, navigate }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(',', '');
  };

  const handleCardClick = () => {
    if (session.status === 'UPCOMING') {
      navigate(`/session/register/${session.auctionSessionId}`);
    } else {
      navigate(`/session/${session.auctionSessionId}`);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'UPCOMING':
        return 'Sắp diễn ra';
      case 'ONGOING':
        return 'Đang diễn ra';
      case 'AUCTION_SUCCESS':
        return 'Đấu giá thành công';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'UPCOMING':
        return 'info';
      case 'ONGOING':
        return 'warning';
      case 'AUCTION_SUCCESS':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <StyledCard
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleCardClick}
    >
      <StatusChip
        label={getStatusLabel(session.status)}
        color={getStatusColor(session.status)}
      />
      <StyledCardMedia
        image={session.asset.mainImage}
        title={session.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="subtitle1" 
          component="h2"
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {session.name}
        </Typography>
        <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
          Giá khởi điểm: {session.startingBids.toLocaleString('vi-VN')} ₫
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 'small', color: 'text.secondary', mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            {formatDate(session.startTime)} - {formatDate(session.endTime)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <AnimatedButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {session.status === 'UPCOMING' ? 'Đăng ký' : 'Xem chi tiết'}
        </AnimatedButton>
      </CardActions>
    </StyledCard>
  );
};

export default SessionCard;

