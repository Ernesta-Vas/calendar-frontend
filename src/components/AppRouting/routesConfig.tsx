import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '../../constant/routes';
import { Login } from '../../pages/Login/Login';
import { Register } from '../../pages/Register/Register';
import { WeekCalendar } from '../../pages/WeekCalendar/WeekCalendar';
import { Header } from '../Header/Header';

export const routesConfig = (isLogged: boolean) =>
  createBrowserRouter([
    {
      path: ROUTES.app.urlAll,
      element: isLogged ? (
        <>
          <Header />
          <WeekCalendar />
        </>
      ) : (
        <Navigate to={ROUTES.login.urlAll} />
      ),
      children: [],
    },
    {
      path: ROUTES.login.urlAll,
      element: isLogged ? <Navigate to={ROUTES.app.urlAll} /> : <Login />,
    },
    {
      path: ROUTES.register.urlAll,
      element: isLogged ? <Navigate to={ROUTES.app.urlAll} /> : <Register />,
    },
    {
      path: ROUTES.notFound.urlAll,
      element: <Navigate to={ROUTES.login.urlAll} />,
    },
  ]);