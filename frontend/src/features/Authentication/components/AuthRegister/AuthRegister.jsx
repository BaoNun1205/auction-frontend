import { useEffect, useState } from 'react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// material-ui
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project import
import AnimateButton from '~/components/AnimateButton/AnimateButton'
import { strengthColor, strengthIndicator } from '~/utils/password-strength'

// assets
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { useRegister } from '~/hooks/authHook'
import { Alert } from '@mui/material'

// ============================|| JWT - REGISTER ||============================ //

const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }, register, setSuccessMessage) => {
  const { username, phone, email, password } = values
  console.log('username:', username)
  console.log('email:', email)
  console.log('password: ', password)
  console.log('phone:', phone)

  register({ username, phone, email, password }, {
    onSuccess: (response) => {
      console.log(response)
      if (response.code === 1002) {
        setErrors({ submit: 'Username has been used to register another account' })
        setSubmitting(false)
        return
      }
      setStatus({ success: 'Check your email to confirm your account.' })
      setSuccessMessage('Check your email to confirm your account.')
      setSubmitting(false)
    },
    onError: (error) => {
      setErrors({ submit: 'Email has been used to register another account.' })
      setSubmitting(false)
    }
  })
}

export default function AuthRegister() {
  const [level, setLevel] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const { mutate: register, isLoading: isRegistering } = useRegister()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const changePassword = (value) => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  useEffect(() => {
    changePassword('')
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          phone: '',
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('User Name is required'),
          phone: Yup.string().max(255).required('Phone is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, actions) => handleSubmit(values, actions, register, setSuccessMessage)}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Stack direction="row" spacing={3}>
                <Box sx={{ flex: 1 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="username-signup" sx={{ fontSize: '0.875rem' }}>User Name*</InputLabel>
                    <OutlinedInput
                      id="username-login"
                      type="username"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="john"
                      fullWidth
                      size="small"
                      error={Boolean(touched.username && errors.username)}
                      inputProps={{ style: { fontSize: '0.875rem' } }}
                      InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                    />
                  </Stack>
                  {touched.username && errors.username && (
                    <FormHelperText error id="helper-text-username-signup">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phone-signup" sx={{ fontSize: '0.875rem' }}>Phone*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      size="small"
                      error={Boolean(touched.phone && errors.phone)}
                      id="phone-signup"
                      type="phone"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="+84"
                      inputProps={{ style: { fontSize: '0.875rem' } }}
                      InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                    />
                  </Stack>
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Box>
              </Stack>
              <Box>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup" sx={{ fontSize: '0.875rem' }}>Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{ style: { fontSize: '0.875rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Box>
              <Box>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup" sx={{ fontSize: '0.875rem' }}>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e)
                      changePassword(e.target.value)
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{ style: { fontSize: '0.875rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Stack>
                </FormControl>
              </Box>
              {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              )}
              <Box>
                <Typography variant="body2" fontSize="0.75rem">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#" color="rgb(22, 119, 255)" fontSize="0.75rem">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#" color="rgb(22, 119, 255)" fontSize="0.75rem">
                    Privacy Policy
                  </Link>
                </Typography>
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
                    Create Account
                  </Button>
                </AnimateButton>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}