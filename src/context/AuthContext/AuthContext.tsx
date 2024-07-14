import React, { createContext, useReducer, useLayoutEffect } from 'react';

import { authService } from '../../api/authService';

import { AuthAction, AuthContextProps, AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const user = await authService.getProfile();
          console.log(user, 'user')
          dispatch({ type: 'LOGIN', payload: user });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('access_token');
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
