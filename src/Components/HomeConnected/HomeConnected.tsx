import './HomeConnected.scss';

function HomeConnected() {
  return (
    <div className="HomeConnected">
      <h1>Bienvenue X</h1>
      <div className="HomeConnected__content">
        <div className="HomeConnected__amount">
          <span className="HomeConnected__amount__text">Reste : </span>
          <span>XXX €</span>
        </div>
        <nav className="HomeConnected__nav">
          <ul className="HomeConnected__nav__list">
            <li className="HomeConnected__nav__list__item">
              <a href="/expenses">+ Voir les dépenses</a>
            </li>
            <li className="HomeConnected__nav__list__item">
              <a href="/gestion">+ Gérer les dépenses</a>
            </li>
            <li className="HomeConnected__nav__list__item">
              <a href="/tendencies">+ Tendances</a>
            </li>
            <li className="HomeConnected__nav__list__item">
              <a href="/profil">+ Profil</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HomeConnected;
