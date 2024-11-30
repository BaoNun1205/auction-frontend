export const validateRegister = (data) => {
    const errors = {};
  
    // Validate Username
    if (!data.username) {
      errors.username = 'Tên đăng nhập là bắt buộc';
    } else if (data.username.length < 3) {
      errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    }
  
    // Validate Phone
    const phonePattern = /^[0-9]{10,11}$/;  // Example pattern for phone numbers
    if (!data.phone) {
      errors.phone = 'Số điện thoại là bắt buộc';
    } else if (!phonePattern.test(data.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
  
    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!data.email) {
      errors.email = 'Email là bắt buộc';
    } else if (!emailPattern.test(data.email)) {
      errors.email = 'Email không hợp lệ';
    }
  
    // Validate Password
    const password = data.password;
  
    // Check for password length
    if (!password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/[a-z]/.test(password)) {
      // Check for at least one lowercase letter
      errors.password = 'Mật khẩu phải chứa ít nhất một chữ cái viết thường';
    } else if (!/[A-Z]/.test(password)) {
      // Check for at least one uppercase letter
      errors.password = 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa';
    } else if (!/\d/.test(password)) {
      // Check for at least one digit
      errors.password = 'Mật khẩu phải chứa ít nhất một số';
    } else if (!/[!@#$%^&*]/.test(password)) {
      // Check for at least one special character
      errors.password = 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
    }
  
    return errors;
  };
  