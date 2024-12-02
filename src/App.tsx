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
import { http, createConfig } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'




import './App.scss';
const Home = React.lazy(() => import('./pages/Home/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));


const queryClient = new QueryClient()
const projectId = 'a9507ff230a74185f9b0ff9586e8f162'
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia]

const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    walletConnect({
      projectId,
      qrModalOptions: {
        themeMode: 'dark',
        themeVariables: {
          "--wcm-z-index": "9999999",
          "--w3m-z-index": "9999999",
        }
      }
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})
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
                    <Route path="/Dashboard" element={<Dashboard />} />
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
