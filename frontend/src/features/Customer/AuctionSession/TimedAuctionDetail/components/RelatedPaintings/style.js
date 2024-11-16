import { styled } from '@mui/material/styles';
import { Card, CardMedia, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

export const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

export const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  gap: theme.spacing(3),
}));