import { styled } from '@mui/material/styles';
import { Paper, Box, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
  marginTop: theme.spacing(4),
}));

export const AddressItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#b41712',
  color: 'white',
  paddingX: theme.spacing(4),
  '&:hover': {
    backgroundColor: '#8B0000',
  },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  color: '#b41712',
  backgroundColor: '#fff',
  border: '1px solid #b41712',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: '#1976d2',
  fontSize: '0.875rem',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const StyledOutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: '#595959',
  color: '#595959',
  '&:hover': {
    borderColor: '#404040',
    backgroundColor: 'transparent',
  },
}));