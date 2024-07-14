import React from 'react';
import { Helmet } from 'react-helmet';

import { RouterProvider } from './components/AppRouting/RouterProvider';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { DateProvider } from './context/DateContext/DateContext';
import { ToastProvider } from './context/ToastContext/ToastContext';
import { GlobalStyle } from './GlobalStyle';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DateProvider>
        <ToastProvider>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <GlobalStyle />
          <RouterProvider/>
        </ToastProvider>
      </DateProvider>
    </AuthProvider>
  );
};

export default App;
