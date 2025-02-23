import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useConfirmAccount } from '~/hooks/authHook'
import { Box, Button, CircularProgress, Container, Typography, Alert } from '@mui/material'

const ConfirmAccount = () => {
  const [message, setMessage] = useState('')
  const [token, setToken] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { mutate: confirmAccount, isLoading: isConfirming } = useConfirmAccount()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    console.log(token)
    setToken(token)
  }, [location])

  const handleConfirm = async () => {
    if (token) {
      confirmAccount(token, {
        onSuccess: (data) => {
          console.log(data.code)
          if (data.code === 200) {
            setMessage('Account confirmed successfully!')
            // Redirect to login or home page
            setTimeout(() => navigate('/authentication'), 3000)
          } else {
            setMessage('Failed to confirm account. Please try again.')
          }
        },
        onError: (error) => {
          setMessage('An error occurred. Please try again.')
        }
      })
    } else {
      setMessage('Invalid token.')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Confirm Account
        </Typography>
        {message && (
          <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={isConfirming}
          sx={{ mt: 2 }}
        >
          {isConfirming ? <CircularProgress size={24} /> : 'Confirm'}
        </Button>
      </Box>
    </Container>
  )
}

export default ConfirmAccount