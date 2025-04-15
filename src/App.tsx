import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { message } from 'antd';
import { useAuth } from './Auth/AuthContext.tsx';
import ProtectedRoute from './Auth/ProtectedRoute.tsx';
import Header from './Components/Header/Header.tsx';
import HomeConnect from './Components/HomeConnect/HomeConnect.tsx';
import Register from './Components/Register/Register.tsx';
import ConfirmSignIn from './Components/ConfirmSignIn/ConfirmSignIn.tsx';
import SignIn from './Components/SignIn/SignIn.tsx';
import HomeConnected from './Components/HomeConnected/HomeConnected.tsx';
import UserExpense from './Components/UserExpenses/UserExpense.tsx';
import Tendances from './Components/Tendances/Tendances.tsx';
import Gestion from './Components/Gestion/Gestion.tsx';
import Profil from './Components/Profil/Profil.tsx';
import NotFound from './Components/NotFound/NotFound.tsx';
import NavBar from './Components/NavBar/NavBar.tsx';
import './App.scss';

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const { isAuthenticated } = useAuth();

  const isDemo = import.meta.env.VITE_IS_DEMO === 'true';

  return (
    <div className="app">
      {contextHolder}
      <title>PennyPal</title>
      <meta
        name="description"
        content="PennyPal, Le compagnon de votre budget"
      />
      <Header />
      <div className="app-body">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <HomeConnect isDemo={isDemo} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register messageApi={messageApi} isDemo={isDemo} />}
          />
          <Route
            path="/confirm-signin"
            element={
              <ProtectedRoute>
                <ConfirmSignIn />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn messageApi={messageApi} />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeConnected messageApi={messageApi} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <UserExpense messageApi={messageApi} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tendances"
            element={
              <ProtectedRoute>
                <Tendances messageApi={messageApi} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion"
            element={
              <ProtectedRoute>
                <Gestion messageApi={messageApi} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <Profil messageApi={messageApi} isDemo={isDemo} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
      <NavBar />
    </div>
  );
}

export default App;
