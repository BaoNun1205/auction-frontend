import React from 'react';
import { Box } from '@mui/material';
import Sidenav from '~/components/DefautComponent/SidenavComponent/Sidenav';
import { useAppStore } from '~/store/appStore'; // Truyền trạng thái mở/đóng vào
import Header from '~/components/Customer/DefautComponent/HeaderComponent/Header';
function Dashboard({ children }) {
  const open = useAppStore((state) => state.dopen); // Truyền giá trị open từ Zustand để kiểm soát sidebar

  return (
    <Box>
      <Sidenav />
      <Box
      
        sx={{
          flexGrow: 1,
          padding: '24px',
          marginLeft: open ? '200px' : '56px', // Khi sidebar mở hoặc đóng, content sẽ shift ra ngoài hoặc thu vào
          transition: 'margin-left 0.4s ease', // Cải thiện hiệu ứng di chuyển khi mở/đóng sidebar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Dashboard;
