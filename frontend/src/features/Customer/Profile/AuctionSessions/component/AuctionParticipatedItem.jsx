import React, { useState } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  CardContent
} from '@mui/material';
import {
  People,
  MonetizationOn,
  Gavel,
  CalendarToday,
  HourglassEmpty,
} from '@mui/icons-material';
import { StyledCard, InfoChip, ActionButton } from '../style';
import { useNavigate } from 'react-router-dom';

export const AuctionParticipatedItem = ({ id, productName, imgSrc, auctionStartTime, auctionEndTime, participants, startingPrice, winningPrice }) => {
  const navigate = useNavigate();

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
            <InfoChip icon={<MonetizationOn />} label={`Giá khởi điểm: ${startingPrice.toLocaleString('vi-VN')} ₫`} color="primary" />
            <InfoChip icon={<Gavel />} label={`Giá đấu thắng: ${winningPrice.toLocaleString('vi-VN')} ₫`} color="success" />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <ActionButton onClick={() => navigate(`/session/${id}`)}>
            Xem chi tiết
          </ActionButton>
        </Box>
      </Box>
    </StyledCard>
  );
};