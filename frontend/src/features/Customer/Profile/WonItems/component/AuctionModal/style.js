import { styled, createTheme } from '@mui/material/styles';
import { Modal, Paper, Chip } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#b41712',
    },
  },
});

export const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ModalContent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  maxWidth: 800,
  maxHeight: '90vh',
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    borderRadius: 0,
  },
}));

export const InfoChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));