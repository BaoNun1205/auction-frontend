import { styled } from '@mui/material/styles';
import { Typography, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

export const TruncatedTypography = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  textOverflow: 'ellipsis',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '23%',
  padding: theme.spacing(2),
  textAlign: 'left',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  position: 'relative',
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 250,
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B41712',
  width: '100%',
  color: 'white',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#8B0000',
  },
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: theme.spacing(2),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
}));