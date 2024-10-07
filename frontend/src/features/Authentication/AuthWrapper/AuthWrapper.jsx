import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Box from '@mui/material/Box'

// project import
import AuthFooter from '~/features/Authentication/components/AuthFooter/AuthFooter'
import Logo from '~/features/Authentication/components/logo'
import AuthCard from '~/features/Authentication/AuthCard/AuthCard'

// assets
import AuthBackground from '~/assets/images/auth/AuthBackground'

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <AuthBackground />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Box sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}>
          <AuthCard>{children}</AuthCard>
        </Box>
        <Box sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Box>
      </Box>
    </Box>
  )
}

AuthWrapper.propTypes = { children: PropTypes.node }