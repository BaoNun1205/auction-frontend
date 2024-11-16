import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery, CardContent, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { StyledCard, StyledCardMedia } from './style';

const auctionData = [
  {
    image: 'https://source.unsplash.com/random/400x300?painting,impressionist',
    title: 'Impressionist Landscape',
    description: 'A serene countryside scene.',
  },
  {
    image: 'https://source.unsplash.com/random/400x300?painting,abstract',
    title: 'Abstract Composition',
    description: 'Bold colors and geometric shapes.',
  },
  {
    image: 'https://source.unsplash.com/random/400x300?painting,portrait',
    title: 'Portrait Study',
    description: 'Capturing human emotion on canvas.',
  },
  {
    image: 'https://source.unsplash.com/random/400x300?painting,stilllife',
    title: 'Still Life with Fruits',
    description: 'Classic arrangement with vibrant colors.',
  },
  {
    image: 'https://source.unsplash.com/random/400x300?painting,cityscape',
    title: 'Urban Cityscape',
    description: 'Modern architecture in oil paint.',
  },
];

const RelatedPaintings = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (auctionData.length - 2));
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + auctionData.length - 2) % (auctionData.length - 2));
    };
  
    return (
      <Box my={6}>
        <Typography variant="h5" gutterBottom>
          Related Paintings
        </Typography>
        <Box position="relative">
          <Grid container spacing={3}>
            {auctionData.slice(currentIndex, currentIndex + 3).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StyledCard>
                    <StyledCardMedia
                      image={item.image}
                      title={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          {!isMobile && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)' }}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)' }}
              >
                <ArrowForwardIos />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    );
  };

export default RelatedPaintings;