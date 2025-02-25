import React, { useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';
import ChatInterface from './Chat'; // Import giao diện chat

const ChatButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* Nút mở chat */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: 'primary.main',
          color: 'white',
          zIndex: 1000,
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Cửa sổ chat */}
      {open && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            width: 900,
            height: 600,
            bgcolor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              bgcolor: 'primary.main',
              color: 'white',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Box fontWeight="bold">Chat với người bán</Box>
            <IconButton size="small" onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Nội dung Chat */}
          <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <ChatInterface />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatButton;
