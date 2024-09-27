import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { StyledTextField } from './style';

export default function TextFieldComponent() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <StyledTextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  );
}