import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from './theme';
import App from './App.jsx';
import { useAppStore } from './store/appStore';

const queryClient = new QueryClient();

const RootComponent = () => {
  const { auth } = useAppStore();

  return (
    <QueryClientProvider client={queryClient}>
      {auth.role === 'ROLE_ADMIN' ? (
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      ) : (
        <>
          <CssBaseline />
          <App />
        </>
      )}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);