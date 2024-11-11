import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { Box, IconButton } from '@mui/material'

export const SelectPage = styled(Select)(({ theme }) => ({
  height: 24,
  color: theme.palette.primary.textMain,
  '& .MuiSelect-select': {
    py: 0
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.textMain // Sử dụng màu từ theme
  }
}))

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.secondary,
  color: theme.palette.primary.textMain,
  borderColor: theme.palette.primary.border
}))

export const RowsPerPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(4)
}))

export const PageInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.textMain,
  '&.Mui-disabled': { color: theme.palette.primary.disable }
}))