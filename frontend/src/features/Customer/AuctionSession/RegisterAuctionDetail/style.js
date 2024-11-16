import { styled } from '@mui/material/styles';
import { Card, Button, CardMedia, Box, IconButton } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "100%",
  borderRadius: "24px",
  boxShadow: "0 8px 24px rgba(180, 23, 18, 0.12)",
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)"
}));

export const ThumbnailImage = styled("img")({
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

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "1.1rem",
  color: "white",
  padding: "12px 32px",
  background: "linear-gradient(45deg, #B41712 30%, #d84f4b 90%)",
  boxShadow: "0 4px 16px rgba(180, 23, 18, 0.3)",
  "&:hover": {
    background: "linear-gradient(45deg, #8f1210 30%, #B41712 90%)"
  }
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative"
}));

export const StyledPaper = styled(Box)(({ theme }) => ({
  pl: 4,
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.95)"
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#B41712",
  opacity: 1,
  "&:disabled": {
    opacity: 0.5
  }
}));