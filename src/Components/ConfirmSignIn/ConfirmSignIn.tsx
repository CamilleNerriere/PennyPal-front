import './ConfirmSignIn.scss';
import { Button } from 'antd';

function ConfirmSignIn() {
  return (
    <div className="ConfirmSignIn">
      <h1 className="h1">Inscription terminée</h1>
      <div className="ConfirmSignIn__content">
        <p>Votre inscription est terminée. Connectez-vous.</p>
        <div className="ConfirmSignIn__link">
          <Button className="button" type="primary" htmlType="button">
            <a href="/signin">Se connecter</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSignIn;
