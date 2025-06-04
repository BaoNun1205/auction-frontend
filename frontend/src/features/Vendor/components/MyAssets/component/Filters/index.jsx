import React from 'react';
import { TextField, Select, MenuItem, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filters = ({ searchTerm, setSearchTerm, priceFilter, setPriceFilter }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
    <TextField
      fullWidth
      placeholder="Tìm kiếm theo tên vật phẩm"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          '&:hover .MuiOutlinedInput-notchedOutline': {},
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {},
        },
      }}
    />
    <Select
      value={priceFilter}
      onChange={(e) => setPriceFilter(e.target.value)}
      displayEmpty
      variant="outlined"
      startAdornment={
        <InputAdornment position="start">
          <FilterListIcon />
        </InputAdornment>
      }
      sx={{
        minWidth: { xs: '100%', sm: 200 },
        borderRadius: '12px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '12px',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {},
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {},
      }}
    >
      <MenuItem value="">Tất cả giá</MenuItem>
      <MenuItem value="1000000">Dưới 1.000.000₫</MenuItem>
      <MenuItem value="5000000">Dưới 5.000.000₫</MenuItem>
      <MenuItem value="10000000">Dưới 10.000.000₫</MenuItem>
    </Select>
  </Box>
);

export default Filters;