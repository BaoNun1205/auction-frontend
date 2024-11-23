import { styled } from '@mui/material/styles';
import { Box, TextField, Checkbox, Button, Tabs, Tab, Popover, ListItem } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#b41712',
  '&.Mui-checked': {
    color: '#b41712',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#b41712',
  color: 'white',
  paddingX: theme.spacing(4),
  '&:hover': {
    backgroundColor: '#8B0000',
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTab-root': { minWidth: 0 },
  '& .Mui-selected': { color: '#b41712' },
  '& .MuiTabs-indicator': { backgroundColor: '#b41712' },
}));

export const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 'auto',
  },
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingY: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
}));