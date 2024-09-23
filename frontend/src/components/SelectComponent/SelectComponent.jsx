import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const SelectComponent = ({ defaultValue, displayEmpty, menuItems, placeholder }) => {
  return (
    <Select
      defaultValue={defaultValue}
      displayEmpty={displayEmpty}
      sx={{
        bgcolor: 'primary.secondary',
        color: 'grey.500',
        minWidth: 120,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.border'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.borderHover'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.borderFocus'
        },
        '& .MuiSelect-icon': {
          color: 'primary.textMain'
        }
      }}
    >
      <MenuItem value="" disabled>{placeholder}</MenuItem>
      {menuItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectComponent