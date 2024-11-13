import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '~/components/AnimateButton/AnimateButton';

// assets
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FirebaseSocial from '~/features/Authentication/components/FirebaseSocial/FirebaseSocial';

import { useAppStore } from '~/store/appStore';
import { useGetToken } from '~/hooks/authHook';
import { jwtDecode } from 'jwt-decode';

// ============================|| JWT - LOGIN ||============================ //

const handleSubmit = (values, { setSubmitting, setErrors, setStatus }, getToken, setToken, navigate) => {
  const { email, password } = values;
  console.log('email:', email);
  console.log('password: ', password);

  getToken(
    { email, password },
    {
      onSuccess: (response) => {
        const code = response.code;
        if (code === 1005) {
          setErrors({ submit: 'Wrong username or password. Please try again.' });
          setSubmitting(false);
          return;
        }
        if (code === 1022) {
          setErrors({ submit: 'Account unverified. Please verify your account first.' });
          setSubmitting(false);
          return;
        }

        setStatus({ success: 'Form Submitted Successfully' });
        navigate('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      },
      onError: (error) => {
        console.error('Error:', error);
        setErrors({ submit: 'An error occurred. Please try again.' });
        setSubmitting(false);
      }
    }
  );
};

export default function AuthLogin() {
  const [checked, setChecked] = useState(false);
  const setToken = useAppStore((state) => state.setToken); // Lấy hàm setToken từ store
  const { mutate: getToken, isLoading: isGettingToken } = useGetToken();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, actions) => handleSubmit(values, actions, getToken, setToken, navigate)}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login" sx={{ fontSize: '0.875rem' }}>Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    size="small"
                    error={Boolean(touched.email && errors.email)}
                    inputProps={{ style: { fontSize: '0.875rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Box>
              <Box>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login" sx={{ fontSize: '0.875rem' }}>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                    inputProps={{ style: { fontSize: '0.875rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Box>
              <Box sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">Keep me sign in</Typography>}
                  />
                  <Link variant="body2" component={RouterLink} color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Box>
              {errors.submit && (
                <Box>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              <Box>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ color: '#fff', bgcolor: 'rgb(22, 119, 255)', textTransform: 'none', fontSize: '0.875rem' }}
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Box>
              <Box>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Box>
              <Box>
                <FirebaseSocial />
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };