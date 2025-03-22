import './ConfirmSignIn.scss';

function ConfirmSignIn() {
  return (
    <div className="ConfirmSignIn">
      <h1>Inscription terminée</h1>
      <div className="ConfirmSignIn__content">
        <p>Votre inscription est terminée. Connectez-vous.</p>
        <div className="ConfirmSignIn__link">
          <a href="/signin">Se connecter</a>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSignIn;
