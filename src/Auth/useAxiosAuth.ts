import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import axiosAuthInstance from './axiosAuthInstance';

const API_URL = import.meta.env.VITE_API_URL;

const useAxiosAuth = () => {
  const { accessToken, logout, setAccessToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosAuthInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosAuthInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const res = await axios.post(
              `${API_URL}/auth/RefreshToken`,
              {},
              { withCredentials: true }
            );
            const newToken = res.data.token;

            localStorage.setItem('accessToken', newToken);
            setAccessToken(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosAuthInstance(originalRequest);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosAuthInstance.interceptors.request.eject(requestInterceptor);
      axiosAuthInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, logout, setAccessToken]);

  return axiosAuthInstance;
};

export default useAxiosAuth;
