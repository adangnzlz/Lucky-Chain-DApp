import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layouts/Sidebar/Sidebar';
import HeaderMobile from './layouts/Sidebar/HeaderMobile';
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { AppKitNetwork, sepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'




import './App.scss';
import { projectId, wagmiConfig } from './wagmiConfig';

const Home = React.lazy(() => import('./pages/Home/Home'));
const LotteryETH = React.lazy(() => import('./pages/LotteryETH/LotteryETH'));
const LotteryLINK = React.lazy(() => import('./pages/LotteryLINK/LotteryLINK'));


const queryClient = new QueryClient()
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia]


createAppKit({
  showWallets: false,
  adapters: [new WagmiAdapter({
    networks,
    projectId,

    ssr: false
  })],
  networks,
  projectId,
  metadata: {
    name: 'Lucky Chain',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  },
  allWallets: 'HIDE', // default to SHOW
  features: {
    analytics: true,
    email: false, // default to true
    socials: [],
    emailShowWallets: true, // default to true
  }
})

function App() {
  // const [count, setCount] = useState(0);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider
          disableTransitionOnChange>
          <CssBaseline />
          <Router>
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
              <HeaderMobile />
              <Sidebar />
              <Box component="main" className="MainContent">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lottery-eth" element={<LotteryETH />} />
                    <Route path="/lottery-link" element={<LotteryLINK />} />
                  </Routes>
                </Suspense>

              </Box>
            </Box>
          </Router>
        </CssVarsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
