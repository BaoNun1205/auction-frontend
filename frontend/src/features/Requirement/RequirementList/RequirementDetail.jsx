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
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { styled } from "@mui/system";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "1rem",
    background: "transparent",
    boxShadow: "none",  // Remove box shadow
    borderRadius: "0px"
  }));
  

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "400px",
  overflow: "hidden",
  borderRadius: "12px",
  "&:hover .preview": {
    opacity: 1
  }
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255,255,255,0.8)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.9)"
  }
}));

const PreviewImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "100px",
  height: "100px",
  opacity: 0,
  transition: "opacity 0.3s",
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: "8px",
  padding: "4px"
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  padding: "10px 24px",
  borderRadius: "8px",
  fontWeight: "bold",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)"
  }
}));

const RequirementDetails = ({ open, onClose, requirement, onApprove, onReject }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Requirement Details</DialogTitle>
      <DialogContent>
        {requirement ? (
          <Box>
            <StyledCard>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <ImageContainer component={motion.div} layout>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={`${images[currentImageIndex].image}`}
                          alt={`Asset image ${currentImageIndex + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </AnimatePresence>

                      <NavigationButton
                        onClick={handlePrevImage}
                        style={{ left: 10 }}
                        aria-label="Previous image"
                      >
                        <BiLeftArrow />
                      </NavigationButton>

                      <NavigationButton
                        onClick={handleNextImage}
                        style={{ right: 10 }}
                        aria-label="Next image"
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
                      <Typography
  variant="h5"
  color="main"
>
  {requirement.assetPrice}
</Typography>

                      <Paper elevation={0} sx={{ p: 2, my: 2, bgcolor: "#f5f5f5" }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Created: {new Date(dummyData.createdAt).toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Inspector: {dummyData.inspector.name} ({dummyData.inspector.id})
                        </Typography>
                        <Typography variant="subtitle1">
                          Vendor: {dummyData.vendor.name}
                        </Typography>
                        <Chip
                          label={dummyData.vendor.contact}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Paper>

                      <Box
                        dangerouslySetInnerHTML={{ __html: dummyData.description }}
                        sx={{ my: 3 }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: isMobile ? "column" : "row"
                        }}
                      >
                        <ActionButton
                          variant="contained"
                          color="primary"
                          fullWidth={isMobile}
                          component={motion.button}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onApprove(requirement)}
                        >
                          Accept
                        </ActionButton>
                        <ActionButton
                          variant="outlined"
                          color="error"
                          fullWidth={isMobile}
                          component={motion.button}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onApprove(requirement)}
                        >
                          Reject
                        </ActionButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Box>
        ) : (
          <Typography variant="body1" color="error">
            No details available.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequirementDetails;
