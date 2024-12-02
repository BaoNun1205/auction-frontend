import {
  Chip,
  styled
} from '@mui/material'

export const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  minWidth: 120,
  color: theme.palette.getContrastText(
    status === '2' ? theme.palette.success.main :
      status === '0' ? theme.palette.error.main :
        theme.palette.warning.main
  ),
  backgroundColor:
        status === '2' ? theme.palette.success.main :
          status === '0' ? theme.palette.error.main :
            theme.palette.warning.main
}))
