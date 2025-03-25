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

function App() {
  return (
    <div className="app">
      <title>PennyPal</title>
      <meta
        name="description"
        content="PennyPal, Le compagnon de votre budget"
      />
      <Header />
      <Routes>
        <Route path="/" element={<HomeConnect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-signin" element={<ConfirmSignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home-connected" element={<HomeConnected />} />
        <Route path="/expenses" element={<UserExpense />} />
        <Route path="/tendances" element={<Tendances />} />
      </Routes>
    </div>
  );
}

export default App;
