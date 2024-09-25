import { orange, grey } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { light } from '@mui/material/styles/createPalette'

// Create a theme instance.
const theme = extendTheme({
  auction: {
    appBarHeight: '120px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ffffff',
          secondary: '#ffffff',
          extra: '#4ade80',
          textMain: 'rgb(20, 26, 33)', // Inverted from light
          textSecondary: '#637381',
          textExtra: '#ffffff', // Inverted from light
          border: '#637381',
          borderHover: '#1c252e', // Inverted from light
          borderFocus: '#1c252e', // Inverted from light
          buttonHover: '#f4f6f8', // Inverted from light
          light: grey[700], // Inverted from light
          disable: grey[500], // Inverted from light
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: 'rgb(20, 26, 33)',
          secondary: '#1c252e',
          extra: '#4ade80',
          textMain: '#ffffff',
          textSecondary: '#637381',
          textExtra: '#000000',
          border: '#637381',
          borderHover: '#ffffff',
          borderFocus: '#ffffff',
          buttonHover: '#28323d',
          light: grey[300],
          disable: grey[700]
        }
      }
    }
  }
})

export default theme