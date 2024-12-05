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
        <Typography variant="body2" color="textSecondary">Thời gian bắt đầu: {item.startTime}</Typography>
        <Typography variant="body2" color="textSecondary">Giá khởi điểm: {item.startingBids}</Typography>
        <StyledButton onClick={handleRegisterClick}>
          Đăng ký
        </StyledButton>
      </StyledCardContent>
    </StyledCard>
  );
}

export default UpcomingAuctionItem;