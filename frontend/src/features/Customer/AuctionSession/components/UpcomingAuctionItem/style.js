import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Button } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: 2,
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 140,
  height: 140,
  borderRadius: 1,
  marginTop: theme.spacing(1),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  textTransform: 'none',
  fontWeight: 'bold',
  marginTop: theme.spacing(1),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));