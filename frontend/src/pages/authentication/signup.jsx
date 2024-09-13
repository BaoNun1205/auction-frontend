import React, { useState } from 'react'

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
  Box
} from '@mui/material'

// Material UI Icon Imports
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoginIcon from '@mui/icons-material/Login'

// Validations

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false)

  //Inputs
  const [usernameInput, setUsernameInput] = useState()
  const [emailInput, setEmailInput] = useState()
  const [passwordInput, setPasswordInput] = useState()

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  // Overall Form Validity
  const [formValid, setFormValid] = useState()
  const [success, setSuccess] = useState()

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true)
      return
    }

    setUsernameError(false)
  }

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput))
    if (!isEmail(emailInput)) {
      setEmailError(true)
      return
    }

    setEmailError(false)
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
  const handleSubmit = () => {
    setSuccess(null)
    //First of all Check for Errors

    // IF username error is true
    if (usernameError || !usernameInput) {
      setFormValid(
        'Username is set btw 5 - 15 characters long. Please Re-Enter'
      )
      return
    }

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid('Email is Invalid. Please Re-Enter')
      return
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        'Password is set btw 5 - 20 characters long. Please Re-Enter'
      )
      return
    }
    setFormValid(null)

    // Proceed to use the information passed
    console.log('Username : ' + usernameInput)
    console.log('Email : ' + emailInput)
    console.log('Password : ' + passwordInput)

    //Show Successfull Submittion
    setSuccess('Form Submitted Successfully')
  }

  return (
    <Box sx={{ width: '500px', margin: '0 auto' }}>
      <Box sx={{ marginTop: '20px' }}>
        <TextField
          error={usernameError}
          label="Username"
          id="standard-basic"
          variant="standard"
          sx={{ width: '100%' }}
          size="medium"
          value={usernameInput}
          InputProps={{}}
          onChange={(event) => {
            setUsernameInput(event.target.value)
          }}
          onBlur={handleUsername}
        />
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: '100%' }}
          value={emailInput}
          InputProps={{}}
          size="medium"
          onBlur={handleEmail}
          onChange={(event) => {
            setEmailInput(event.target.value)
          }}
        />
      </Box>
      <Box sx={{ marginTop: '20px' }}>
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

      <Box sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
          size="large"
        >
          SIGN UP
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
        Do you have an account ?{' '}
        <small style={{ textDecoration: 'underline', color: 'blue' }}>
          Log In
        </small>
      </Box>
    </Box>
  )
}