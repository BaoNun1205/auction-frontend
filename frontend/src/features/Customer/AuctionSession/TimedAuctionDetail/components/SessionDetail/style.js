import { styled } from '@mui/material/styles';
import { Button, Card, CardMedia } from '@mui/material';
import { red } from '@mui/material/colors';

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[5],
  },
}));