import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

const SearchTextField = () => {
  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      sx={{
        bgcolor: 'primary.secondary',
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'primary.border' },
          '&:hover fieldset': { borderColor: 'primary.borderHover' }, // Màu khi hover
          '&.Mui-focused fieldset': { borderColor: 'primary.borderFocus' } // Màu khi focus
        },
        '& .MuiInputBase-input': { color: 'grey.500' },
        '& .MuiInputBase-input::placeholder': { color: 'grey.100' }
      }}
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