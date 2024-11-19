import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCreateAuctionHistory } from '~/hooks/auctionHistoryHook';
import parseToken from '~/utils/parseToken';
import { useAppStore } from '~/store/appStore';

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
  fontSize: '16px',
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

export default function PlaceBidForm({ handleClose, item }) {
  const { mutate: createAuctionHistory } = useCreateAuctionHistory();
  const [bidPrice, setBidPrice] = useState('');
  const [error, setError] = useState('');
  const depositRate = 0.23;
  const minBidIncrement = 100000;

  const { auth } = useAppStore();

  const currentPrice = item.currentPrice || 0;
  const minNextBid = currentPrice + minBidIncrement;

  useEffect(() => {
    setBidPrice(minNextBid.toString());
  }, [minNextBid]);

  const handleBidPriceChange = (e) => {
    const value = e.target.value;
    if (Number(value) < minNextBid) {
      setError(`Giá đặt phải lớn hơn hoặc bằng ${minNextBid.toLocaleString('vi-VN')} VND`);
    } else {
      setError('');
    }
    setBidPrice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(bidPrice) < minNextBid) {
      setError(`Giá đặt phải lớn hơn hoặc bằng ${minNextBid.toLocaleString('vi-VN')} VND`);
      return;
    }
    const auctionHistory = {
      auctionSessionId: item.id,
      userId: auth.user.id,
      bidPrice: Number(bidPrice),
      bidTime: new Date().toISOString(),
    };
    console.log('Submitting auction history:', auctionHistory);
    createAuctionHistory(auctionHistory, {
      onSuccess: () => {
        console.log('Auction history submitted successfully');
        handleClose();
      },
      onError: (error) => {
        console.error('Error submitting auction history:', error);
      },
    });
  };

  const deposit = Number(bidPrice) * depositRate;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Đặt giá
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Nhập số tiền bạn muốn đặt. Giá cọc là 23% giá trị sản phẩm.
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, textAlign: 'left' }}>
          Giá hiện tại: {currentPrice.toLocaleString('vi-VN')} VND
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'left' }}>
          Giá nhỏ nhất tiếp theo: {minNextBid.toLocaleString('vi-VN')} VND
        </Typography>
        <StyledTextField
          fullWidth
          label="Giá đặt"
          type="number"
          value={bidPrice}
          onChange={handleBidPriceChange}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Giá cọc (23%)</Typography>
          <Typography>{deposit.toLocaleString('vi-VN')} VND</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <Typography>Tổng cộng</Typography>
          <Typography>{Number(bidPrice).toLocaleString('vi-VN')} VND</Typography>
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
        disabled={Number(bidPrice) < minNextBid}
      >
        Gửi
      </StyledButton>
    </Box>
  );
}