export const validateRegister = (registerData) => {
    const errors = {};
  
    // Kiểm tra tên người dùng
    if (!registerData.username) {
      errors.username = "Tên người dùng là bắt buộc.";
    } else if (registerData.username.length < 3) {
      errors.username = "Tên người dùng phải có ít nhất 3 ký tự.";
    }
  
    // Kiểm tra số điện thoại
    if (!registerData.phone) {
      errors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^\d{10}$/.test(registerData.phone)) {
      errors.phone = "Số điện thoại phải có 10 chữ số.";
    }
  
    // Kiểm tra email
    if (!registerData.email) {
      errors.email = "Email là bắt buộc.";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = "Email không hợp lệ.";
    }
  
    // Kiểm tra mật khẩu
    if (!registerData.password) {
      errors.password = "Mật khẩu là bắt buộc.";
    } else if (registerData.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
    } else if (!/[a-z]/.test(registerData.password)) {
      errors.password = "Mật khẩu phải chứa ít nhất một ký tự chữ thường.";
    } else if (!/[A-Z]/.test(registerData.password)) {
      errors.password = "Mật khẩu phải chứa ít nhất một ký tự chữ hoa.";
    } else if (!/[0-9]/.test(registerData.password)) {
      errors.password = "Mật khẩu phải chứa ít nhất một chữ số.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(registerData.password)) {
      errors.password = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
    }
  
    return errors;
};
