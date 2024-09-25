import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { StyledSearchTextField } from './style'

const SearchTextField = () => {
  return (
    <StyledSearchTextField
      placeholder="Search..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'grey.500' }} />
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchTextField