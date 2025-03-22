import './HomeConnect.scss';
import { Button } from 'antd';

function HomeConnect() {
  return (
    <div className="home-connect">
      <h1>Accueil</h1>
      <div className="home-connect__wrapper">
        <Button className="button" type="primary">
          Se connecter
        </Button>
        <Button className="button" type="primary">
          S'inscrire
        </Button>
      </div>
    </div>
  );
}

export default HomeConnect;
