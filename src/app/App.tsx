import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './layouts/Sidebar/Sidebar';
import HeaderMobile from './layouts/Sidebar/HeaderMobile';

import './App.scss';



import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";
import { wagmiConfig } from '../wagmiConfig';
import RouterContent from './RouterContent';


const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <CssVarsProvider
            disableTransitionOnChange>
            <CssBaseline />
            <Router>
              <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <HeaderMobile />
                <Sidebar />
                <Box component="main" className="MainContent">
                  <RouterContent></RouterContent>
                </Box>
              </Box>
            </Router>
          </CssVarsProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
