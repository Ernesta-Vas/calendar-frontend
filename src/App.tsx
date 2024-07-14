import React from 'react';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { RouterProvider } from './components/AppRouting/RouterProvider';
import { GlobalStyle } from './GlobalStyle';
import { ToastProvider } from './context/ToastContext/ToastContext';
import { DateProvider } from './context/DateContext/DateContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DateProvider>
        <ToastProvider>
          <GlobalStyle />
          <RouterProvider />
        </ToastProvider>
      </DateProvider>
    </AuthProvider>
  );
};
export default App;
