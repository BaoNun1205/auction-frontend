import { TextField } from '@mui/material'
import { styled } from '@mui/system'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.textMain
    }
  },
  '& label': {
    color: theme.palette.primary.disable
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.textMain
  },
  '& fieldset': {
    borderColor: theme.palette.primary.border
  },
  '& .MuiInputBase-input': {
    color: theme.palette.primary.textMain
  }
}))