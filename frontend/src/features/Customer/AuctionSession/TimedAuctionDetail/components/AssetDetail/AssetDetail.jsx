import React from 'react';
import { Box, Typography, Card, CardMedia, Breadcrumbs, Link, Chip, Divider, Button, Grid, CardContent } from '@mui/material';
import { ChevronRight, Lock, LocalShipping, Whatshot } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import AppModal from "~/components/Modal/Modal";
import PlaceBidForm from '~/components/Form/PlaceBidForm/PlaceBidForm';
import { useAppStore } from '~/store/appStore';
import LoginForm from '~/features/Authentication/components/AuthLogin/Login';

const AssetDetail = ({ item }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { auth } = useAppStore()
  
    return (
      <Box mb={6}>
        <Breadcrumbs separator={<ChevronRight fontSize="small" />} aria-label="breadcrumb" mb={3}>
          <Link color="inherit" href="/" underline="hover">
            Home
          </Link>
          <Link color="inherit" href="/art" underline="hover">
            Art
          </Link>
          <Typography color="text.primary">Paintings</Typography>
        </Breadcrumbs>
  
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image="https://source.unsplash.com/random/800x600?painting,floral"
                alt="European School, Floral Still Life"
              />
            </Card>
            <Grid container spacing={2} mt={2}>
              {[1, 2, 3].map((i) => (
                <Grid item xs={4} key={i}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="100"
                      image={`https://source.unsplash.com/random/400x300?painting,floral${i}`}
                      alt={`Thumbnail ${i}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
  
          <Grid item xs={12} md={5}>
            <Typography variant="h4" component="h1" gutterBottom>
              {item.asset.assetName}
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="subtitle1" color="text.secondary">
                Estimate $50-$100
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Jul 02, 2024 11:00 PM GMT+7
              </Typography>
            </Box>
  
            <Card elevation={3} sx={{ bgcolor: 'background.default', mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2">Current Price (1 bid)</Typography>
                  <Chip
                    icon={<Lock fontSize="small" />}
                    label="SECURE"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                  $30
                </Typography>
                <AppModal trigger={
                  <Button variant="contained" color="primary" fullWidth size="large">
                    PLACE BID
                  </Button>
                }>
                  {auth.isAuth ? <PlaceBidForm item={item}/> : <LoginForm />}
                </AppModal>
                {/* <Button variant="contained" color="primary" fullWidth size="large">
                  PLACE BID
                </Button> */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Whatshot color="error" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    15 active bidders | 41 watching
                  </Typography>
                </Box>
              </CardContent>
            </Card>
  
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="body2">Get approved to bid.</Typography>
              <Link href="/register" color="primary" ml={1}>
                Register for Auction
              </Link>
            </Box>
  
            <Divider />
  
            <Box display="flex" alignItems="center" mt={3}>
              <LocalShipping color="action" />
              <Typography variant="body2" color="text.secondary" ml={1}>
                See Policy for Shipping
              </Typography>
            </Box>
          </Grid>
        </Grid>
  
        <Divider sx={{ my: 6 }} />
  
        <Typography variant="h5" gutterBottom>
          Item Details
        </Typography>
        <Typography variant="h6" gutterBottom>
        Description
        </Typography>
        <Typography paragraph dangerouslySetInnerHTML={{ __html: item.asset.assetDescription }} />
        <Typography variant="h6" gutterBottom>
          Buyer's Premium
        </Typography>
        <Typography>25%</Typography>
      </Box>
    );
  };

export default AssetDetail;