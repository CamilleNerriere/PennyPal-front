import './HomeConnected.scss';
import { useEffect, useState } from 'react';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';

function HomeConnected() {
  const [budget, setBudget] = useState<number>(0);
  const [user, setUser] = useState('');

  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, budgetRes] = await Promise.all([
          axiosAuth.get('/User'),
          axiosAuth.get('/User/UserRemain'),
        ]);
        console.log(userRes.data);
        setUser(userRes.data.firstname + ' ' + userRes.data.lastname);
        setBudget(budgetRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="HomeConnected">
      <h1>Bienvenue {user}</h1>
      <div className="HomeConnected__content">
        <div className="HomeConnected__amount">
          <span className="HomeConnected__amount__text">Reste : </span>
          <span>{budget} €</span>
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
