import React, { useState } from 'react';
import AppModal from './AppModal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { StyledButton } from './style';

export default function MainPage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => {
    setOpenRegister(false); // Đóng form đăng ký nếu đang mở
    setOpenLogin(true);
  };

  const handleOpenRegister = () => {
    setOpenLogin(false); // Đóng form đăng nhập nếu đang mở
    setOpenRegister(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };

  return (
    <div>
      <StyledButton onClick={handleOpenLogin}>Đăng nhập</StyledButton>
      <StyledButton onClick={handleOpenRegister}>Đăng ký</StyledButton>

      <AppModal open={openLogin} handleClose={handleClose}>
        <LoginForm handleClose={handleClose} />
      </AppModal>

      <AppModal open={openRegister} handleClose={handleClose}>
        <RegisterForm handleClose={handleClose} />
      </AppModal>
    </div>
  );
}
