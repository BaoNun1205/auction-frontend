import { styled } from '@mui/material/styles';
import { Dialog, FormControl } from '@mui/material';

export const primaryColor = '#b41712';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: primaryColor,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.common.white,
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.24)',
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)',
    '&.Mui-focused': {
      color: primaryColor,
    },
  },
}));

export const StyledFormControl = styled(FormControl)({
  '& .MuiSelect-select': {
    paddingTop: '16.5px',
    paddingBottom: '16.5px',
  },
});