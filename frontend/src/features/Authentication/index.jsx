import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Phone, Person } from '@mui/icons-material';
import Logo from '~/assets/images/logo/logo.png';
import { useGetToken, useRegister } from '~/hooks/authHook';
import { fadeIn, StyledButton, LogoContainer, StyledTextField } from './style';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function Authentication({ handleClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: getToken, isLoading: isGettingToken } = useGetToken();
  const { mutate: register, isLoading: isRegistering } = useRegister();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Chưa phải là email').max(255).required('Vui lòng nhập email'),
    password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
  });

  const registerValidationSchema = Yup.object().shape({
    username: Yup.string().max(255).required('Vui lòng nhập tên đăng nhập'),
    phone: Yup.string().matches(/^\+?[0-9]{7,15}$/, 'Chưa phải là số điện thoại').required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Chưa phải là email').max(255).required('Vui lòng nhập email'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'Mật khẩu phải có ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 ký tự đặc biệt (VD: 123456@Aa)')
      .required('Vui lòng nhập mật khẩu')
  });

  return (
    <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 4 }}>
        <LogoContainer
          elevation={3}
          sx={{
            width: { xs: 100, md: 120, lg: 140 },
            height: { xs: 100, md: 120, lg: 140 },
          }}
        >
          <Box component="img" src={Logo} alt="Logo" sx={{ width: '180%' }} />
        </LogoContainer>
        <Typography
          variant="h4"
          sx={{
            color: '#B7201B',
            fontWeight: 'bold',
            fontSize: { xs: '24px', md: '28px', lg: '32px' },
            letterSpacing: '1px',
          }}
        >
          Auction BIDMASTER
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            color: '#B7201B',
            '&.Mui-selected': {
              color: '#B7201B',
              fontWeight: 'bold',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#B7201B',
          },
        }}
      >
        <Tab label="Đăng nhập" />
        <Tab label="Đăng ký" />
      </Tabs>

      {activeTab === 0 && (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
            getToken(
              { email: values.email, password: values.password },
              {
                onSuccess: () => {
                  handleClose();
                },
                onError: (error) => {
                  console.error('Error logging in:', error);
                  setErrors({ submit: 'Kiểm tra lại email hoặc mật khẩu.' });
                  setSubmitting(false);
                },
              }
            );
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                sx={{ mb: 3 }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="saveLogin"
                      checked={values.saveLogin}
                      onChange={handleChange}
                      sx={{
                        color: '#B7201B',
                        '&.Mui-checked': {
                          color: '#B7201B',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '14px' }}>
                      Ghi nhớ đăng nhập
                    </Typography>
                  }
                />
                <Typography
                  component="span"
                  sx={{
                    color: '#B7201B',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#6C1B19',
                    },
                  }}
                >
                  Quên mật khẩu?
                </Typography>
              </Box>

              {errors.submit && (
                <Box sx={{ mb: 2 }}>
                  <Typography color="error" variant="body2">
                    {errors.submit}
                  </Typography>
                </Box>
              )}

              <StyledButton
                type="submit"
                fullWidth
                size="large"
                sx={{
                  height: '50px',
                }}
                disabled={isSubmitting}
              >
                Đăng nhập
              </StyledButton>
            </form>
          )}
        </Formik>
      )}

      {activeTab === 1 && (
        <Formik
          initialValues={{ username: '', phone: '', email: '', password: '' }}
          validationSchema={registerValidationSchema}
          onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
            register(values, {
              onSuccess: () => {
                handleClose();
              },
              onError: (error) => {
                console.error('Error registering:', error);
                setErrors({ submit: 'An error occurred. Please try again.' });
                setSubmitting(false);
              },
            });
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                label="Tên đăng nhập"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                type="text"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                sx={{ mb: 3 }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {errors.submit && (
                <Box>
                  <Typography color="error" variant="body2">
                    {errors.submit}
                  </Typography>
                </Box>
              )}

              <StyledButton
                type="submit"
                fullWidth
                size="large"
                sx={{
                  height: '50px',
                }}
                disabled={isSubmitting}
              >
                Đăng ký
              </StyledButton>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
}

