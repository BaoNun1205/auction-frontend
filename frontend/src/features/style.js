import { styled } from '@mui/material/styles'
import { Box, TableCell, TableHead, TableRow, Checkbox } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'

export const StyledContainer = styled(Box)(({ theme }) => ({
  bgcolor: theme.palette.primary.main,
  color: theme.palette.primary.textMain
}))

export const StyledInnerBox = styled(Box)({
  maxWidth: '1200px',
  margin: 'auto'
})

export const StyledHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4)
}))

export const StyledTitleBox = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1)
}))

export const StyledSubtitleBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.textMain
}))

export const StyledSecondaryBox = styled(Box)(({ theme }) => ({
  bgcolor: theme.palette.primary.secondary,
  borderRadius: 3,
  boxShadow: `0px 4px 6px ${theme.palette.primary.buttonHover}`
}))

export const StyledControlBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  bgcolor: theme.palette.primary.secondary,
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(3)
}))

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 440,
  borderColor: theme.palette.primary.border,
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'darkgrey',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.primary.buttonHover
  },

  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden'
}))

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1000
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.textMain,
  fontWeight: 'normal'
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  cursor: 'pointer',
  '& td, & th': { borderColor: theme.palette.primary.border }
}))

export const StyledStatusBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: '9999px',
  fontSize: '0.75rem',
  display: 'inline-block'
}))

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.textMain,
  '&.Mui-checked': {
    color: theme.palette.primary.textMain
  }
}))

export const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.textMain
}))