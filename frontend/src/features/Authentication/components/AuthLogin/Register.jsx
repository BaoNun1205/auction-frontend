import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Phone, Person } from '@mui/icons-material';
import Logo from '~/assets/images/logo/logo.png';
import { fadeIn, StyledButton, LogoContainer, StyledTextField } from './style';
import AppModal from '~/components/Modal/Modal';
import Login from './Login';
import { useRegister } from '~/hooks/authHook';

export default function Register({ handleClose }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const { mutate: register, isLoading: isRegistering } = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault();
    register({ username: formData.username, phone: formData.phone, email: formData.email, password: formData.password }, {
      onSuccess: (response) => {
        navigate('/');
        handleClose();
      },
      onError: (error) => {
        console.error('Email has been used to register another account.')
      }
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 4 }}>
        <LogoContainer
          elevation={3}
          sx={{
            width: { xs: 100, md: 120, lg: 140 },
            height: { xs: 100, md: 120, lg: 140 },
          }}
        >
          <Box component="img" src={Logo} alt="Logo" sx={{ width: '180%' }} />
        </LogoContainer>
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: '#B7201B',
              fontWeight: 'bold',
              fontSize: { xs: '24px', md: '28px', lg: '32px' },
              letterSpacing: '1px',
              marginBottom: '8px',
            }}
          >
            Auction BIDMASTER
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '14px', md: '16px' },
            }}
          >
            Đăng ký tài khoản mới
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
          Bạn đã có tài khoản?{' '}
          <AppModal
            trigger={
              <Typography
                component="span"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '14px', md: '16px' },
                  textDecoration: 'none',
                  color: '#B7201B',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#8B0000',
                  },
                }}
              >
                Đăng nhập
              </Typography>
            }
          >
            <Login />
          </AppModal>
        </Typography>
      </Box>

      <StyledTextField
        fullWidth
        label="Tên đăng nhập"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
      />

      <StyledTextField
        fullWidth
        label="Số điện thoại"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
      />

      <StyledTextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
      />

      <StyledTextField
        fullWidth
        label="Mật khẩu"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
        Đăng ký
      </StyledButton>
    </Box>
  );
}