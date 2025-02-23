import React from 'react';
import { Box } from '@mui/material';
import Footer from '~/components/Customer/DefautComponent/FooterComponent/Footer';
import CategoryBar from '~/components/Customer/DefautComponent/HeaderComponent/CategoryBar';
import Header from '~/components/Customer/DefautComponent/HeaderComponent/Header';

function CustomerLayout({ children, isCategory = true }) {
  return (
    <>
      <Header />
      {isCategory ? (
        <CategoryBar />
      ) : (
        <Box sx={{ mt: 4 }} />
      )}
      {children}
      <Box sx={{ mt: 4 }} />
      {/* <Footer /> */}
    </>
  );
}

export default CustomerLayout;