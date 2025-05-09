import React from 'react';
import { Box, Typography } from '@mui/material';

const DescriptionViewer = ({ content }) => {
  return (
    <Box
      sx={{
        maxHeight: '300px', // Chiều cao tối đa, điều chỉnh theo nhu cầu
        overflowY: 'auto', // Hiển thị thanh cuộn dọc khi nội dung dài
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 1,
        p: 2,
        bgcolor: 'background.paper',
        '& p': {
          margin: 0, // Xóa margin mặc định của thẻ p trong HTML
        },
        '& *': {
          color: 'text.primary', // Đảm bảo màu chữ đồng nhất
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }} // Hiển thị HTML từ editorContent
    />
  );
};

export default DescriptionViewer;