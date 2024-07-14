import { FC, useMemo } from 'react';
import { RouterProvider as Router } from 'react-router';
import { useContext } from 'react';
import { routesConfig } from './routesConfig';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useToast } from '../../context/ToastContext/ToastContext';
import { Toast } from '../Toast/Toast';


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