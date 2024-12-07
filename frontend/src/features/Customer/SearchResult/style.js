import { styled } from '@mui/material/styles';
import { CardMedia, Chip } from '@mui/material';
import { motion } from 'framer-motion';

export const StyledCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 280,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const StatusChip = styled(Chip)(({ status, theme }) => {
  let backgroundColor;
  switch (status) {
    case 'UPCOMING':
      backgroundColor = theme.palette.info.main;
      break;
    case 'ONGOING':
      backgroundColor = theme.palette.warning.main;
      break;
    case 'AUCTION_SUCCESS':
      backgroundColor = theme.palette.success.main;
      break;
    case 'NOT_AUCTIONED':
      backgroundColor = 'rgba(0, 0, 0, 0.8)';
      break;
    default:
      backgroundColor = theme.palette.error.main;
  }

  return {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor,
    color: theme.palette.common.white,
    fontWeight: 600,
    zIndex: 1,
  };
});

export const AnimatedButton = styled(motion.button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  border: 'none',
  padding: '10px 20px',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  fontWeight: 600,
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  width: '100%',
  textDecoration: 'none',
  textAlign: 'center',
}));

