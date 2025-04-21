import { createTheme } from '@mui/material';
import { primaryColor } from '../../style';

const customTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});

export default customTheme;