import { styled } from '@mui/material/styles';
import { Box, Button, IconButton } from '@mui/material';

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

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  backgroundColor: '#b41712', // Gray color
  color: 'white',
  '&:hover': {
    backgroundColor: '#b41712',
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
  '&:disabled': {
    backgroundColor: '#adb5bd',
    color: '#6c757d',
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#6c757d', // Gray color
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));