import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  styled
} from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B7201B'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#B7201B'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '12px',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(183, 32, 27, 0.3)'
  },
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none'
}));

const MAX_VALUE = 999999999; // Giới hạn tối đa: 999 triệu VNĐ

const PlaceBidForm = ({ item, onSubmit, currentPrice }) => {
  const [bidPrice, setBidPrice] = useState('');
  const [error, setError] = useState('');
  const minBidIncrement = item.bidIncrement;
  const minNextBid = (currentPrice || 0) + minBidIncrement; // Xử lý currentPrice undefined/null

  useEffect(() => {
    setBidPrice(minNextBid.toString());
  }, [minNextBid]);

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text').replace(/\./g, '');
    if (!/^\d*$/.test(pastedValue)) {
      e.preventDefault();
    }
  };

  const handleBidPriceChange = (e) => {
    const value = e.target.value.replace(/\./g, ''); // Loại bỏ dấu chấm
    // Chỉ cho phép số
    if (!/^\d*$/.test(value)) {
      return; // Không cập nhật nếu chứa ký tự không phải số
    }

    if (!value) {
      setError('Vui lòng nhập giá đặt');
      setBidPrice('');
      return;
    }

    const numValue = Number(value);
    if (numValue < minNextBid) {
      setError(`Giá đặt phải lớn hơn hoặc bằng ${minNextBid.toLocaleString('vi-VN')} VNĐ`);
    } else if (numValue > MAX_VALUE) {
      setError(`Giá đặt không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VNĐ`);
    } else {
      setError('');
    }
    setBidPrice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericBidValue = Number(bidPrice);
    if (!bidPrice) {
      setError('Vui lòng nhập giá đặt');
      return;
    }
    if (numericBidValue < minNextBid) {
      setError(`Giá đặt phải lớn hơn hoặc bằng ${minNextBid.toLocaleString('vi-VN')} VNĐ`);
      return;
    }
    if (numericBidValue > MAX_VALUE) {
      setError(`Giá đặt không được vượt quá ${MAX_VALUE.toLocaleString('vi-VN')} VNĐ`);
      return;
    }
    onSubmit(numericBidValue);
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', p: 2 }}>
      {/* <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Đặt giá
      </Typography> */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        Nhập số tiền bạn muốn đặt.
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'left' }}>
          Giá hiện tại: {(currentPrice || 0).toLocaleString('vi-VN')} VNĐ
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'left' }}>
          Giá nhỏ nhất tiếp theo: {minNextBid.toLocaleString('vi-VN')} VNĐ
        </Typography>
        <StyledTextField
          fullWidth
          label="Giá đặt"
          type="text"
          value={formatNumber(bidPrice)}
          onChange={handleBidPriceChange}
          onPaste={handlePaste}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
          }}
          sx={{ mb: 2 }}
        />
      </Paper>
      <StyledButton
        type="submit"
        fullWidth
        size="large"
        sx={{
          width: '100%',
          height: '50px'
        }}
        disabled={!!error || !bidPrice}
      >
        Gửi
      </StyledButton>
    </Box>
  );
};

export default PlaceBidForm;