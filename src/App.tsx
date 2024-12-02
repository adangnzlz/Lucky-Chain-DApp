// import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './layouts/Sidebar/Sidebar';
import HeaderMobile from './layouts/Sidebar/HeaderMobile';
import './App.scss';
const Home = React.lazy(() => import('./pages/Home/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));

function App() {
  // const [count, setCount] = useState(0);

  return (
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
  );
}

export default App;
