import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';

const CurrentAuctionItem = ({ items }) => {
  const navigate = useNavigate();
  // Hàm chia nhóm các item cho carousel
  const groupItems = (items, itemsPerGroup) => {
    const groups = items.reduce((result, item, index) => {
      const groupIndex = Math.floor(index / itemsPerGroup);
      if (!result[groupIndex]) {
        result[groupIndex] = [];
      }
      result[groupIndex].push(item);
      return result;
    }, []);

    return groups;
  };

  const handleJoinClick = (item) => {
    navigate(`/session/${item.id}`);
  };

  const groupedItems = groupItems(items, 4);

  return (
    <Carousel
      indicators={true}
      autoPlay={true}
      interval={3000} // Tốc độ chuyển đổi giữa các slide (tính bằng ms)
      navButtonsAlwaysVisible={true}
      swipe={true} // Kích hoạt khả năng trượt bằng cách vuốt
    >
      {groupedItems.map((group, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
          {group.map((item, itemIndex) => (
            <Card
              key={itemIndex}
              sx={{
                width: '23%',
                p: 2,
                textAlign: 'left',
                borderRadius: 2,
                boxShadow: 3,
                borderBottom: 2,
                borderBottomColor: '#B41712',
                position: 'relative',
              }}
            >
              <Typography variant="subtitle2" textAlign="center">
                {item.type}
              </Typography>
              <Typography variant="body2" textAlign="center" fontWeight="bold">
                {item.date} - {item.time}
              </Typography>
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: 250,
                  objectFit: 'cover',
                  marginBottom: 2,
                }}
                alt={item.name}
              />
              <CardContent sx={{ paddingBottom: '16px' }}>
                <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  Starting bid: <span style={{ fontWeight: 'normal' }}>{item.startbid} USD</span>
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#B41712',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#8B0000',
                    },
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 2,
                  }}
                  onClick={() => handleJoinClick(item)}
                >
                  Join the Auction
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Carousel>
  );
};

export default CurrentAuctionItem;
