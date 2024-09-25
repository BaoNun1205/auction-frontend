import React from 'react'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import LockIcon from '@mui/icons-material/Lock'
import FaceIcon from '@mui/icons-material/Face'
import Box from '@mui/material/Box'
import Login from '~/features/authentication/login'
import Signup from '~/features/authentication/signup'

function Authentication() {
  const [checked, setChecked] = useState(true)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: '10px',
          width: '500px'
        }}
      >
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Box sx={{ textAlign: 'center' }}>
            {checked ? (
              <Chip
                icon={<LockIcon />}
                label="Log In"
                variant="outlined"
                color="info"
              />
            ) : (
              <Chip
                icon={<FaceIcon />}
                label="Sign Up"
                variant="outlined"
                color="info"
              />
            )}
            <br />
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
          {checked ? <Login /> : <Signup />}
        </Paper>
      </Box>
    </Box>
  )
}

export default Authentication