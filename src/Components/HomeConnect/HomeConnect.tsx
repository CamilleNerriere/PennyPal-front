import './HomeConnect.scss';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

function HomeConnect() {
  return (
    <div className="home-connect">
      <h1>Accueil</h1>
      <div className="home-connect__wrapper">
        <Button className="button" type="primary">
          <NavLink to="/signin" aria-label="Se connecter" title="Se connecter">
            Se connecter
          </NavLink>
        </Button>
        <Button className="button" type="primary">
          <NavLink to="/register" aria-label="S'inscrire" title="S'inscrire">
            S'inscrire
          </NavLink>
        </Button>
      </div>
    </div>
  );
}

export default HomeConnect;
