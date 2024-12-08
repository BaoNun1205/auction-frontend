import React from 'react';
import { CardMedia, CardContent, Typography, Box, Tooltip, IconButton } from '@mui/material';
import { CalendarToday, HourglassEmpty, People, MonetizationOn, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StyledCard, InfoChip } from '../style';

const AuctionRegisteredItem = ({ auctionSessionId, auctionName, imgSrc, startTime, endTime, startingPrice, registrants }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/session/${auctionSessionId}`);
  };

  return (
    <StyledCard onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
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
      </Box>
    </StyledCard>
  );
};

export default AuctionRegisteredItem;