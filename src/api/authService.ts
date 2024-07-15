import {axiosInstance} from "../../axiosInstance.ts"
import { API_URL } from '../constant/url.ts';
import { UserType } from '../types/User';

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    username: string;
    id: number; 
  }

export const authService = {
  async register(username: string, password: string): Promise<UserType> {
    const response = await axiosInstance.post<UserType>(`${API_URL}/users/register`, { username, password });
    return response.data;
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(`/auth/login`, { username, password });
    localStorage.setItem('access_token', response.data.access_token);
    document.cookie = `refresh_token=${response.data.refresh_token}; HttpOnly; Secure`;
    return response.data;
  },

  async getProfile(): Promise<UserType> {
    const response = await axiosInstance.get<UserType>(`/auth/profile`);
    return response.data;
  },

  async refreshToken(): Promise<string> {
    const response = await axiosInstance.post<{ access_token: string }>(`/auth/refresh`, {}, { withCredentials: true } );
    localStorage.setItem('access_token', response.data.access_token);
    return response.data.access_token;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
  }
};
