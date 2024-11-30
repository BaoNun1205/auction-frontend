export const validateLogin = (loginData) => {
  const errors = {};

  // Kiểm tra xem email có trống không
  if (!loginData.email) {
    errors.email = 'Email là bắt buộc';
  } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
    errors.email = 'Email không hợp lệ';
  }

  // Kiểm tra xem mật khẩu có trống không
  if (!loginData.password) {
    errors.password = 'Mật khẩu là bắt buộc';
  } else if (loginData.password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  }

  return errors;
};