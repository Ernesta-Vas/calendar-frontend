import axios from 'axios';

import {authService} from "./src/api/authService"

const API_URL = 'http://localhost:3000'; 

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRrefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await authService.refreshToken();

        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        isRefreshing = false;
        onRrefreshed(newToken);
        refreshSubscribers = [];

        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);