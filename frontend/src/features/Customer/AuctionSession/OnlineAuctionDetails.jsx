import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, styled } from "@mui/material";
import { keyframes } from "@mui/system";

const slideImages = [
  "images.unsplash.com/photo-1682687220063-4742bd7c7787",
  "images.unsplash.com/photo-1682687221038-404669775a55",
  "images.unsplash.com/photo-1682687221080-5cb261c645cb"
];

const slideAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  // Remove maxWidth for full width
  maxWidth: 'none',
  width: '100%', // Ensure it stretches to full width
  margin: 'auto',
}));

const ImageContainer = styled(Box)({
  height: 300,
  position: "relative",
  overflow: "hidden"
});

const SlideImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  animation: `${slideAnimation} 1s ease-in-out`,
  position: "absolute"
});

const ContentContainer = styled(CardContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(2)
  }
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  color: "white",
  height: 48,
  padding: "0 30px",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)"
  }
}));

const TimerText = styled(Typography)({
  fontWeight: "bold",
  color: "#FF4081",
  animation: "pulse 1s infinite"
});

const OnlineAuctionDetails = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box sx={{ mt: 5 }}> 
      <StyledCard>
        <ImageContainer>
          <SlideImage
            src={`https://${slideImages[currentSlide]}`}
            alt={`Slide ${currentSlide + 1}`}
            loading="lazy"
          />
        </ImageContainer>
        <ContentContainer>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography variant="h5" gutterBottom>
              Special Event Registration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join our exclusive event and unlock amazing opportunities! Register now to secure your spot and gain access to premium content, networking sessions, and much more.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TimerText variant="h6" gutterBottom>
              {formatTime(timeLeft)}
            </TimerText>
            <RegisterButton
              variant="contained"
              size="large"
              aria-label="Register for the event"
            >
              Register Now
            </RegisterButton>
          </Box>
        </ContentContainer>
      </StyledCard>
    </Box>
  );
};

export default OnlineAuctionDetails;