import { orange, grey } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  auction: {
    appBarHeight: '120px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'rgb(20, 26, 33)',
          secondary: '#1c252e',
          extra: '#4ade80',
          textMain: '#ffffff',
          textSecondary: '#637381',
          border: '#637381',
          borderHover: '#ffffff',
          borderFocus: '#ffffff',
          buttonHover: '#28323d',
          disable: grey[700]
        },
        secondary: grey
      }
    },
    dark: {
      palette: {
        primary: {
          main: 'rgb(20, 26, 33)',
          secondary: '#1c252e',
          extra: '#4ade80',
          textMain: '#000000',
          textSecondary: '#637381',
          border: '#637381',
          borderHover: '#ffffff',
          borderFocus: '#ffffff',
          buttonHover: '#28323d',
          disable: grey[700]
        },
        secondary: orange
      }
    }
  }
})

export default theme