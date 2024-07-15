import React from 'react';
import { Helmet } from 'react-helmet';

import { RouterProvider } from './components/AppRouting/RouterProvider';
import { FontLoader } from './components/FontLoader/FontLoader';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { DateProvider } from './context/DateContext/DateContext';
import { ToastProvider } from './context/ToastContext/ToastContext';
import { GlobalStyle } from './GlobalStyle';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DateProvider>
        <ToastProvider>
          <FontLoader/>
          <GlobalStyle />
          <RouterProvider/>
        </ToastProvider>
      </DateProvider>
    </AuthProvider>
  );
};

export default App;
