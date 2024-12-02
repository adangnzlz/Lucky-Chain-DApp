import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import './index.scss';
import './assets/styles/helpers.scss';

declare global {
  interface Window {
    ethereum: ExtendedEip1193Provider | undefined;
  }
}

const customTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#e5f7f5',
          100: '#c1ece7',
          200: '#99e0d8',
          300: '#70d4ca',
          400: '#51c9be',
          500: '#37aa9d', // Color principal
          600: '#309a8e',
          700: '#298a7f',
          800: '#217a71',
          900: '#175c54',
        },
      },
    },
    light: {
      palette: {
        primary: {
          50: '#e5f7f5',
          100: '#c1ece7',
          200: '#99e0d8',
          300: '#70d4ca',
          400: '#51c9be',
          500: '#37aa9d', // Color principal
          600: '#309a8e',
          700: '#298a7f',
          800: '#217a71',
          900: '#175c54',
        },
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider theme={customTheme} defaultMode="dark">
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
