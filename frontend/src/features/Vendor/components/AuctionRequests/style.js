import {
  Box,
  Button,
  TableCell,
  Chip,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import 'react-quill/dist/quill.snow.css'

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

export const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  minWidth: 120,
  color: theme.palette.getContrastText(
    status === '1' ? theme.palette.success.main :
      status === '2' ? theme.palette.error.main :
        theme.palette.warning.main
  ),
  backgroundColor:
      status === '1' ? theme.palette.success.main :
        status === '2' ? theme.palette.error.main :
          theme.palette.warning.main
}))

export const AnimatedButton = styled(motion.div)({
  display: 'inline-block'
})

export const ImagePreview = styled(Box)({
  position: 'relative',
  height: 150,
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  cursor: 'pointer',
  borderRadius: 4,
  '&:hover': {
    opacity: 0.8
  }
})

export const ImageUploadButton = styled(Button)(({ theme }) => ({
  height: 150,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: 4,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))