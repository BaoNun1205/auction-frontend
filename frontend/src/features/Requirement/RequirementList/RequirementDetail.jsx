import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const StyledCard = styled(Card)({
  maxWidth: "1000px",
  margin: "2rem auto",
  backgroundColor: "transparent",
});

const ImageContainer = styled(Box)({
  position: "relative",
  height: "400px",  // Fixed height
  width: "100%",    // Full width
  maxWidth: "600px", // Optional: You can set max width for responsiveness
  overflow: "hidden",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover .preview": {
    opacity: 1,
  },
});

const StyledImage = styled(motion.img)({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Ensures the image fills the container and maintains its aspect ratio
  transition: "transform 0.3s ease-in-out", // Smooth zoom-in effect on image change
});

const NavigationButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255,255,255,0.8)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  zIndex: 1,
});

const ActionButton = styled(Button)({
  padding: "10px 24px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontFamily: "San Francisco",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const RequirementDetails = ({
  open,
  onClose,
  requirement,
  onApprove,
  onReject,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = requirement?.imageRequirements || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleApprove = () => {
    onApprove(requirement);
    onClose(); // Close the dialog after approval
  };

  const handleReject = () => {
    onReject(requirement);
    onClose(); // Close the dialog after rejection
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          backgroundColor: "#B41712", // Red background color
        }}
      >
        Chi Tiết Yêu Cầu
      </DialogTitle>

      <DialogContent>
        {requirement ? (
          <Box>
            <CardContent sx={{ backgroundColor: "transparent" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ImageContainer component={motion.div} layout>
                    <AnimatePresence mode="wait">
                      <StyledImage
                        key={currentImageIndex}
                        src={`${images[currentImageIndex]?.image}`}
                        alt={`Ảnh tài sản ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>

                    <NavigationButton
                      onClick={handlePrevImage}
                      style={{ left: 10 }}
                      aria-label="Ảnh trước"
                    >
                      <BiLeftArrow />
                    </NavigationButton>

                    <NavigationButton
                      onClick={handleNextImage}
                      style={{ right: 10 }}
                      aria-label="Ảnh tiếp theo"
                    >
                      <BiRightArrow />
                    </NavigationButton>
                  </ImageContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box p={2}>
                    <Typography variant="h4" gutterBottom>
                      {requirement.assetName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Giá bán
                    </Typography>
                    <Typography variant="h5" color="#b41712">
                      {requirement.assetPrice}
                    </Typography>

                    <Paper elevation={0} sx={{ p: 2, my: 2, bgcolor: "#f5f5f5" }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Ngày tạo: {new Date(requirement.createdAt).toLocaleString()}
                      </Typography>

                      <Typography variant="subtitle1">
                        Người bán: {requirement.vendor}
                      </Typography>
                    </Paper>

                    <Box
                      dangerouslySetInnerHTML={{ __html: requirement.assetDescription }}
                      sx={{ my: 3 }}
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <ActionButton
                        variant="contained"
                        color="success" // Màu xanh
                        onClick={handleApprove}
                      >
                        Chấp Nhận
                      </ActionButton>
                      <ActionButton
                        variant="outlined"
                        color="error" // Màu đỏ
                        onClick={handleReject}
                      >
                        Từ Chối
                      </ActionButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        ) : (
          <Typography variant="body1" color="error">
            Không có chi tiết nào.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequirementDetails;
