import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { StyledSelectComponent } from './style'

const SelectComponent = ({ defaultValue, displayEmpty, menuItems, placeholder }) => {
  return (
    <StyledSelectComponent
      defaultValue={defaultValue}
      displayEmpty={displayEmpty}
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