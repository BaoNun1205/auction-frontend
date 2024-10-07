import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { StyledSelectComponent } from './style'

const SelectComponent = ({ menuItems, placeholder, ...props }) => {
  return (
    <StyledSelectComponent
      {...props}
    >
      <MenuItem value="" disabled>{placeholder}</MenuItem>
      {menuItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </StyledSelectComponent>
  )
}

export default SelectComponent