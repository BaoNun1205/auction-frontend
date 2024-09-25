import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'block',
  color: theme.palette.primary.textMain
}))

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  minHeight: 48,
  justifyContent: 'initial',
  margin: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.buttonHover
  }
}))

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 0,
  marginRight: theme.spacing(2),
  justifyContent: 'center',
  color: theme.palette.primary.textMain
}))