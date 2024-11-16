import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import Logo from '~/assets/images/logo/logo.png';
import { useGetToken } from '~/hooks/authHook';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

const LogoContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#B7201B',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(183, 32, 27, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(183, 32, 27, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B7201B',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#B7201B',
  },
}));

export default function LoginForm({ handleClose }) {
  const navigate = useNavigate();
  const { mutate: getToken, isLoading: isGettingToken } = useGetToken();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    saveLogin: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    getToken(
      { email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          navigate('/');
          handleClose();
        },
        onError: (error) => {
          console.error('Error logging in:', error);
        },
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'saveLogin' ? checked : value,
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
            Sign in to access your account
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
          Don't have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/signup')}
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '14px', md: '16px' },
              textDecoration: 'none',
              color: '#B7201B',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#8B0000',
              },
            }}
          >
            Register now
          </Link>
        </Typography>
      </Box>

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
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 3 }}
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mb: 3,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="saveLogin"
              checked={formData.saveLogin}
              onChange={handleChange}
              sx={{
                color: '#B7201B',
                '&.Mui-checked': {
                  color: '#B7201B',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
              Remember me
            </Typography>
          }
        />
        <Link
          component="button"
          sx={{
            color: '#B7201B',
            fontWeight: 'bold',
            fontSize: { xs: '14px', md: '16px' },
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#8B0000',
            },
          }}
        >
          Forgot password?
        </Link>
      </Box>

      <StyledButton
        type="submit"
        fullWidth
        size="large"
        sx={{
          width: '100%',
          height: '50px',
        }}
      >
        Sign In
      </StyledButton>
    </Box>
  );
}