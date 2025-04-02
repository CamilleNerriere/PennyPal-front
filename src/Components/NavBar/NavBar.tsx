import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faTableList,
  faUser,
  faChartLine,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface NavItem {
  to: string;
  icon: IconDefinition;
  label: string;
}

function NavBar() {
  const navItems = [
    { to: '/home', icon: faHouse, label: 'Accueil' },
    { to: '/expenses', icon: faTableList, label: 'Dépenses' },
    { to: '/gestion', icon: faWallet, label: 'Gestion' },
    { to: '/tendances', icon: faChartLine, label: 'Tendances' },
    { to: '/profil', icon: faUser, label: 'Profil' },
  ];
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Navigation principale"
    >
      {navItems.map((item: NavItem) => (
        <NavLink
          to={item.to}
          key={item.to}
          className="nav-icon"
          aria-label={item.label}
          title={item.label}
        >
          {({ isActive }) => (
            <div className="nav-item">
              <FontAwesomeIcon
                icon={item.icon}
                className={isActive ? 'active' : ''}
              />
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;
