import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
  Box
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoginIcon from '@mui/icons-material/Login'
// import { getToken } from '~/api/auth'
import { useGetToken } from '~/hooks/auth'
import { jwtDecode } from 'jwt-decode'
import { useAppStore } from '~/store/appStore'

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false)
  const setToken = useAppStore((state) => state.setToken) // Lấy hàm setToken từ store
  const { mutate: getToken, isLoading: isGettingToken } = useGetToken()

  //Inputs
  const [usernameInput, setUsernameInput] = useState()
  const [passwordInput, setPasswordInput] = useState()
  const [rememberMe, setRememberMe] = useState()

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  // Overall Form Validity
  const [formValid, setFormValid] = useState()
  const [success, setSuccess] = useState()

  const navigate = useNavigate()

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // Label for Checkbox
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  // Validation for onBlur username
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true)
      return
    }

    setUsernameError(false)
  }

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true)
      return
    }

    setPasswordError(false)
  }

  //handle Submittion
  const handleSubmit = async () => {
    setSuccess(null)

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        'Password is set btw 5 - 20 characters long. Please Re-Enter'
      )
      return
    }
    setFormValid(null)

    // Proceed to use the information passed
    console.log('username : ' + usernameInput)
    console.log('Password : ' + passwordInput)
    console.log('Remember : ' + rememberMe)

    getToken({ username: usernameInput, password: passwordInput }, {
      onSuccess: (response) => {
        const code = response.code
        if (code === 1005) {
          setFormValid('Wrong username or password. Please try again.')
          return
        }
        if (code === 1022) {
          setFormValid('Account unverified. Please verify your account first.')
          return
        }

        const token = response.result.token

        // Giải mã token để kiểm tra quyền
        const decodedToken = jwtDecode(token)
        const userRoles = decodedToken.scope

        // Kiểm tra quyền trong scope
        if (!userRoles.includes('ROLE_ADMIN')) {
          setFormValid('You do not have the required permissions to log in.')
          return
        }

        setToken(token) // Lưu token vào zustand store
        setSuccess('Form Submitted Successfully')
        navigate('/') // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      },
      onError: (error) => {
        console.error('Error:', error)
        setFormValid('An error occurred. Please try again.')
      }
    })
  }

  return (
    <Box sx={{ width: '500px', margin: '0 auto' }}>
      <Box sx={{ marginTop: '10px' }}>
        <TextField
          label="Username"
          fullWidth
          error={usernameError}
          id="standard-basic"
          variant="standard"
          sx={{ width: '100%' }}
          value={usernameInput}
          InputProps={{}}
          size="medium"
          onBlur={handleUsername}
          onChange={(event) => {
            setUsernameInput(event.target.value)
          }}
        />
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel
            error={passwordError}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            error={passwordError}
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => {
              setPasswordInput(event.target.value)
            }}
            value={passwordInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>

      <Box sx={{ fontSize: '1rem', marginTop: '10px' }}>
        <Checkbox
          style={{ padding: '10px 10px 10px 0' }}
          {...label}
          size="medium"
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember Me
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
          size="large"
        >
          LOG IN
        </Button>
      </Box>

      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{ width: '100%', paddingTop: '20px' }} spacing={2}>
          <Alert severity="error" size="medium">
            {formValid}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: '100%', paddingTop: '20px' }} spacing={2}>
          <Alert severity="success" size="medium">
            {success}
          </Alert>
        </Stack>
      )}

      <Box sx={{ marginTop: '30px', fontSize: '1rem' }} margin="left">
        <a>Forgot Password</a>
        <br />
        Do you have an account ?{' '}
        <small style={{ textDecoration: 'underline', color: 'blue' }}>
          Sign Up
        </small>
      </Box>
    </Box>
  )
}