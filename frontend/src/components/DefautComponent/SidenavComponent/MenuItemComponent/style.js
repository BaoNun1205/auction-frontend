import {
  Button,
  Paper,
  MenuItem,
  styled,
  Box,
  Typography
} from '@mui/material'

export const MenuContainer = styled(Box)`
  width: 86px;
  margin: 1rem auto;
  position: relative;
`

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.textMain,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonHover
  },
  display: 'flex',
  width: '100%',
  height: 60,
  textTransform: 'none',
  borderRadius: 4
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.secondary,
  color: theme.palette.primary.textMain,
  marginLeft: theme.spacing(1),
  borderRadius: 8,
  overflow: 'hidden'
}))

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonHover
  }
}))

export const IconContainer = styled(Box)`
  position: relative;
  width: 24px;
  height: 24px;
  margin-bottom: 0.5rem;
`

export const ButtonContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

export const MenuItemName = styled(Typography)`
  font-size: 0.65rem;
`