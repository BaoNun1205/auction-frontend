import {
  numberInputClasses
} from '@mui/base/Unstable_NumberInput'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'

export const StyledInputRoot = styled(Box)(({ theme }) => ({
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontWeight: 400,
  borderRadius: '8px',
  color: theme.palette.primary.textMain,
  background: theme.palette.primary.secondary,
  border: `1px solid ${theme.palette.primary.border}`,
  boxShadow: '0px 1px 2px rgba(0,0,0, 0.05)',
  display: 'grid',
  gridTemplateColumns: '1fr 19px',
  gridTemplateRows: '1fr 1fr',
  overflow: 'hidden',
  columnGap: '8px',
  padding: '4px',
  width: '100%',

  [`&.${numberInputClasses.focused}`]: {
    borderColor: theme.palette.primary.textMain,
    boxShadow: `0 0 0 1px ${theme.palette.primary.textMain}`
  },

  '&:hover': {
    borderColor: theme.palette.primary.hover
  },

  // firefox
  '&:focus-visible': {
    outline: 0
  }
}))

export const StyledInputElement = styled('input')(({ theme }) => ({
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: 1.5,
  gridColumn: '1/2',
  gridRow: '1/3',
  color: theme.palette.primary.textMain,
  background: 'inherit',
  border: 'none',
  borderRadius: 'inherit',
  padding: '8px 12px',
  outline: 0
}))

export const StyledButton = styled('button')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  appearance: 'none',
  padding: 0,
  width: '19px',
  height: '19px',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '0.875rem',
  lineHeight: 1,
  boxSizing: 'border-box',
  background: theme.palette.primary.main,
  border: 0,
  color: theme.palette.primary.textMain,
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '120ms',

  '&:hover': {
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    cursor: 'pointer'
  },

  [`&.${numberInputClasses.incrementButton}`]: {
    gridColumn: '2/3',
    gridRow: '1/2',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    border: '1px solid',
    borderBottom: 0,
    borderColor: theme.palette.primary.border,
    color: theme.palette.primary.textMain,

    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.textMain,
      borderColor: theme.palette.primary.textMain
    }
  },

  [`&.${numberInputClasses.decrementButton}`]: {
    gridColumn: '2/3',
    gridRow: '2/3',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    border: '1px solid',
    borderColor: theme.palette.primary.border,
    color: theme.palette.primary.textMain,

    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.textMain,
      borderColor: theme.palette.primary.textMain
    }
  },

  '& .arrow': {
    transform: 'translateY(-1px)'
  }
}))