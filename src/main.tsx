import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import fr_FR from 'antd/locale/fr_FR';
import './styles/reset.scss';
import './styles/style.scss';
import 'antd/dist/reset.css';
import App from './App.tsx';
import { AuthProvider } from './Auth/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={fr_FR}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
