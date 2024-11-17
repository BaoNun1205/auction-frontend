import React, { useState } from 'react';
import { Modal, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme, maxWidth }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  outline: 'none',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  width: '100%',
  maxWidth: maxWidth || '500px',
}));

const AppModal = ({ trigger, children, maxWidth, ...rest }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box onClick={handleOpen} sx={{ display: 'inline-block' }}>
        {trigger}
      </Box>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...rest}
      >
        <ModalContent maxWidth={maxWidth}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {React.cloneElement(children, { handleClose })}
        </ModalContent>
      </StyledModal>
    </div>
  );
};

export default AppModal;