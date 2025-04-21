import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const DescriptionSection = ({ item }) => {
  return (
    <>
      <Divider sx={{ my: 6 }} />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Mô tả
      </Typography>
      <Box sx={{ p: 3, mb: 1, borderRadius: 2 }}>
        <Typography variant="h6">Thông tin phiên</Typography>
        <Typography paragraph dangerouslySetInnerHTML={{ __html: item.description }} />
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6">Thông tin vật phẩm</Typography>
        <Typography paragraph dangerouslySetInnerHTML={{ __html: item.asset.assetDescription }} />
      </Box>
    </>
  );
};

export default DescriptionSection;