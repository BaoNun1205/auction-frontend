import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import App from './App.jsx'

// const RootComponent = () => {
//   return (
//     <CssVarsProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </CssVarsProvider>
//   )
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>
)
