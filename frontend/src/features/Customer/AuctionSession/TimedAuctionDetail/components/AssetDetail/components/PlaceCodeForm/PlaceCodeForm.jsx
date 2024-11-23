import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '12px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(183, 32, 27, 0.3)',
  },
  fontSize: {
    xs: '14px',
    md: '16px',
    lg: '18px',
  },
  fontWeight: 'bold',
  textTransform: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B7201B',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#B7201B',
  },
}));

export default function ReturnCodeForm({ handleClose }) {
  const [returnCode, setReturnCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle return code submission logic here
    console.log('Return code submitted:', returnCode);
    handleClose();
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 5) {
      setReturnCode(value);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Place Bid
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Please enter the return code to your phone number or email
      </Typography>
      <StyledTextField
        fullWidth
        value={returnCode}
        onChange={handleChange}
        placeholder="- - - - -"
        inputProps={{
          maxLength: 5,
          style: { textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.5em' }
        }}
        sx={{ mb: 3 }}
      />
      <StyledButton
        type="submit"
        fullWidth
        size="large"
        sx={{
          width: '100%',
          height: '50px',
        }}
      >
        SEND
      </StyledButton>
    </Box>
  );
}