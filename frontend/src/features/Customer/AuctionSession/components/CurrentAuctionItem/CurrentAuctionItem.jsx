import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { TruncatedTypography, StyledCard, StyledCardMedia, StyledCardContent, StyledButton, StyledBox } from './style';
import splitDateTime from '~/utils/SplitDateTime';

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
            const { date, time } = splitDateTime(item.endTime);
            return (
              <StyledCard key={itemIndex}>
                <Typography variant="subtitle2" textAlign="center">
                  {item.typeSession}
                </Typography>
                <Typography variant="body2" textAlign="center" fontWeight="bold">
                  {date} - {time}
                </Typography>
                <StyledCardMedia
                  component="img"
                  alt={item.name}
                  image={item.asset.imageUrl || '/placeholder.svg?height=250&width=250'}
                />
                <StyledCardContent>
                  <TruncatedTypography variant="h6" component="div" textAlign="center" fontWeight="bold" mb={2}>
                    {item.asset.assetName}
                  </TruncatedTypography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Giá khởi điểm: <span style={{ fontWeight: 'normal' }}>{item.startingBids} VND</span>
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