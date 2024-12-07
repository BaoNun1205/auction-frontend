import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateRangeFilter = ({ dateRange, onDateRangeChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Khoảng thời gian
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DatePicker
            label="Từ ngày"
            value={dateRange[0]}
            onChange={(newValue) => onDateRangeChange([newValue, dateRange[1]])}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Đến ngày"
            value={dateRange[1]}
            onChange={(newValue) => onDateRangeChange([dateRange[0], newValue])}
            renderInput={(params) => <TextField {...params} />}
            minDate={dateRange[0]}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;

