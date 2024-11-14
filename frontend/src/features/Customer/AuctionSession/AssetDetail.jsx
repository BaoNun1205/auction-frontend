import React from 'react';
import { Button, Box, Typography, Divider, Grid, Card, CardMedia, CardContent, Link as MuiLink } from '@mui/material';
import { FaUserLock } from 'react-icons/fa6';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { RiFireFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function AssetDetail() {
  const flower = "./../src/assets/images/flower.png";
  return (
    <Box>
      <Box display="flex" alignItems="center" m={2}>
        <IoMdArrowDropleft />
        <Typography variant="h6">Home / Art</Typography>
        <IoMdArrowDropright />
        <Typography variant="h6">Paintings</Typography>
      </Box>

      <Box fontFamily="sans-serif" bgcolor="white">
        <Box p={2} maxWidth="xl" mx="auto" display="flex" gap={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia component="img" image={flower} alt="" sx={{ height: 128 }} />
              </Card>
              <Card>
                <CardMedia component="img" image={flower} alt="" sx={{ height: 128 }} />
              </Card>
              <Card>
                <CardMedia component="img" image={flower} alt="" sx={{ height: 128 }} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Card>
                <CardMedia component="img" image={flower} alt="" sx={{ height: 384 }} />
              </Card>
            </Grid>
          </Grid>

          <Box flex={1}>
            <Typography variant="h4" mb={2}>European School, Floral Still Life</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Estimate $50-$100</Typography>
              <Typography variant="h6">Jul 02, 2024 11:00 PM GMT+7</Typography>
            </Box>
            <Box border={1} borderRadius={1} bgcolor="rose.50" mt={2} p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Current Price (1 bid)</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography>SECURE</Typography>
                  <FaUserLock />
                </Box>
              </Box>
              <Typography variant="h5" mt={1}><b>$30</b></Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>PLACE BID</Button>
              <Box display="flex" alignItems="center" mt={2}>
                <RiFireFill color="primary" />
                <Typography ml={1}>41 bidders are watching this item.</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography>Get approved to bid.</Typography>
              <MuiLink component={Link} to="" color="primary" ml={1}>Register for Auction</MuiLink>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center">
              <MdOutlineLocalShipping color="primary" />
              <Typography ml={1}>See Policy for Shipping</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4, mx: 'auto', width: '80%' }} />
        <Box p={2} maxWidth="xl" mx="auto">
          <Typography variant="h5" mb={2} color="textSecondary">Item Details</Typography>
          <Typography variant="h6" color="textSecondary">Description</Typography>
          <Typography>European, 19th century oil on canvas depicting a floral still life of red, white, blue and yellow flowers, signed "MB" l.r., 25 1/2" x 21 1/4" canvas, 31" x 26 1/2" framed.</Typography>
          <Typography variant="h6" color="textSecondary" mt={2}>Condition</Typography>
          <Typography>Heavy wear, losses, later painting, and puncture to the lower right.</Typography>
          <Typography variant="h6" color="textSecondary" mt={2}>Buyer's Premium</Typography>
          <Typography>25%</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AssetDetail;