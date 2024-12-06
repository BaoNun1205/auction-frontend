import { styled } from '@mui/material/styles';
import { Tab, Card, Chip, Button } from '@mui/material';

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: '0.9rem',
  minWidth: 100,
  '&.Mui-selected': {
    color: '#b41712'
  }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8]
  }
}));

export const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit'
  }
}));

export const AnimatedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#b41712',
  color: 'white',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    backgroundColor: '#8B0000',
    transform: 'scale(1.05)',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  }
}));