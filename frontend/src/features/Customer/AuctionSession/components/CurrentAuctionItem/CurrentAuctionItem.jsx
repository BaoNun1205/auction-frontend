import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { TruncatedTypography, StyledCard, StyledCardMedia, StyledCardContent, StyledButton, StyledBox } from './style';

export default function Component({ items = [] }) {
  const navigate = useNavigate();

  const groupItems = (items, itemsPerGroup) => {
    return items.reduce((result, item, index) => {
      const groupIndex = Math.floor(index / itemsPerGroup);
      if (!result[groupIndex]) {
        result[groupIndex] = [];
      }
      result[groupIndex].push(item);
      return result;
    }, []);
  };

  const handleJoinClick = (item) => {
    navigate(`/session/${item.auctionSessionId}`);
  };

  const groupedItems = groupItems(items, 4);

  return (
    <Carousel
      indicators={true}
      autoPlay={true}
      interval={3000}
      navButtonsAlwaysVisible={true}
      swipe={true}
    >
      {groupedItems.map((group, index) => (
        <StyledBox key={index}>
          {group.map((item, itemIndex) => {
            const formattedDateTime = new Date(item.endTime).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            });
            return (
              <StyledCard key={itemIndex}>
                <Typography variant="body2" textAlign="center" fontWeight="bold">
                  {formattedDateTime}
                </Typography>
                <StyledCardMedia
                  component="img"
                  alt={item.name}
                  image={item.asset.mainImage || '/placeholder.svg?height=250&width=250'}
                />
                <StyledCardContent>
                  <TruncatedTypography variant="h6" component="div" textAlign="center" fontWeight="bold" mb={2}>
                    {item.name}
                  </TruncatedTypography>
                  <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                    Giá khởi điểm: {item.startingBids.toLocaleString('vi-VN')} ₫
                  </Typography>
                  <StyledButton onClick={() => handleJoinClick(item)}>
                    Tham gia
                  </StyledButton>
                </StyledCardContent>
              </StyledCard>
            );
          })}
        </StyledBox>
      ))}
    </Carousel>
  );
}