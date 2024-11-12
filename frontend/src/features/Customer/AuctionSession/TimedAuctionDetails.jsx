import React, { useState } from "react";
import { Box, Container, Typography, Button, styled, Card, CardMedia, IconButton, Stack, Divider, Paper, Tooltip, Chip } from "@mui/material";
import { FiClock, FiUser, FiHeart, FiShare2 } from "react-icons/fi";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "100%",
  borderRadius: "24px",
  boxShadow: "0 8px 24px rgba(180, 23, 18, 0.12)",
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)"
}));

const ThumbnailImage = styled("img")({
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "scale(1.08)",
    boxShadow: "0 4px 12px rgba(180, 23, 18, 0.15)"
  }
});

const StyledButton = styled(Button)({
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "1.1rem",
  padding: "12px 32px",
  background: "linear-gradient(45deg, #B41712 30%, #d84f4b 90%)",
  boxShadow: "0 4px 16px rgba(180, 23, 18, 0.3)",
  "&:hover": {
    background: "linear-gradient(45deg, #8f1210 30%, #B41712 90%)"
  }
});

const TimedAuctionDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const visibleThumbnails = 3;

  const paintings = [
    {
      id: 1,
      title: "Nature Collection",
      artist: "Elena Rodriguez",
      images: [
        "images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
        "images.unsplash.com/photo-1547891654-e66ed7ebb968",
        "images.unsplash.com/photo-1549289524-06cf8837ace5",
        "images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      ],
      estimatedPrice: "$15,000 - $20,000",
      currentBid: "$16,500",
      bidders: 8,
      timeLeft: "2 days 4 hours",
      description: "A stunning collection of nature-inspired artwork capturing the essence of natural beauty across different seasons and landscapes. Each piece tells its own story while maintaining a cohesive theme throughout the collection."
    }
  ];

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    setSelectedImage((prevSelected) => prevSelected > 0 ? prevSelected - 1 : paintings[0].images.length - 1);
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => 
      Math.min(prevIndex + 1, paintings[0].images.length - visibleThumbnails)
    );
    setSelectedImage((prevSelected) => prevSelected < paintings[0].images.length - 1 ? prevSelected + 1 : 0);
  };

  const visibleImages = paintings[0].images.slice(startIndex, startIndex + visibleThumbnails);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 6 }}>
        <Box sx={{ flex: 1 }}>
          <StyledCard>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={`https://${paintings[0].images[selectedImage]}`}
                alt="Painting"
                sx={{
                  height: { xs: 400, md: 600 },
                  objectFit: "cover",
                  transition: "all 0.3s ease"
                }}
              />
            </Box>
          </StyledCard>
          
          <Stack
            direction="row"
            spacing={2}
            sx={{ overflowX: "hidden", pb: 1, mt: 5, pt: 8 }}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton 
              sx={{ color: "#B41712", opacity: startIndex === 0 ? 0.5 : 1 }}
              onClick={handlePrevClick}
              disabled={startIndex === 0}
            >
              <BsArrowLeftCircle size={28} />
            </IconButton>
            {visibleImages.map((image, index) => (
              <ThumbnailImage
                key={index}
                src={`https://${image}`}
                alt={`Thumbnail ${startIndex + index + 1}`}
                onClick={() => handleThumbnailClick(startIndex + index)}
                sx={{
                  border: selectedImage === (startIndex + index) ? "4px solid #B41712" : "4px solid transparent",
                  opacity: selectedImage === (startIndex + index) ? 1 : 0.7
                }}
              />
            ))}
            <IconButton 
              sx={{ color: "#B41712", opacity: startIndex >= paintings[0].images.length - visibleThumbnails ? 0.5 : 1 }}
              onClick={handleNextClick}
              disabled={startIndex >= paintings[0].images.length - visibleThumbnails}
            >
              <BsArrowRightCircle size={28} />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ pl: 4, borderRadius: "24px", background: "rgba(255, 255, 255, 0.95)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {paintings[0].title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Add to favorites">
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    sx={{ color: isFavorite ? "#B41712" : "inherit" }}
                  >
                    <FiHeart size={24} fill={isFavorite ? "currentColor" : "none"} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton>
                    <FiShare2 size={24} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Typography variant="h6" color="text.secondary">
                by {paintings[0].artist}
              </Typography>
              <Chip label="Verified Artist" sx={{ backgroundColor: "#B41712", color: "white" }} size="small" />
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
                  <FiUser size={20} />
                  <Typography variant="h6">
                    {paintings[0].bidders} bidders
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FiClock size={20} />
                  <Typography variant="h6">
                    {paintings[0].timeLeft} left
                  </Typography>
                </Box>
              </Stack>

              <StyledButton variant="contained" size="large">
                Place Bid Now
              </StyledButton>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default TimedAuctionDetail;