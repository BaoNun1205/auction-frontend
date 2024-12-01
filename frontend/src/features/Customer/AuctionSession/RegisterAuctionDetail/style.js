import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const StyledCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 8px 24px rgba(180, 23, 18, 0.12)',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
}));

export const ThumbnailImage = styled('img')(({ theme, selected }) => ({
  width: 80,
  height: 80,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius * 1.5,
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  border: selected ? '3px solid #B41712' : '3px solid transparent',
  opacity: selected ? 1 : 0.7,
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 4px 12px rgba(180, 23, 18, 0.15)',
    opacity: 1,
  },
}));

export const StyledButton = styled('button')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  textTransform: 'none',
  fontSize: '1.1rem',
  color: 'white',
  padding: '12px 32px',
  background: 'linear-gradient(45deg, #B41712 30%, #d84f4b 90%)',
  boxShadow: '0 4px 16px rgba(180, 23, 18, 0.3)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #8f1210 30%, #B41712 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(180, 23, 18, 0.4)',
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#B41712',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));

