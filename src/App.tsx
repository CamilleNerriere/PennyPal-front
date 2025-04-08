import './App.scss';
import { Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './Auth/AuthContext.tsx';
import ProtectedRoute from './Auth/ProtectedRoute.tsx';
import { message } from 'antd';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <AuthProvider>
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
            <Route path="/" element={<HomeConnect />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/confirm-signin"
              element={
                <ProtectedRoute>
                  <ConfirmSignIn />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomeConnected />
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
                  <Tendances />
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
                  <Profil messageApi={messageApi} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/*afficher seulement si co*/}
        <NavBar />
      </div>
    </AuthProvider>
  );
}

export default App;
