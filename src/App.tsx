import './App.scss';
import Header from './Components/Header/Header.tsx';
import HomeConnect from './Components/HomeConnect/HomeConnect.tsx';

function App() {
  return (
    <div className="app">
      <title>PennyPal</title>
      <meta
        name="description"
        content="PennyPal, Le compagnon de votre budget"
      />
      <Header />
      <HomeConnect />
    </div>
  );
}

export default App;
