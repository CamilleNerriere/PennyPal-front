import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
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

  const navigate = useNavigate();

  const logout = async () => {
    await axios.post(`${API_URL}/Auth/Logout`, {}, { withCredentials: true });
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const [loading, setLoading] = useState(true);

  let hasRefreshed = false;

  useEffect(() => {
    const refresh = async () => {
      if (hasRefreshed) return;
      hasRefreshed = true;

      try {
        const res = await axios.post(
          `${API_URL}/Auth/RefreshToken`,
          {},
          { withCredentials: true }
        );
        setAccessToken(res.data.token);
        localStorage.setItem('accessToken', res.data.token);
      } catch (err) {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
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
