import './Profil.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, Button } from 'antd';

function Profil() {
  const [changePassword, setChangePassword] = useState(false);
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = () => {
    console.log(formValues);
  };

  return (
    <div className="profil">
      <h1>Profil</h1>
      <div className="profil__content">
        <div className="profil__description">
          <div className="profil__description-firstname">Camille</div>
          <div className="profil__description-lastname">Nerriere</div>
          <div className="profil__description-email">
            camille.nerriere@proton.me
          </div>
        </div>
        <div className="profil__edit">
          <div
            className="profil__edit--title"
            onClick={() => setChangePassword(!changePassword)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPlus} /> Changer le mot de passe
          </div>
          {changePassword && (
            <form className="profil__edit--form">
              <Input.Password
                value={formValues.password}
                placeholder="Nouveau mot de passe"
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <Input.Password
                value={formValues.confirmPassword}
                placeholder="Confirmation mot de passe"
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
              <Button className="button" type="primary" onClick={handleSubmit}>
                Ok
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profil;
