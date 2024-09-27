import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

export const StyledTextField = styled(TextField)({
    '&:hover': {
      borderColor: 'blue', // Change border color on hover
      backgroundColor: 'lightgray', // Change background color on hover
    },
  });