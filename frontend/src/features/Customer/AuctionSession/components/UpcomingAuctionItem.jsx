import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const UpcomingAuctionItem = ({ auctionName, startDate, endDate, imgSrc }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 160, height: 160, borderRadius: 1 }}
        image={imgSrc}
        alt={`${auctionName} image`}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
        <Typography variant="subtitle1" color="textPrimary" fontWeight="bold" gutterBottom>
          {auctionName}
        </Typography>
        <Typography variant="body2" color="textSecondary">Start Date: <b>{startDate}</b></Typography>
        <Typography variant="body2" color="textSecondary">End Date: <b>{endDate}</b></Typography>
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
        >
          Register
        </Button>
      </CardContent>
    </Card>
  );
}

export default UpcomingAuctionItem;