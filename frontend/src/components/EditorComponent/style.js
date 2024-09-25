import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

export const StyledEditor = styled(Box)(({ theme }) => ({
  '& .ql-toolbar.ql-snow': {
    border: 'none',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color']),
    padding: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing(1),
    '& .ql-formats': {
      marginRight: '0 !important'
    },
    '& button': {
      width: 32,
      height: 32,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['background-color', 'color']),
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08)
      },
      '&.ql-active': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
        color: theme.palette.primary.main
      },
      '& svg': {
        width: 18,
        height: 18
      }
    },
    '& .ql-picker': {
      height: 32
    },
    '& .ql-picker-label': {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
      padding: theme.spacing(0.5, 1),
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.create(['background-color']),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08)
      },
      '&::before': {
        marginRight: theme.spacing(0.5)
      }
    },
    '& .ql-picker-options': {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1)
    }
  },
  '& .ql-container.ql-snow': {
    border: 'none',
    ...theme.typography.body2,
    fontFamily: theme.typography.fontFamily
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: '100%',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'color']),
    padding: theme.spacing(2),
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    }
  }
}))

export const FullscreenWrapper = styled(Box)(({ theme, isFullscreen }) => ({
  position: isFullscreen ? 'fixed' : 'relative',
  top: isFullscreen ? 0 : 'auto',
  left: isFullscreen ? 0 : 'auto',
  right: isFullscreen ? 0 : 'auto',
  bottom: isFullscreen ? 0 : 'auto',
  zIndex: isFullscreen ? theme.zIndex.modal : 'auto',
  width: '100%',
  height: isFullscreen ? '100vh' : 'auto',
  backgroundColor: theme.palette.background.default,
  padding: isFullscreen ? theme.spacing(2) : 0,
  transition: theme.transitions.create(['padding', 'background-color'])
}))