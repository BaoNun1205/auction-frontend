import { styled } from '@mui/material/styles';
import { Tab, Card, Chip, Button } from '@mui/material';

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: '#B7201B',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: '#B7201B',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&.Mui-selected::after': {
    transform: 'scaleX(1)',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B7201B',
  color: 'white',
  padding: '8px 24px',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: '#8B1815',
  },
}));