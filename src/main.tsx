import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssVarsProvider } from '@mui/joy/styles';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
