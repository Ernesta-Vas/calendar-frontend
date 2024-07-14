import { FC, useMemo , useContext } from 'react';
import { RouterProvider as Router } from 'react-router';


import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useToast } from '../../context/ToastContext/ToastContext';
import { Toast } from '../Toast/Toast';

import { routesConfig } from './routesConfig';


export const RouterProvider: FC = () => {
  const { state } = useContext(AuthContext);
  const routes = useMemo(() => routesConfig(state.isAuthenticated), [state.isAuthenticated]);
  const { toast, hideToast } = useToast();

  return (
    <>
      <Router router={routes} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );
};