import './NotFound.scss';

function NotFound() {
  return (
    <div className="not-found">
      <h1>Page non trouvée</h1>
      <a href="/" className="not-found__link">
        Retour à l'accueil
      </a>
    </div>
  );
}

export default NotFound;
