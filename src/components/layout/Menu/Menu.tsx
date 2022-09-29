import React from 'react';
import { FcSettings } from 'react-icons/fc';
import { RiLoginBoxLine } from 'react-icons/ri';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

import './Menu.css';


export const Menu = () => {

  const { auth } = useAuth();

  return (
    <header className="Menu">
      <Link to="/" className="Menu__home-link">
        <img className="Menu__logo" src={ logo } alt="logo" />
        <h1 className="Menu__title">Habit Tracker</h1>
      </Link>

      { auth && <Link to="/settings" className="Menu__settings-link"><FcSettings className="Menu__settings-icon" /></Link> }
      { !auth && (
          <button className="Menu__auth-btn"><Link to="/login"><RiLoginBoxLine/></Link></button>
      ) }

    </header>
  );
};
