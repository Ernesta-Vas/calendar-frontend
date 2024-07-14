export type keysRoutes = 'notFound' | 'app' | 'login' | 'register' | 'weekCalendar';

export type IRoutes = {
  [K in keysRoutes]: {
    urlAll: string;
    key: string;
    label?: string;
  };
};

export const ROUTES: IRoutes = {
  notFound: {
    urlAll: '*',
    key: '1',
  },
  app: {
    urlAll: '/calendar-frontend',
    key: '2',
    label: 'Home',
  },
  login: {
    urlAll: '/calendar-frontend/login',
    key: '3',
  },
  register: {
    urlAll: '/calendar-frontend/register',
    key: '4',
    label: 'Register',
  },
  weekCalendar: {
    urlAll: '/calendar-frontend/week-calendar',
    key: '5',
    label: 'Week Calendar',
  },
};
