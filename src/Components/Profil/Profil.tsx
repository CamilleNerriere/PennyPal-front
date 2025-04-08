import './Profil.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, Button } from 'antd';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import MessageApi from '../MessagesApi/MessageApi.ts';

function Profil({ messageApi }: { messageApi: any }) {
  const { userInfo } = useFetchUserInfos();
  const [changePassword, setChangePassword] = useState(false);
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const axiosAuth = useAxiosAuth();

  const handleSubmit = () => {
    axiosAuth
      .put('/Auth/ChangePassword', {
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          MessageApi(
            messageApi,
            'Mot de passe mis à jour avec succès',
            'success'
          );
        } else {
          MessageApi(
            messageApi,
            'Erreur lors de la mise à jour du mot de passe',
            'error'
          );
        }
      })
      .catch((err) => {
        console.log(err);
        MessageApi(
          messageApi,
          'Erreur lors de la mise à jour du mot de passe',
          'error'
        );
      });
    console.log(formValues);
  };

  return (
    <div className="profil">
      <h1 className="h1">Profil</h1>
      <div className="profil__content">
        <div className="profil__description">
          <div className="profil__description-firstname">
            {userInfo.firstname}
          </div>
          <div className="profil__description-lastname">
            {userInfo.lastname}
          </div>
          <div className="profil__description-email">{userInfo.email}</div>
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
