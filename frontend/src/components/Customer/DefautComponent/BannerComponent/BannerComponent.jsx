import React from 'react';
import { Box, IconButton } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';


const Banner = () => {
    return (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '729px', 
            backgroundImage: 'url(./src/assets/images/banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',

          }}
        >
          <IconButton
            href="mailto:contact@example.com"
            sx={{
              position: 'absolute',
              bottom: '60px', 
              right: '80px', 
              color: 'white',
              backgroundColor: '#b41712', 
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ContactMailIcon />
          </IconButton>
        </Box>
      );
    };

export default Banner;