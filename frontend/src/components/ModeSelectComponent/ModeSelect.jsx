import React from 'react';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ModeSelect() {
  const select = [
    { value: 'light', icon: <Brightness7Icon /> },
    { value: 'dark', icon: <Brightness4Icon /> },
  ];
  const { mode, setMode } = useColorScheme();

  const handleToggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const currentIcon = select.find((item) => item.value === mode)?.icon;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IconButton
        onClick={handleToggle}
        sx={(theme) => ({ bgcolor: theme.palette.primary.main, color: theme.palette.primary.textMain, margin: 1 })}
      >
        {currentIcon}
      </IconButton>
    </Box>
  );
}

export default ModeSelect;