import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import splitDateTime from '~/utils/SplitDateTime';

const UpcomingAuctionCard = ({ product }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/session/${product.auctionSessionId}`);
  };

  const { date: fromDate, time: fromTime } = splitDateTime(product.startTime)
  const { date: toDate, time: toTime } = splitDateTime(product.endTime)

  return (
    <Card sx={{ maxWidth: 445, margin: 'auto', mt: 5 }}>
      <Grid container>
        <Grid item xs={5}>
          <Box sx={{ display: 'flex', height: '100%' }}>
            <CardMedia
              component="img"
              height="100%"
              image={product.image}
              alt="Auction image"
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            {/* <Typography variant="h5" component="div">
              Auction session date {product.}
            </Typography> */}
            <Typography variant="subtitle1" color="textPrimary" fontWeight="bold" gutterBottom>
              {product.auctionName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start time: {fromDate}, {fromTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End time: {toDate}, {toTime}
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleRegisterClick}>
              Register
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UpcomingAuctionCard;
