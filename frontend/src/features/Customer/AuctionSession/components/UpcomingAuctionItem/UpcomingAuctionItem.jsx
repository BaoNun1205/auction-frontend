import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import splitDateTime from '~/utils/SplitDateTime';

const UpcomingAuctionItem = ({ item }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/session/register/${item.auctionSessionId}`);
  };

  const { date, time } = splitDateTime(item.startTime);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 140, height: 140, borderRadius: 1, mt: 1 }}
        image={item.asset.mainImage}
        alt={`${item.asset.assetName} image`}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
        <Typography variant="subtitle1" color="textPrimary" fontWeight="bold" gutterBottom>
          {item.asset.assetName}
        </Typography>
        <Typography variant="body2" color="textSecondary">Start Date: <b>{date}</b></Typography>
        <Typography variant="body2" color="textSecondary">End Date: <b>{time}</b></Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#B7201B',
            color: 'white',
            textTransform: 'none',
            fontWeight: 'bold',
            mt: 1,
            '&:hover': {
              backgroundColor: '#8B0000',
            },
          }}
          onClick={() => handleRegisterClick(1)}          
        >
          Đăng ký
        </Button>
      </CardContent>
    </Card>
  );
}

export default UpcomingAuctionItem;