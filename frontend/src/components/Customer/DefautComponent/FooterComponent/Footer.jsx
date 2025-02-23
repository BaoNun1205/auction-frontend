import React, { useState } from "react";
import { Box, Container, Grid, Typography, TextField, Button, IconButton, styled } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(3),
  bottom: 0,
  width: "100%",
  zIndex: 1000
}));

const CallToAction = styled(Box)(({ theme }) => ({
  backgroundColor: "#2d2d2d",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius
}));

const SocialIcon = styled(IconButton)({
  color: "#ffffff",
  margin: "0 8px",
  "&:hover": {
    color: "#4a90e2",
    transform: "translateY(-2px)",
    transition: "all 0.3s ease"
  }
});

const FooterLink = styled(Typography)({
  cursor: "pointer",
  "&:hover": {
    color: "#4a90e2",
    transition: "color 0.3s ease"
  }
});

const StyledButton = styled(Button)({
  backgroundColor: "#4a90e2",
  color: "#ffffff",
  padding: "10px 30px",
  "&:hover": {
    backgroundColor: "#357abd"
  }
});

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <FooterWrapper component="footer" role="contentinfo">
      <Container maxWidth="lg">
        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" paragraph>
              We are dedicated to providing exceptional services and innovative solutions to meet your needs. Our commitment to excellence drives everything we do.
            </Typography>
            <Box>
              <SocialIcon aria-label="Facebook" component="a" href="#">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon aria-label="Twitter" component="a" href="#">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon aria-label="Instagram" component="a" href="#">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon aria-label="LinkedIn" component="a" href="#">
                <FaLinkedin />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" paragraph>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" paragraph>
              Address: 123 Business Street, Suite 100, City, State 12345
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Subscribe Now
            </Typography>
            <Typography variant="body2" paragraph>
              Stay updated with our latest news and offers!
            </Typography>
            <Box component="form" noValidate>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Please enter a valid email" : ""}
                sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                InputProps={{ style: { color: "#ffffff" } }}
              />
              <StyledButton
                fullWidth
                variant="contained"
                onClick={handleSubscribe}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </StyledButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 3,
            textAlign: "center"
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
          <Box mt={1}>
            <FooterLink
              variant="body2"
              component="a"
              href="#"
              sx={{ mr: 2 }}
            >
              Terms of Service
            </FooterLink>
            <FooterLink variant="body2" component="a" href="#">
              Privacy Policy
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;