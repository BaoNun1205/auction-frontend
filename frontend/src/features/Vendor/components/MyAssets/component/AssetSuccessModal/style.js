import { Chip, styled } from '@mui/material'

export const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '& .MuiChip-icon': {
    color: 'inherit'
  }
}))