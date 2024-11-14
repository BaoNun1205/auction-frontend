import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '12px',
  borderRadius: '10px',
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

export default function PlaceBidForm({ handleClose }) {
  const [maximumBid, setMaximumBid] = useState(750);
  const buyersPremiumRate = 0.23;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle bid submission logic here
    console.log('Bid submitted:', maximumBid);
    handleClose();
  };

  const buyersPremium = maximumBid * buyersPremiumRate;
  const subtotal = maximumBid + buyersPremium;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Place Bid
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Enter the highest amount you're willing to bid. We'll bid incrementally to keep you in the lead.
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <StyledTextField
          fullWidth
          label="Maximum Bid"
          type="number"
          value={maximumBid}
          onChange={(e) => setMaximumBid(Number(e.target.value))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Buyer's Premium</Typography>
          <Typography>${buyersPremium.toFixed(2)} ({(buyersPremiumRate * 100).toFixed(0)}%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <Typography>Subtotal</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
      </Paper>
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