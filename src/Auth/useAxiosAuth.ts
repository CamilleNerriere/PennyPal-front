// auth/useAxiosAuth.ts
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const useAxiosAuth = () => {
  const { accessToken, logout, setAccessToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    // Ajoute l'Authorization header
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepte les erreurs 401
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const res = await axios.post(
              `{API_URL}/auth/refresh-token`,
              {},
              { withCredentials: true }
            );
            const newToken = res.data.token;

            localStorage.setItem('accessToken', newToken);
            setAccessToken(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, logout, setAccessToken]);

  return axiosInstance;
};

export default useAxiosAuth;
