import { styled } from '@mui/system';
import { Box, Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

export const ImageContainer = styled(Box)({
  position: 'relative',
  height: '100px',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

export const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const ModalImage = styled('img')({
  maxWidth: '80vw',
  maxHeight: '80vh',
  objectFit: 'contain',
});

export const DescriptionContainer = styled(Box)(({ theme }) => ({
  padding: '1rem',
  border: '1px solid #ddd', // Đặt viền cho phần mô tả
  borderRadius: '8px',
  backgroundColor: '#f9f9f9', // Nền nhẹ nhàng
  marginTop: '1rem',
  whiteSpace: 'pre-line', // Giữ nguyên dòng mới nếu có
  overflowY: 'auto', // Kích hoạt thanh cuộn khi nội dung vượt quá chiều cao
}));