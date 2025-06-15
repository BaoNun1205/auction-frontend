import React from 'react';
import { Box } from '@mui/material';
import Sidenav from '~/components/DefautComponent/SidenavComponent/Sidenav';
import { useAppStore } from '~/store/appStore';
import Header from '~/components/Customer/DefautComponent/HeaderComponent/Header';
function Dashboard({ children }) {
  const open = useAppStore((state) => state.dopen);

  return (
    <Box>
      <Sidenav />
      <Box
        sx={{
          padding: '24px',
          flexGrow: 1,
          marginLeft: open ? '200px' : '56px',
          transition: 'margin-left 0.4s ease'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Dashboard;
