import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import splitDateTime from '~/utils/SplitDateTime';
import { StyledCard, StyledCardMedia, StyledCardContent, StyledButton } from './style';

const UpcomingAuctionItem = ({ item }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/session/register/${item.auctionSessionId}`);
  };

  const { date, time } = splitDateTime(item.startTime);

  const formattedDateTime = new Date(item.startTime).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={item.asset.mainImage}
        alt={`${item.asset.assetName} image`}
      />
      <StyledCardContent>
        <Typography variant="subtitle1" color="textPrimary" fontWeight="bold" gutterBottom>
          {item.asset.assetName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Thời gian bắt đầu: {formattedDateTime}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Giá khởi điểm: {item.startingBids.toLocaleString('vi-VN')} ₫
        </Typography>
        <StyledButton onClick={handleRegisterClick}>
          Đăng ký
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );
}

export default UpcomingAuctionItem;