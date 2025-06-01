import { styled } from '@mui/material/styles'
import { createTheme, Chip } from '@mui/material'

// Create a theme instance
export const theme = createTheme({
  palette: {
    primary: {
      main: '#b41712',
      light: '#4791db',
      dark: '#115293'
    },
    secondary: {
      main: '#dc004e'
    },
    error: {
      main: '#f44336',
      light: '#e57373'
    },
    success: {
      main: '#4caf50',
      light: '#81c784'
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d'
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
})

// Styled components
export const InfoChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  borderRadius: 16,
  padding: '0 4px'
}))
