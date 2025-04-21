import React from 'react';
import { Typography, Breadcrumbs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Breadcrumbs separator={<ChevronRight fontSize="small" />} aria-label="breadcrumb" mb={3}>
      <Typography
        color="inherit"
        onClick={() => handleNavigate('/')}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        Trang chủ
      </Typography>
      <Typography
        color="inherit"
        onClick={() => handleNavigate('/art')}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        Phiên đấu giá đang diễn ra
      </Typography>
      <Typography color="text.primary">Chi tiết</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;