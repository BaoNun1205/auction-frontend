import React from 'react';
import { Box, Container } from '@mui/material';
import Login from '~/features/Authentication/components/AuthLogin/Login';

const LoginPage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Login />
      </Container>
    </Box>
  );
};

export default LoginPage;