import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Tooltip,
  Chip,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { StyledCard, ThumbnailImage, StyledButton, StyledIconButton } from './style';

const RegisterAuctionDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const paintings = [
    {
      id: 1,
      title: "Ethereal Whispers",
      artist: "Aria Moonstone",
      images: [
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1549289524-06cf8837ace5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
      ],
      estimatedPrice: "$18,000 - $25,000",
      currentBid: "$19,500",
      bidders: 12,
      timeLeft: "1 day 6 hours",
      description: "A mesmerizing collection that blends surrealism and nature, 'Ethereal Whispers' invites viewers into a dreamlike realm where reality and imagination intertwine. Each piece is a window into a world where flora and fauna take on mystical qualities, evoking a sense of wonder and introspection.",
    },
  ];

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handlePrevClick = () => {
    setSelectedImage((prevSelected) =>
      prevSelected > 0 ? prevSelected - 1 : paintings[0].images.length - 1
    );
  };

  const handleNextClick = () => {
    setSelectedImage((prevSelected) =>
      prevSelected < paintings[0].images.length - 1 ? prevSelected + 1 : 0
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Box
              component="img"
              src={paintings[0].images[selectedImage]}
              alt={`${paintings[0].title} - Image ${selectedImage + 1}`}
              sx={{
                width: '100%',
                height: { xs: 400, md: 600 },
                objectFit: 'cover',
                transition: 'all 0.3s ease',
              }}
            />
          </StyledCard>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4 }}
            alignItems="center"
            justifyContent="center"
          >
            <StyledIconButton onClick={handlePrevClick} aria-label="Previous image">
              <ArrowBackIosNewIcon />
            </StyledIconButton>
            {paintings[0].images.map((image, index) => (
              <ThumbnailImage
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
                selected={selectedImage === index}
                aria-label={`Select image ${index + 1}`}
              />
            ))}
            <StyledIconButton onClick={handleNextClick} aria-label="Next image">
              <ArrowForwardIosIcon />
            </StyledIconButton>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ pl: { md: 4 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {paintings[0].title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    sx={{ color: isFavorite ? "#B41712" : "inherit" }}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Typography variant="h6" color="text.secondary">
                by {paintings[0].artist}
              </Typography>
              <Chip
                label="Verified Artist"
                sx={{ backgroundColor: "#B41712", color: "white" }}
                size="small"
              />
            </Stack>

            <Typography variant="body1" color="text.secondary" paragraph>
              {paintings[0].description}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Estimated Price
                </Typography>
                <Typography variant="h5" fontWeight="medium">
                  {paintings[0].estimatedPrice}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Current Bid
                </Typography>
                <Typography variant="h4" sx={{ color: "#B41712" }} fontWeight="bold">
                  {paintings[0].currentBid}
                </Typography>
              </Box>

              <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon />
                  <Typography variant="h6">{paintings[0].bidders} bidders</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon />
                  <Typography variant="h6">{paintings[0].timeLeft} left</Typography>
                </Box>
              </Stack>

              <StyledButton>Đăng ký đấu giá</StyledButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterAuctionDetail;

