import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'

export const CustomSelect = styled(Select)(({ theme }) => ({
  height: 24,
  color:  theme.palette.primary.textMain,
  '& .MuiSelect-select': {
    py: 0
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none' // Bỏ border
  },
  '& .MuiSvgIcon-root': {
    color:  theme.palette.primary.textMain
  }
}))