import React from 'react';
import { Grid, Fade, Zoom } from '@mui/material';
import { StyledCard, StyledCardMedia } from '../../style';

const ImageGallery = ({ mainImage, images, itemName, onThumbnailClick }) => {
  const placeholderImage = 'https://via.placeholder.com/150';

  return (
    <Grid item xs={12} md={7}>
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <StyledCard elevation={3}>
          <StyledCardMedia
            component="img"
            height="400"
            image={mainImage}
            alt={itemName}
          />
        </StyledCard>
      </Zoom>
      <Grid container spacing={2} mt={2}>
        {images.slice(0, 4).map((image, i) => (
          <Grid item xs={3} key={i}>
            <Fade in={true} style={{ transitionDelay: `${i * 100}ms` }}>
              <StyledCard
                onClick={() => onThumbnailClick(image.imageAsset || placeholderImage)}
              >
                <StyledCardMedia
                  component="img"
                  height="100"
                  image={image.imageAsset || placeholderImage}
                  alt={`Thumbnail ${i}`}
                />
              </StyledCard>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ImageGallery;