import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'

export const StyledSelectComponent = styled(Select)(({ theme }) => ({
  bgcolor: theme.palette.primary.secondary,
  color: theme.palette.text.secondary,
  minWidth: 120,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.borderHover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.borderFocus
  },
  '& .MuiSelect-icon': {
    color: theme.palette.primary.textMain
  }
}))