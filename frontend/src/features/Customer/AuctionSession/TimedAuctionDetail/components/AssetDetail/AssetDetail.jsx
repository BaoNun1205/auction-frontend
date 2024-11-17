import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, Breadcrumbs, Link, Chip, Divider, Button, Grid, CardContent, Fade, Zoom } from '@mui/material';
import { ChevronRight, Lock, LocalShipping, Whatshot } from '@mui/icons-material';
import { useTheme, useMediaQuery, styled } from '@mui/material';
import AppModal from "~/components/Modal/Modal";
import PlaceBidForm from '~/components/Form/PlaceBidForm/PlaceBidForm';
import { useAppStore } from '~/store/appStore';
import LoginForm from '~/features/Authentication/components/AuthLogin/Login';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PlaceBidButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const AssetDetail = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { auth } = useAppStore();
  const [mainImage, setMainImage] = useState(item?.listImage[0]?.imageAsset || "https://via.placeholder.com/400");

  const placeholderImage = "https://via.placeholder.com/150";

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

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
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Card elevation={3}>
              <StyledCardMedia
                component="img"
                height="400"
                image={mainImage}
                alt="European School, Floral Still Life"
              />
            </Card>
          </Zoom>
          <Grid container spacing={2} mt={2}>
            {item.listImage.slice(0, 4).map((image, i) => (
              <Grid item xs={3} key={i}>
                <Fade in={true} style={{ transitionDelay: `${i * 100}ms` }}>
                  <Card 
                    onClick={() => handleThumbnailClick(image.imageAsset || placeholderImage)}
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[5],
                      },
                    }}
                  >
                    <StyledCardMedia
                      component="img"
                      height="100"
                      image={image.imageAsset || placeholderImage}
                      alt={`Thumbnail ${i}`}
                    />
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            {item.assetName}
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Estimate $50-$100
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Jul 02, 2024 11:00 PM GMT+7
            </Typography>
          </Box>

          <Fade in={true} style={{ transitionDelay: '500ms' }}>
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
                  <PlaceBidButton variant="contained" color="primary" fullWidth size="large">
                    PLACE BID
                  </PlaceBidButton>
                }>
                  {auth.isAuth ? <PlaceBidForm item={item}/> : <LoginForm />}
                </AppModal>
                <Box display="flex" alignItems="center" mt={2}>
                  <Whatshot color="error" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    15 active bidders | 41 watching
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>

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
      <Typography paragraph dangerouslySetInnerHTML={{ __html: item.description }} />
      <Typography variant="h6" gutterBottom>
        Buyer's Premium
      </Typography>
      <Typography>25%</Typography>
    </Box>
  );
};

export default AssetDetail;