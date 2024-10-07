import React from 'react'
import { StyledTextField } from './style'

const TextFieldComponent = ({ label, value, onChange, ...props }) => {
  return (
    <StyledTextField
      fullWidth
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      margin="normal"
      required
      {...props}
    />
  )
}

export default TextFieldComponent