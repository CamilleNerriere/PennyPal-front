import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, Button } from 'antd';
import useFetchUserInfos from '../../Hook/useFetchUserInfos.tsx';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import MessageApi from '../MessagesApi/MessageApi.ts';
import './Profil.scss';
import { handleApiError } from '../../utils/handleApiError.ts';
import { logError } from '../../utils/logError.ts';

function Profil({ messageApi, isDemo }: { messageApi: any; isDemo: boolean }) {
  const { userInfo } = useFetchUserInfos(messageApi);
  const [changePassword, setChangePassword] = useState(false);
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const axiosAuth = useAxiosAuth();

  const isInvalid = () => {
    if (!formValues.password || !formValues.confirmPassword) {
      return true;
    }

    if (formValues.confirmPassword !== formValues.confirmPassword) {
      return true;
    }
  };

  const handleSubmit = () => {
    axiosAuth
      .put('/Auth/ChangePassword', {
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      })
      .then(() => {
        MessageApi(
          messageApi,
          'Mot de passe mis à jour avec succès',
          'success'
        );
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('UpdatePassword : ', err);
      });
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
              <Button
                disabled={isDemo || isInvalid()}
                className="button"
                type="primary"
                onClick={handleSubmit}
              >
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
