// auth/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken')
  );

  const isAuthenticated = !!accessToken;

  const login = async (email: string, password: string) => {
    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const res = await axios.post(
      `${API_URL}/Auth/Login`,
      { email, password },
      config
    );
    setAccessToken(res.data.token);
    localStorage.setItem('accessToken', res.data.token);
  };

  const logout = async () => {
    await axios.post('/auth/logout', {}, { withCredentials: true });
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.post(
          '/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        setAccessToken(res.data.token);
        localStorage.setItem('accessToken', res.data.token);
      } catch (err) {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
