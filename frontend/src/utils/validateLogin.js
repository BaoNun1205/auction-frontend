export const validateLogin = (loginData) => {
  const errors = {};

  // Check for empty email
  if (!loginData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
    errors.email = 'Email is invalid';
  }

  // Check for empty password
  if (!loginData.password) {
    errors.password = 'Password is required';
  } else if (loginData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};