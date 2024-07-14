export interface User {
    username: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }
  
  export type AuthAction =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };
  
  export interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
  }
  