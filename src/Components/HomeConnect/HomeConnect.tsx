import './HomeConnect.scss';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

function HomeConnect() {
  return (
    <div className="home-connect">
      <h1 className="h1">Accueil</h1>
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

        <div className="home-connect__demo">
          <p>Note : Il s'agit d'une version démo. L'inscription et la modification du mot de passe est désactivée.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeConnect;
