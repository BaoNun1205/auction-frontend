import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'

export const StyledSearchTextField = styled(TextField)(({ theme }) => ({
  bgcolor: 'primary.secondary',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: theme.palette.primary.border },
    '&:hover fieldset': { borderColor: theme.palette.primary.borderHover },
    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.borderFocus }
  },
  '& .MuiInputBase-input': { color: theme.palette.primary.textSecondary },
  '& .MuiInputBase-input::placeholder': { color: theme.palette.primary.textSecondary }
}))