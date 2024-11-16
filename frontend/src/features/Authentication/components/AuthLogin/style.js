import { styled, keyframes } from '@mui/material/styles';
import { Button, Paper, TextField } from '@mui/material';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledButton = styled(Button)(({ theme }) => ({
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

export const LogoContainer = styled(Paper)(({ theme }) => ({
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

export const StyledTextField = styled(TextField)(({ theme }) => ({
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