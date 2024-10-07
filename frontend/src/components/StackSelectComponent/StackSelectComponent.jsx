import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { styled } from '@mui/system'

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '50%',
  '& .MuiOutlinedInput-root': {
    borderColor: theme.palette.primary.textMain,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.textMain
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.textMain
    },
    '& .MuiInputBase-input': {
      color: theme.palette.primary.textMain
    }
  },
  '& label': {
    color: theme.palette.primary.disable
  },
  '& fieldset': {
    borderColor: theme.palette.primary.border
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.textMain
  }
}))

const StackSelectComponent = ({ options, label, onChange, sx }) => {
  return (
    <CustomAutocomplete
      disablePortal
      options={options}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={sx}
    />
  )
}

export default StackSelectComponent

